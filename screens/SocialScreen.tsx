import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, Track, Album, MusicVideo } from '../types';
import { RapGramIcon, RapifyIcon, RapTubeIcon, HeartIcon, ChatBubbleIcon, MusicNoteIcon, CollectionIcon, VideoCameraIcon, PlayIcon, MegaphoneIcon, HeartIconSolid, CashIcon } from '../components/Icons';

const formatRelativeTime = (timestamp: number) => {
    const now = new Date().getTime();
    const seconds = Math.floor((now - timestamp) / 1000);
  
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "just now";
};


type SocialTab = 'rapgram' | 'rapify' | 'raptube';

const SocialScreen: React.FC = () => {
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
    const { player, socialFeed } = state;
    const energyCostForPost = 10;
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        if (isPosting) {
            setIsPosting(false);
        }
    }, [socialFeed.length]);
    
    const handlePost = () => {
        if (player.stats.energy >= energyCostForPost && !isPosting) {
            setIsPosting(true);
            dispatch({ type: ActionType.CREATE_RAPGRAM_POST, payload: { energyCost: energyCostForPost } });
        }
    };

    const handleLike = (postId: string) => {
        dispatch({ type: ActionType.LIKE_POST, payload: { postId, energyCost: 5 } });
    }

    const handleComment = (postId: string) => {
        dispatch({ type: ActionType.COMMENT_ON_POST, payload: { postId, energyCost: 5 } });
    }
    
    return (
        <div className="space-y-4">
            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                 <button onClick={handlePost} disabled={player.stats.energy < energyCostForPost || isPosting} className="w-full py-4 text-lg bg-ios-blue text-white font-bold rounded-xl shadow-md disabled:bg-ios-gray transition-colors">
                    {isPosting ? 'Posting...' : `Create New Post (-10 ⚡)`}
                </button>
            </div>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                {socialFeed.length > 0 ? socialFeed.map(post => (
                     <div key={post.id} className="bg-ios-bg-secondary rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between p-3">
                            <div className="flex items-center space-x-3">
                                <img src={player.avatarUrl} alt="Player Avatar" className="w-10 h-10 rounded-full bg-gray-700"/>
                                <span className="font-semibold">{player.stageName}</span>
                            </div>
                            <span className="text-xs text-ios-label-secondary">{formatRelativeTime(post.createdAt)}</span>
                        </div>
                        <img src={post.imageUrl} alt="Social media post" className="w-full h-auto object-cover"/>
                        <div className="p-3">
                            <div className="flex space-x-4 items-center">
                                <button onClick={() => handleLike(post.id)} disabled={post.isLiked || player.stats.energy < 5}>
                                    {post.isLiked ? <HeartIconSolid className="w-7 h-7 text-red-500" /> : <HeartIcon className="w-7 h-7" />}
                                </button>
                                <button onClick={() => handleComment(post.id)} disabled={post.isCommented || player.stats.energy < 5}>
                                    <ChatBubbleIcon className={`w-7 h-7 ${post.isCommented ? 'text-ios-blue' : ''}`}/>
                                </button>
                            </div>
                            <p className="text-sm font-semibold mt-2">{post.likes.toLocaleString()} likes</p>
                            <p className="text-sm mt-1">
                                <span className="font-semibold">{player.stageName}</span> {post.text}
                            </p>
                             <div className="text-sm mt-3 space-y-2">
                                {post.comments.map((c, i) => (
                                    <div key={i} className="flex items-start space-x-2">
                                        <img src={c.avatarUrl} alt={c.username} className="w-6 h-6 rounded-full bg-gray-600 mt-0.5" />
                                        <div className="flex-1">
                                            <p><span className="font-semibold text-ios-label">{c.username}</span> {c.text}</p>
                                            <p className="text-xs text-ios-label-secondary">{formatRelativeTime(c.createdAt)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 text-ios-label-secondary">
                        <p>Your RapGram feed is empty.</p>
                        <p>Create a post to connect with your fans!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const PromotionButton: React.FC<{release: Track | Album | MusicVideo, type: 'track' | 'album' | 'mv'}> = ({ release, type }) => {
    const { state, dispatch } = useGame();
    const cost = Math.floor(100 + release.revenue * 0.1);

    const handlePromote = () => {
        if(state.player.stats.netWorth >= cost && !release.promotion.isActive){
            dispatch({type: ActionType.PROMOTE_RELEASE, payload: {releaseId: release.id, type, cost}})
        }
    }

    if(release.promotion.isActive){
        return <p className="text-sm text-center text-ios-green font-semibold">Promotion Active ({release.promotion.weeksLeft}w left)</p>
    }

    return (
        <button onClick={handlePromote} disabled={state.player.stats.netWorth < cost} className="w-full py-2 mt-2 flex items-center justify-center space-x-2 bg-purple-600 text-white font-bold rounded-lg shadow-md disabled:bg-ios-gray transition-colors">
            <MegaphoneIcon className="w-5 h-5" />
            <span>Promote (${cost.toLocaleString()})</span>
        </button>
    )
}

const RapifyTab = () => {
    const { state } = useGame();
    const { discography } = state;
    const releasedSingles = discography.tracks.filter(t => t.isReleased && !t.albumId);
    const getCoverArtUrl = (id: string) => `https://picsum.photos/seed/${id}/200`;

    return (
        <div className="space-y-6">
            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2"><CollectionIcon className="w-6 h-6" /><span>My Albums</span></h2>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                    {discography.albums.length > 0 ? discography.albums.slice().reverse().map(album => (
                        <div key={album.id} className="bg-black p-3 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <img src={getCoverArtUrl(album.id)} alt={album.title} className="w-16 h-16 rounded-md object-cover" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-base">{album.title}</p>
                                    <p className="text-sm text-ios-label-secondary">Sales: {album.sales.toLocaleString()}</p>
                                    <p className="text-sm text-ios-green flex items-center space-x-1"><CashIcon className="w-4 h-4" /><span>${album.revenue.toLocaleString()}</span></p>
                                </div>
                            </div>
                            <PromotionButton release={album} type="album" />
                        </div>
                    )) : <p className="text-ios-label-secondary text-center py-4">No albums released yet.</p>}
                </div>
            </div>
            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2"><MusicNoteIcon className="w-6 h-6" /><span>My Singles</span></h2>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                    {releasedSingles.length > 0 ? releasedSingles.slice().reverse().map(track => (
                        <div key={track.id} className="bg-black p-3 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <img src={getCoverArtUrl(track.id)} alt={track.title} className="w-16 h-16 rounded-md object-cover" />
                                <div>
                                    <p className="font-semibold text-base">{track.title}</p>
                                    <p className="text-sm text-ios-label-secondary">Streams: {track.streams.toLocaleString()}</p>
                                    <p className="text-sm text-ios-green flex items-center space-x-1"><CashIcon className="w-4 h-4" /><span>${track.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
                                </div>
                            </div>
                            <PromotionButton release={track} type="track" />
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
            <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2"><VideoCameraIcon className="w-6 h-6" /><span>My Music Videos</span></h2>
             <div className="max-h-[60vh] overflow-y-auto pr-2">
                {discography.musicVideos.length > 0 ? (
                    <div className="space-y-4">
                        {discography.musicVideos.slice().reverse().map(mv => (
                            <div key={mv.id} className="space-y-2 bg-black p-3 rounded-lg">
                                <div className="relative">
                                    <img src={getThumbnailUrl(mv.id)} alt={mv.trackTitle} className="w-full aspect-video rounded-lg object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                                        <PlayIcon className="w-10 h-10 text-white opacity-80" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm truncate">{mv.trackTitle}</p>
                                    <p className="text-xs text-ios-label-secondary">Views: {mv.views.toLocaleString()} • Quality: {mv.quality}</p>
                                    <p className="text-sm text-ios-green flex items-center space-x-1"><CashIcon className="w-4 h-4" /><span>${mv.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
                                </div>
                                <PromotionButton release={mv} type="mv" />
                            </div>
                        ))}
                    </div>
                ) : <p className="text-ios-label-secondary text-center py-8">No music videos released yet.</p>}
             </div>
        </div>
    )
}

export default SocialScreen;