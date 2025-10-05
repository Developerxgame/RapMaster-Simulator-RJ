import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, Track } from '../types';
import { MusicNoteIcon, CollectionIcon, VideoCameraIcon } from '../components/Icons';

type StudioTab = 'track' | 'album' | 'mv';

const StudioScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { player, discography } = state;
    const [activeTab, setActiveTab] = useState<StudioTab>('track');
    
    // Track State
    const [trackTitle, setTrackTitle] = useState('');
    const [beatType, setBeatType] = useState<'free' | 'premium'>('free');
    const [animateRecord, setAnimateRecord] = useState(false);
    const [error, setError] = useState('');

    // Album State
    const [albumTitle, setAlbumTitle] = useState('');
    const [releaseType, setReleaseType] = useState<'default' | 'premium'>('default');
    const [selectedTrackIds, setSelectedTrackIds] = useState<string[]>([]);
    
    // MV State
    const [selectedTrackForMV, setSelectedTrackForMV] = useState<string>('');
    const [selectedAgency, setSelectedAgency] = useState<'low' | 'mid' | 'high' | 'premium'>('low');

    const unreleasedTracks = useMemo(() => discography.tracks.filter(t => !t.isReleased), [discography.tracks]);
    const unreleasedAlbums = useMemo(() => discography.albums.filter(a => !a.isReleased), [discography.albums]);
    const unreleasedMVs = useMemo(() => discography.musicVideos.filter(mv => !mv.isReleased), [discography.musicVideos]);
    const releasedTracks = useMemo(() => discography.tracks.filter(t => t.isReleased), [discography.tracks]);
    const availableForAlbum = useMemo(() => discography.tracks.filter(t => !t.albumId), [discography.tracks]);

    const premiumBeatCost = 1000;
    const premiumAlbumCost = 5000;
    const agencyOptions = {
        low: { name: 'Low Budget', cost: 500, description: 'Cheap, but gets the job done.' },
        mid: { name: 'Mid-Range', cost: 2500, description: 'Decent quality for a fair price.' },
        high: { name: 'High Production', cost: 10000, description: 'Professional quality, higher views.' },
        premium: { name: 'Premium Agency', cost: 50000, description: 'Guaranteed viral potential.' },
    };
    
    const handleCreateTrack = () => {
        setError('');
        if (!trackTitle.trim()) { setError('Track title cannot be empty.'); return; }
        if (player.stats.energy < 20) { setError('Not enough energy.'); return; }

        const cost = beatType === 'premium' ? premiumBeatCost : 0;
        if (player.stats.netWorth < cost) { setError('Not enough money for a premium beat.'); return; }
        
        const isDuplicate = discography.tracks.some(t => t.title.toLowerCase() === trackTitle.trim().toLowerCase());
        if(isDuplicate){ setError('A track with this title already exists.'); return; }

        dispatch({ type: ActionType.CREATE_TRACK, payload: { title: trackTitle.trim(), energyCost: 20, beatType, cost } });
        setTrackTitle('');
        setBeatType('free');
        setAnimateRecord(true);
        setTimeout(() => setAnimateRecord(false), 1000);
    };
    
    const handleReleaseTrack = (trackId: string) => dispatch({ type: ActionType.RELEASE_TRACK, payload: { trackId } });
    const handleReleaseAlbum = (albumId: string) => dispatch({ type: ActionType.RELEASE_ALBUM, payload: { albumId } });
    const handleReleaseMV = (mvId: string) => dispatch({ type: ActionType.RELEASE_MV, payload: { mvId } });

    const handleToggleTrackForAlbum = (trackId: string) => {
        setSelectedTrackIds(prev => 
            prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
        );
    };

    const handleCreateAlbum = () => {
        const cost = releaseType === 'premium' ? premiumAlbumCost : 0;
        if (!albumTitle.trim() || selectedTrackIds.length < 3 || selectedTrackIds.length > 10 || player.stats.energy < 70 || player.stats.netWorth < cost) return;
        dispatch({ type: ActionType.CREATE_ALBUM, payload: { title: albumTitle, trackIds: selectedTrackIds, energyCost: 70, releaseType, cost } });
        setAlbumTitle('');
        setSelectedTrackIds([]);
        setReleaseType('default');
    };
    
    const handleCreateMV = () => {
        if (!selectedTrackForMV || player.stats.energy < 50) return;
        const track = releasedTracks.find(t => t.id === selectedTrackForMV);
        if (!track) return;
        
        const agency = selectedAgency;
        const cost = agencyOptions[agency].cost;
        if (player.stats.netWorth < cost) return;

        const mvTitle = `${track.title} - Official Music Video`;
        dispatch({ type: ActionType.CREATE_MV, payload: { trackId: track.id, trackTitle: mvTitle, energyCost: 50, agency, cost } });
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
                        <input type="text" id="trackTitle" value={trackTitle} onChange={(e) => setTrackTitle(e.target.value)} placeholder="e.g. 'City Lights'" className="w-full bg-black text-ios-label p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-ios-blue focus:outline-none"/>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setBeatType('free')} className={`py-3 rounded-lg text-center ${beatType === 'free' ? 'bg-ios-blue text-white' : 'bg-black'}`}>
                                <p className="font-semibold">Free Beat</p><p className="text-xs">$0</p>
                            </button>
                            <button onClick={() => setBeatType('premium')} className={`py-3 rounded-lg text-center ${beatType === 'premium' ? 'bg-ios-blue text-white' : 'bg-black'}`}>
                                <p className="font-semibold">Premium Beat</p><p className="text-xs">${premiumBeatCost.toLocaleString()}</p>
                            </button>
                        </div>
                        
                        {error && <p className="text-sm text-ios-red text-center">{error}</p>}

                        <button onClick={handleCreateTrack} disabled={!trackTitle.trim() || player.stats.energy < 20 || (beatType === 'premium' && player.stats.netWorth < premiumBeatCost)} className={`w-full py-4 text-lg bg-ios-blue text-white font-bold rounded-xl shadow-md disabled:bg-ios-gray ${animateRecord ? 'animate-pulse' : ''}`}>Record Track</button>
                    </div>
                    <div className="bg-ios-bg-secondary p-4 rounded-xl">
                         <h2 className="text-xl font-semibold mb-2">My Vault (Unreleased Tracks)</h2>
                         <div className="max-h-60 overflow-y-auto space-y-2">
                            {unreleasedTracks.length > 0 ? unreleasedTracks.slice().reverse().map(track => (
                                <div key={track.id} className="flex justify-between items-center bg-black p-3 rounded-md">
                                    <div><p className="font-semibold">{track.title}</p><p className="text-xs text-ios-label-secondary">Quality: {track.quality}</p></div>
                                    <button onClick={() => handleReleaseTrack(track.id)} className="px-4 py-2 text-sm bg-ios-green text-black font-bold rounded-lg">Release Single</button>
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
                        <p className="text-sm text-ios-label-secondary">Costs 70 Energy ⚡. Requires 3-10 tracks.</p>
                        <input type="text" value={albumTitle} onChange={e => setAlbumTitle(e.target.value)} placeholder="Album Title" className="w-full bg-black text-ios-label p-3 rounded-lg border border-gray-700"/>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setReleaseType('default')} className={`py-3 rounded-lg text-center ${releaseType === 'default' ? 'bg-ios-blue text-white' : 'bg-black'}`}>
                                <p className="font-semibold">Default Release</p><p className="text-xs">$0</p>
                            </button>
                            <button onClick={() => setReleaseType('premium')} className={`py-3 rounded-lg text-center ${releaseType === 'premium' ? 'bg-ios-blue text-white' : 'bg-black'}`}>
                                <p className="font-semibold">Premium Release</p><p className="text-xs">${premiumAlbumCost.toLocaleString()}</p>
                            </button>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                            <h3 className="text-lg font-semibold">Select Tracks ({selectedTrackIds.length}/10)</h3>
                            {availableForAlbum.map(track => (
                                <div key={track.id} onClick={() => handleToggleTrackForAlbum(track.id)} className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-colors ${selectedTrackIds.includes(track.id) ? 'bg-ios-blue' : 'bg-black'}`}>
                                    <p>{track.title}</p><p className="text-sm text-ios-label-secondary">Q: {track.quality}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleCreateAlbum} disabled={!albumTitle.trim() || player.stats.energy < 70 || selectedTrackIds.length < 3 || selectedTrackIds.length > 10 || (releaseType === 'premium' && player.stats.netWorth < premiumAlbumCost)} className="w-full py-4 text-lg bg-ios-green text-black font-bold rounded-xl shadow-md disabled:bg-ios-gray">Create Album</button>
                    </div>
                    <div className="bg-ios-bg-secondary p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-2">My Vault (Unreleased Albums)</h2>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {unreleasedAlbums.length > 0 ? unreleasedAlbums.slice().reverse().map(album => (
                                <div key={album.id} className="flex justify-between items-center bg-black p-3 rounded-md">
                                    <p className="font-semibold">{album.title}</p>
                                    <button onClick={() => handleReleaseAlbum(album.id)} className="px-4 py-2 text-sm bg-ios-green text-black font-bold rounded-lg">Release Album</button>
                                </div>
                            )) : <p className="text-ios-label-secondary">No unreleased albums.</p>}
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'mv' && (
                <div className="space-y-4">
                    <div className="bg-ios-bg-secondary p-4 rounded-xl space-y-4">
                        <h2 className="text-xl font-semibold">Shoot a Music Video</h2>
                        <p className="text-sm text-ios-label-secondary">Costs 50 Energy ⚡.</p>
                        <select value={selectedTrackForMV} onChange={e => setSelectedTrackForMV(e.target.value)} className="w-full bg-black text-ios-label p-3 rounded-lg border border-gray-700">
                            <option value="">Select a Released Track</option>
                            {releasedTracks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                        </select>
                        <div className="space-y-2">
                            {(Object.keys(agencyOptions) as Array<keyof typeof agencyOptions>).map(key => (
                                <div key={key} onClick={() => setSelectedAgency(key)} className={`p-3 rounded-lg border-2 cursor-pointer ${selectedAgency === key ? 'border-ios-blue bg-blue-500/20' : 'border-transparent bg-black'}`}>
                                    <div className="flex justify-between items-center"><p className="font-semibold">{agencyOptions[key].name}</p><p className="font-bold text-ios-green">${agencyOptions[key].cost.toLocaleString()}</p></div>
                                    <p className="text-xs text-ios-label-secondary">{agencyOptions[key].description}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleCreateMV} disabled={!selectedTrackForMV || player.stats.energy < 50 || player.stats.netWorth < agencyOptions[selectedAgency].cost} className="w-full py-4 text-lg bg-ios-red text-white font-bold rounded-xl shadow-md disabled:bg-ios-gray">Shoot Video</button>
                    </div>
                    <div className="bg-ios-bg-secondary p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-2">My Vault (Unreleased MVs)</h2>
                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {unreleasedMVs.length > 0 ? unreleasedMVs.slice().reverse().map(mv => (
                                <div key={mv.id} className="flex justify-between items-center bg-black p-3 rounded-md">
                                    <div><p className="font-semibold">{mv.trackTitle}</p><p className="text-xs text-ios-label-secondary">Quality: {mv.quality}</p></div>
                                    <button onClick={() => handleReleaseMV(mv.id)} className="px-4 py-2 text-sm bg-ios-red text-white font-bold rounded-lg">Release MV</button>
                                </div>
                            )) : <p className="text-ios-label-secondary">No unreleased music videos.</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudioScreen;