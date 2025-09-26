import React, { useState, useMemo } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType } from '../types';
import { RapGramIcon, RapifyIcon, RapTubeIcon, StarIcon, LightningBoltIcon, HeartIcon, ChatBubbleIcon, MusicNoteIcon, CollectionIcon, VideoCameraIcon, PlayIcon } from '../components/Icons';

type SocialTab = 'rapgram' | 'rapify' | 'raptube';

const postTemplates = [
    "Just dropped some fire in the studio 🔥 New track coming soon!",
    "Chilling in my new crib. The grind pays off. #blessed",
    "Shoutout to all my fans for the support! We're just getting started.",
    "Got some new gear for the lab. Ready to cook up some hits. 🎤",
    "They sleepin' on me, but the mixtape is gonna wake 'em up. 💯",
    "In the zone, writing rhymes. This next one is for the culture.",
];

const getRandomPost = () => postTemplates[Math.floor(Math.random() * postTemplates.length)];
const getRandomImageUrl = () => `https://picsum.photos/seed/${Math.random()}/400`;

const SocialScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const { player, discography } = state;
    const [activeTab, setActiveTab] = useState<SocialTab>('rapgram');

    const TabButton: React.FC<{tab: SocialTab, label: string, icon: React.ReactNode}> = ({tab, label, icon}) => (
        <button onClick={() => setActiveTab(tab)} className={`flex-1 flex justify-center items-center space-x-2 py-3 text-sm font-semibold rounded-t-lg transition-colors ${activeTab === tab ? 'bg-ios-bg-secondary text-ios-blue' : 'bg-transparent text-ios-label-secondary'}`}>
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Social Media</h1>
            
            <div className="flex border-b border-gray-700">
                <TabButton tab="rapgram" label="RapGram" icon={<RapGramIcon className="w-5 h-5"/>}/>
                <TabButton tab="rapify" label="Rapify" icon={<RapifyIcon className="w-5 h-5"/>}/>
                <TabButton tab="raptube" label="RapTube" icon={<RapTubeIcon className="w-5 h-5"/>}/>
            </div>
            
            {activeTab === 'rapgram' && <RapGramTab />}
            {activeTab === 'rapify' && <RapifyTab />}
            {activeTab === 'raptube' && <RapTubeTab />}
        </div>
    );
};

const RapGramTab = () => {
    const { state, dispatch } = useGame();
    const { player } = state;
    const [currentPost, setCurrentPost] = useState(getRandomPost());
    const [postImage, setPostImage] = useState(getRandomImageUrl());

    const energyCost = 10;
    const fameGain = Math.floor(5 * (1 + state.player.skills.marketing / 20));

    const likes = useMemo(() => Math.floor(player.stats.fans * 0.1 * (Math.random() * 0.5 + 0.8)), [player.stats.fans, currentPost]);
    const comments = useMemo(() => Math.floor(likes * 0.05 * (Math.random() * 0.5 + 0.8)), [likes, currentPost]);

    const handlePost = () => {
        if (player.stats.energy >= energyCost) {
            dispatch({ type: ActionType.POST_ON_SOCIAL_MEDIA, payload: { energyCost, fameGain } });
            setCurrentPost(getRandomPost());
            setPostImage(getRandomImageUrl());
        }
    };
    
    return (
        <div className="space-y-4">
            <p className="text-ios-label-secondary text-sm">Post on your feed to connect with fans and boost your fame.</p>
            <div className="bg-ios-bg-secondary rounded-xl overflow-hidden">
                <div className="flex items-center p-3 space-x-3">
                    <img src={player.avatarUrl} alt="Player Avatar" className="w-10 h-10 rounded-full bg-gray-700"/>
                    <span className="font-semibold">{player.stageName}</span>
                </div>
                <img src={postImage} alt="Social media post" className="w-full h-auto object-cover"/>
                <div className="p-3">
                    <div className="flex space-x-4 items-center">
                        <HeartIcon className="w-7 h-7 hover:text-red-500 transition-colors" />
                        <ChatBubbleIcon className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-semibold mt-2">{likes.toLocaleString()} likes</p>
                    <p className="text-sm mt-1">
                        <span className="font-semibold">{player.stageName}</span> {currentPost}
                    </p>
                    <p className="text-xs text-ios-label-secondary mt-1">View all {comments.toLocaleString()} comments</p>
                </div>
            </div>
             <div className="bg-ios-bg-secondary p-4 rounded-xl">
                 <div className="flex justify-between items-center text-sm text-ios-label-secondary mb-3">
                    <div className="flex items-center space-x-1">
                        <StarIcon className="w-5 h-5 text-yellow-400" />
                        <span>+{fameGain} Fame</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <LightningBoltIcon className="w-5 h-5 text-yellow-400" />
                        <span>-{energyCost} Energy</span>
                    </div>
                </div>
                 <button onClick={handlePost} disabled={player.stats.energy < energyCost} className="w-full py-4 text-lg bg-ios-blue text-white font-bold rounded-xl shadow-md disabled:bg-ios-gray transition-colors">
                    Create New Post
                </button>
            </div>
        </div>
    );
}

const RapifyTab = () => {
    const { state } = useGame();
    const { discography } = state;
    const releasedSingles = discography.tracks.filter(t => t.isReleased && !t.albumId);
    const getCoverArtUrl = (id: string) => `https://picsum.photos/seed/${id}/200`;

    return (
        <div className="space-y-6">
            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                    <CollectionIcon className="w-6 h-6" />
                    <span>My Albums</span>
                </h2>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                    {discography.albums.length > 0 ? discography.albums.slice().reverse().map(album => (
                        <div key={album.id} className="flex items-center space-x-4 bg-black p-2 rounded-lg">
                            <img src={getCoverArtUrl(album.id)} alt={album.title} className="w-16 h-16 rounded-md object-cover" />
                            <div>
                                <p className="font-semibold text-base">{album.title}</p>
                                <p className="text-sm text-ios-label-secondary">Sales: {album.sales.toLocaleString()}</p>
                            </div>
                        </div>
                    )) : <p className="text-ios-label-secondary text-center py-4">No albums released yet.</p>}
                </div>
            </div>
            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                    <MusicNoteIcon className="w-6 h-6" />
                    <span>My Singles</span>
                </h2>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                    {releasedSingles.length > 0 ? releasedSingles.slice().reverse().map(track => (
                        <div key={track.id} className="flex items-center space-x-4 bg-black p-2 rounded-lg">
                             <img src={getCoverArtUrl(track.id)} alt={track.title} className="w-16 h-16 rounded-md object-cover" />
                            <div>
                                <p className="font-semibold text-base">{track.title}</p>
                                <p className="text-sm text-ios-label-secondary">Streams: {track.streams.toLocaleString()}</p>
                            </div>
                        </div>
                    )) : <p className="text-ios-label-secondary text-center py-4">No singles released yet.</p>}
                </div>
            </div>
        </div>
    );
}

const RapTubeTab = () => {
    const { state } = useGame();
    const { discography } = state;
    const getThumbnailUrl = (id: string) => `https://picsum.photos/seed/${id}/400/225`;

    return (
         <div className="bg-ios-bg-secondary p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2">
                <VideoCameraIcon className="w-6 h-6" />
                <span>My Music Videos</span>
            </h2>
             <div className="max-h-[60vh] overflow-y-auto pr-2">
                {discography.musicVideos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {discography.musicVideos.slice().reverse().map(mv => (
                            <div key={mv.id} className="space-y-2 group cursor-pointer">
                                <div className="relative">
                                    <img src={getThumbnailUrl(mv.id)} alt={mv.trackTitle} className="w-full aspect-video rounded-lg object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                                        <PlayIcon className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm truncate">{mv.trackTitle}</p>
                                    <p className="text-xs text-ios-label-secondary">{mv.views.toLocaleString()} views • Q: {mv.quality}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-ios-label-secondary text-center py-8">No music videos released yet.</p>}
             </div>
        </div>
    )
}

export default SocialScreen;