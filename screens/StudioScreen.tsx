import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, Track } from '../types';
import { generateLyrics } from '../services/geminiService';
import { MusicNoteIcon, CollectionIcon, VideoCameraIcon } from '../components/Icons';

type StudioTab = 'track' | 'album' | 'mv';

const StudioScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { player, gameDate, discography } = state;
    const [activeTab, setActiveTab] = useState<StudioTab>('track');
    
    // Track State
    const [trackTitle, setTrackTitle] = useState('');
    const [lyricTopic, setLyricTopic] = useState('');
    const [generatedLyrics, setGeneratedLyrics] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [animateRecord, setAnimateRecord] = useState(false);

    // Album State
    const [albumTitle, setAlbumTitle] = useState('');
    const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
    
    // MV State
    const [selectedTrackForMV, setSelectedTrackForMV] = useState<string>('');

    const unreleasedTracks = useMemo(() => discography.tracks.filter(t => !t.isReleased), [discography.tracks]);
    const releasedTracks = useMemo(() => discography.tracks.filter(t => t.isReleased), [discography.tracks]);
    const availableForAlbum = useMemo(() => discography.tracks.filter(t => !t.albumId), [discography.tracks]);


    const handleGenerateLyrics = async () => {
        setIsLoading(true);
        const lyrics = await generateLyrics(lyricTopic);
        setGeneratedLyrics(lyrics);
        setIsLoading(false);
    };

    const handleCreateTrack = () => {
        if (!trackTitle.trim() || player.stats.energy < 20) return;

        const quality = Math.floor(
            (player.skills.lyricism + player.skills.flow + player.skills.production) / 3 * 
            (Math.random() * 0.4 + 0.8) // 80-120% variance
        );
        
        const newTrack: Omit<Track, 'streams' | 'isReleased' | 'albumId' | 'releaseWeek' | 'releaseYear'> = {
            id: `track-${Date.now()}`,
            title: trackTitle,
            quality: Math.min(100, Math.max(1, quality)),
        };

        dispatch({ type: ActionType.CREATE_TRACK, payload: { track: newTrack, energyCost: 20 } });
        setTrackTitle('');
        setLyricTopic('');
        setGeneratedLyrics('');
        setAnimateRecord(true);
        setTimeout(() => setAnimateRecord(false), 1000);
    };
    
    const handleReleaseTrack = (trackId: string) => {
        dispatch({ type: ActionType.RELEASE_TRACK, payload: { trackId } });
    };

    const handleToggleTrackForAlbum = (trackId: string) => {
        setSelectedTrackIds(prev => 
            prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
        );
    };

    const handleCreateAlbum = () => {
        if (!albumTitle.trim() || selectedTrackIds.length < 3 || selectedTrackIds.length > 10 || player.stats.energy < 60) return;
        dispatch({ type: ActionType.CREATE_ALBUM, payload: { title: albumTitle, trackIds: selectedTrackIds, energyCost: 60 } });
        setAlbumTitle('');
        setSelectedTrackIds([]);
    };
    
    const handleCreateMV = () => {
        if (!selectedTrackForMV || player.stats.energy < 40) return;
        const track = releasedTracks.find(t => t.id === selectedTrackForMV);
        if (!track) return;
        dispatch({ type: ActionType.CREATE_MV, payload: { trackId: track.id, trackTitle: track.title, energyCost: 40 } });
        setSelectedTrackForMV('');
    };
    
    const TabButton: React.FC<{tab: StudioTab, label: string, icon: React.ReactNode}> = ({tab, label, icon}) => (
        <button onClick={() => setActiveTab(tab)} className={`flex-1 flex justify-center items-center space-x-2 py-3 text-sm font-semibold rounded-t-lg transition-colors ${activeTab === tab ? 'bg-ios-bg-secondary text-ios-blue' : 'bg-transparent text-ios-label-secondary'}`}>
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Music Studio</h1>
            
            <div className="flex border-b border-gray-700">
                <TabButton tab="track" label="Tracks" icon={<MusicNoteIcon className="w-5 h-5"/>}/>
                <TabButton tab="album" label="Albums" icon={<CollectionIcon className="w-5 h-5"/>}/>
                <TabButton tab="mv" label="Music Videos" icon={<VideoCameraIcon className="w-5 h-5"/>}/>
            </div>
            
            {activeTab === 'track' && (
                <div className="space-y-4">
                    <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-4">
                        <h2 className="text-xl font-semibold">Record a New Track</h2>
                        <p className="text-sm text-ios-label-secondary">Costs 20 Energy ⚡</p>
                        
                        <div>
                            <label htmlFor="trackTitle" className="block text-sm font-medium text-ios-label-secondary mb-1">Track Title</label>
                            <input
                              type="text"
                              id="trackTitle"
                              value={trackTitle}
                              onChange={(e) => setTrackTitle(e.target.value)}
                              placeholder="e.g. 'City Lights'"
                              className="w-full bg-black text-ios-label p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-ios-blue focus:outline-none"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="lyricTopic" className="block text-sm font-medium text-ios-label-secondary mb-1">Lyric Topic (AI)</label>
                            <div className="flex space-x-2">
                                <input
                                  type="text"
                                  id="lyricTopic"
                                  value={lyricTopic}
                                  onChange={(e) => setLyricTopic(e.target.value)}
                                  placeholder="e.g. 'making it big'"
                                  className="w-full bg-black text-ios-label p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-ios-blue focus:outline-none"
                                />
                                <button
                                  onClick={handleGenerateLyrics}
                                  disabled={isLoading || !lyricTopic.trim()}
                                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg disabled:bg-gray-500"
                                >
                                  {isLoading ? '...' : 'Generate'}
                                </button>
                            </div>
                        </div>

                        {generatedLyrics && (
                            <div className="bg-black p-3 rounded-lg border border-gray-600">
                                <p className="text-sm font-mono whitespace-pre-wrap">{generatedLyrics}</p>
                            </div>
                        )}
                        
                        <button onClick={handleCreateTrack} disabled={!trackTitle.trim() || player.stats.energy < 20} className={`w-full py-4 text-lg bg-ios-blue text-white font-bold rounded-xl shadow-md disabled:bg-ios-gray ${animateRecord ? 'animate-pulse' : ''}`}>
                            Record Track
                        </button>
                    </div>

                    <div className="bg-ios-bg-secondary p-4 rounded-xl">
                         <h2 className="text-xl font-semibold mb-2">My Vault (Unreleased)</h2>
                         <div className="max-h-60 overflow-y-auto space-y-2">
                            {unreleasedTracks.length > 0 ? unreleasedTracks.slice().reverse().map(track => (
                                <div key={track.id} className="flex justify-between items-center bg-black p-3 rounded-md">
                                    <div>
                                        <p className="font-semibold">{track.title}</p>
                                        <p className="text-xs text-ios-label-secondary">Quality: {track.quality}</p>
                                    </div>
                                    <button onClick={() => handleReleaseTrack(track.id)} className="px-4 py-2 text-sm bg-ios-green text-black font-bold rounded-lg">Release as Single</button>
                                </div>
                            )) : <p className="text-ios-label-secondary">No unreleased tracks.</p>}
                         </div>
                    </div>
                </div>
            )}
            
            {activeTab === 'album' && (
                <div className="space-y-4">
                    <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-4">
                        <h2 className="text-xl font-semibold">Compile an Album</h2>
                        <p className="text-sm text-ios-label-secondary">Costs 60 Energy ⚡. Requires 3-10 tracks.</p>
                        <input type="text" value={albumTitle} onChange={e => setAlbumTitle(e.target.value)} placeholder="Album Title" className="w-full bg-black text-ios-label p-3 rounded-lg border border-gray-700"/>
                        
                        <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                            <h3 className="text-lg font-semibold">Select Tracks ({selectedTrackIds.length}/10)</h3>
                            {availableForAlbum.map(track => (
                                <div key={track.id} onClick={() => handleToggleTrackForAlbum(track.id)} className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors ${selectedTrackIds.includes(track.id) ? 'bg-ios-blue' : 'bg-black'}`}>
                                    <p>{track.title}</p>
                                    <p className="text-sm text-ios-label-secondary">Q: {track.quality}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleCreateAlbum} disabled={!albumTitle.trim() || player.stats.energy < 60 || selectedTrackIds.length < 3 || selectedTrackIds.length > 10} className="w-full py-4 text-lg bg-ios-green text-black font-bold rounded-xl shadow-md disabled:bg-ios-gray">
                            Release Album
                        </button>
                    </div>
                    <div className="bg-ios-bg-secondary p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-2">Released Albums</h2>
                         <div className="max-h-60 overflow-y-auto space-y-2">
                            {discography.albums.length > 0 ? discography.albums.slice().reverse().map(album => (
                                <div key={album.id} className="bg-black p-3 rounded-md">
                                    <p className="font-semibold">{album.title}</p>
                                    <p className="text-xs text-ios-label-secondary">Sales: {album.sales.toLocaleString()}</p>
                                </div>
                            )) : <p className="text-ios-label-secondary">No albums released yet.</p>}
                         </div>
                    </div>
                </div>
            )}

            {activeTab === 'mv' && (
                <div className="space-y-4">
                    <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-4">
                        <h2 className="text-xl font-semibold">Shoot a Music Video</h2>
                        <p className="text-sm text-ios-label-secondary">Costs 40 Energy ⚡. Boosts fame significantly.</p>
                        <select value={selectedTrackForMV} onChange={e => setSelectedTrackForMV(e.target.value)} className="w-full bg-black text-ios-label p-3 rounded-lg border border-gray-700">
                            <option value="">Select a Released Track</option>
                            {releasedTracks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>
                        <button onClick={handleCreateMV} disabled={!selectedTrackForMV || player.stats.energy < 40} className="w-full py-4 text-lg bg-ios-red text-white font-bold rounded-xl shadow-md disabled:bg-ios-gray">
                            Shoot Video
                        </button>
                    </div>
                    <div className="bg-ios-bg-secondary p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-2">My Music Videos</h2>
                         <div className="max-h-60 overflow-y-auto space-y-2">
                            {discography.musicVideos.length > 0 ? discography.musicVideos.slice().reverse().map(mv => (
                                <div key={mv.id} className="flex justify-between items-center bg-black p-3 rounded-md">
                                    <div>
                                        <p className="font-semibold">{mv.trackTitle}</p>
                                        <p className="text-xs text-ios-label-secondary">Views: {mv.views.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-ios-red">{mv.quality}</p>
                                        <p className="text-xs text-ios-label-secondary">Quality</p>
                                    </div>
                                </div>
                            )) : <p className="text-ios-label-secondary">No music videos shot yet.</p>}
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudioScreen;