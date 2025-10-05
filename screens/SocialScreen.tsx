import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, Track, Album, MusicVideo } from '../types';
import { RapGramIcon, RapifyIcon, RapTubeIcon, HeartIcon, ChatBubbleIcon, MusicNoteIcon, CollectionIcon, VideoCameraIcon, PlayIcon, MegaphoneIcon, HeartIconSolid, CashIcon } from '../components/Icons';

const coverArtUrls = [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1619983081593-e22f5899fa24?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1614999092404-500a68605c31?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581333107534-13783c587428?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542353436-312f0e16aa8e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508700115892-454a252dc065?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586156693842-0f357b545b63?q=80&w=800&auto=format&fit=crop'
];

const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const getThematicUrl = (id: string) => {
    const index = simpleHash(id) % coverArtUrls.length;
    return coverArtUrls[index];
};

type SocialTab = 'rapgram' | 'rapify' | 'raptube';

const promotions = {
    basic: { name: "Basic", cost: 1000, levelReq: 1, desc: "Small boost to streams and views." },
    medium: { name: "Medium", cost: 5000, levelReq: 2, desc: "Moderate boost, wider reach." },
    advanced: { name: "Advanced", cost: 20000, levelReq: 3, desc: "High boost, targets key demographics." },
    premium: { name: "Premium", cost: 100000, levelReq: 4, desc: "Massive boost, guaranteed viral potential." },
}

const SocialScreen: React.FC = () => {
    const { state } = useGame();
    const { player } = state;
    const [activeTab, setActiveTab] = useState<SocialTab>('rapgram');
    const [promoModal, setPromoModal] = useState<{release: Track | Album | MusicVideo, type: 'track' | 'album' | 'mv'} | null>(null);

    if (!player.socialMedia.rapGramUsername) {
        return <CreateProfile />;
    }

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
            {activeTab === 'rapify' && <RapifyTab onPromote={setPromoModal} />}
            {activeTab === 'raptube' && <RapTubeTab onPromote={setPromoModal} />}
            {promoModal && <PromotionModal releaseInfo={promoModal} onClose={() => setPromoModal(null)} />}
        </div>
    );
};

const CreateProfile: React.FC = () => {
    const { dispatch } = useGame();
    const [username, setUsername] = useState('');
    
    const handleCreate = () => {
        if(username.trim().length > 3) {
            dispatch({ type: ActionType.CREATE_SOCIAL_PROFILE, payload: { username: username.trim() }});
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
            <h1 className="text-2xl font-bold">Welcome to RapGram</h1>
            <p className="text-ios-label-secondary text-center">Create your profile to start connecting with fans.</p>
            <input 
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full max-w-xs bg-ios-bg-secondary text-ios-label p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-ios-blue focus:outline-none"
            />
            <button onClick={handleCreate} disabled={username.trim().length <= 3} className="w-full max-w-xs py-3 bg-ios-blue text-white font-bold rounded-lg disabled:bg-ios-gray">Create Profile</button>
        </div>
    );
};

const RapGramTab = () => {
    const { state, dispatch } = useGame();
    const { player, socialFeed } = state;
    const energyCostForPost = 10;
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        if (isPosting) setIsPosting(false);
    }, [socialFeed.length, isPosting]);
    
    const handlePost = () => {
        if (player.stats.energy >= energyCostForPost && !isPosting) {
            setIsPosting(true);
            dispatch({ type: ActionType.CREATE_RAPGRAM_POST, payload: { energyCost: energyCostForPost } });
        }
    };
    
    return (
        <div className="space-y-4">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 p-2">
                <img src={player.avatarUrl} alt="Player Avatar" className="w-20 h-20 rounded-full bg-gray-700"/>
                <div className="flex-grow flex justify-around text-center">
                    <div>
                        <p className="font-bold text-lg">{socialFeed.length}</p>
                        <p className="text-sm text-ios-label-secondary">Posts</p>
                    </div>
                     <div>
                        <p className="font-bold text-lg">{player.stats.fans.toLocaleString()}</p>
                        <p className="text-sm text-ios-label-secondary">Fans</p>
                    </div>
                </div>
            </div>
             <div className="px-2">
                <p className="font-semibold">{player.stageName}</p>
                <p className="text-sm text-ios-label-secondary">@{player.socialMedia.rapGramUsername}</p>
            </div>
            <button onClick={handlePost} disabled={player.stats.energy < energyCostForPost || isPosting} className="w-full py-3 text-md bg-ios-blue text-white font-bold rounded-xl shadow-md disabled:bg-ios-gray transition-colors">
                {isPosting ? 'Posting...' : `Create New Post (-10 ⚡)`}
            </button>
            <div className="grid grid-cols-3 gap-1">
                {socialFeed.map(post => (
                    <div key={post.id} className="aspect-square bg-ios-bg-secondary">
                        <img src={post.imageUrl} alt="Social post" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const PromotionModal: React.FC<{
    releaseInfo: { release: Track | Album | MusicVideo; type: 'track' | 'album' | 'mv' };
    onClose: () => void;
}> = ({ releaseInfo, onClose }) => {
    const { state, dispatch } = useGame();
    const { release, type } = releaseInfo;

    const handlePromote = (tier: 'basic' | 'medium' | 'advanced' | 'premium', cost: number) => {
        if (state.player.stats.netWorth >= cost) {
            dispatch({ type: ActionType.PROMOTE_RELEASE, payload: { releaseId: release.id, type, tier, cost } });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-ios-bg-secondary rounded-2xl p-4 w-full max-w-sm mx-auto shadow-lg border border-gray-700 space-y-3">
                <h2 className="text-xl font-bold text-center">Promote "{'title' in release ? release.title : release.trackTitle}"</h2>
                <div className="space-y-2">
                    {(Object.keys(promotions) as Array<keyof typeof promotions>).map(tier => {
                        const promo = promotions[tier];
                        const isUnlocked = state.player.careerLevel >= promo.levelReq;
                        const canAfford = state.player.stats.netWorth >= promo.cost;
                        return (
                            <button
                                key={tier}
                                onClick={() => handlePromote(tier, promo.cost)}
                                disabled={!isUnlocked || !canAfford}
                                className="w-full text-left p-3 bg-black rounded-lg disabled:opacity-50"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">{promo.name}</span>
                                    <span className={`font-semibold ${canAfford ? 'text-ios-green' : 'text-ios-red'}`}>${promo.cost.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-ios-label-secondary">{promo.desc}</p>
                                {!isUnlocked && <p className="text-xs text-ios-red mt-1">Requires Career Level {promo.levelReq}</p>}
                            </button>
                        );
                    })}
                </div>
                <button onClick={onClose} className="w-full py-3 bg-ios-gray text-white font-semibold rounded-lg mt-2">Cancel</button>
            </div>
        </div>
    );
};

const PromotionDisplay: React.FC<{release: Track | Album | MusicVideo, type: 'track' | 'album' | 'mv', onPromote: (info: any) => void}> = ({ release, type, onPromote }) => {
    if(release.promotion.isActive){
        return <p className="text-sm text-center text-ios-green font-semibold mt-2">Promotion Active ({release.promotion.weeksLeft}w left)</p>
    }

    return (
        <button onClick={() => onPromote({release, type})} className="w-full py-2 mt-2 flex items-center justify-center space-x-2 bg-purple-600 text-white font-bold rounded-lg shadow-md transition-colors">
            <MegaphoneIcon className="w-5 h-5" />
            <span>Promote</span>
        </button>
    )
}

const RapifyTab: React.FC<{onPromote: (info: any) => void}> = ({ onPromote }) => {
    const { state } = useGame();
    const { player, discography } = state;
    const releasedSingles = discography.tracks.filter(t => t.isReleased && !t.albumId);
    const releasedAlbums = discography.albums.filter(a => a.isReleased);

    return (
        <div className="space-y-6">
            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2"><CollectionIcon className="w-6 h-6" /><span>My Albums</span></h2>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                    {releasedAlbums.length > 0 ? releasedAlbums.slice().reverse().map((album, index) => (
                        <div key={album.id} className="bg-black p-3 rounded-lg">
                             <div className="flex items-start space-x-3">
                                <span className="font-bold text-lg text-ios-label-secondary w-5">{index + 1}</span>
                                <img src={getThematicUrl(album.id)} alt={album.title} className="w-14 h-14 rounded-md object-cover" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-base">{album.title}</p>
                                    <p className="text-sm text-ios-label-secondary">{player.stageName}</p>
                                    <p className="text-xs text-ios-label-secondary">Sales: {album.sales.toLocaleString()} • Revenue: ${album.revenue.toLocaleString()}</p>
                                </div>
                            </div>
                            <PromotionDisplay release={album} type="album" onPromote={onPromote} />
                        </div>
                    )) : <p className="text-ios-label-secondary text-center py-4">No albums released yet.</p>}
                </div>
            </div>
            <div className="bg-ios-bg-secondary p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2"><MusicNoteIcon className="w-6 h-6" /><span>My Singles</span></h2>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                    {releasedSingles.length > 0 ? releasedSingles.slice().reverse().map((track, index) => (
                         <div key={track.id} className="bg-black p-3 rounded-lg">
                            <div className="flex items-start space-x-3">
                                <span className="font-bold text-lg text-ios-label-secondary w-5">{index + 1}</span>
                                <img src={getThematicUrl(track.id)} alt={track.title} className="w-14 h-14 rounded-md object-cover" />
                                <div className="flex-grow">
                                    <p className="font-semibold text-base">{track.title}</p>
                                    <p className="text-sm text-ios-label-secondary">{player.stageName}</p>
                                    <p className="text-xs text-ios-label-secondary">Streams: {track.streams.toLocaleString()} • Revenue: ${track.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                                </div>
                            </div>
                            <PromotionDisplay release={track} type="track" onPromote={onPromote} />
                        </div>
                    )) : <p className="text-ios-label-secondary text-center py-4">No singles released yet.</p>}
                </div>
            </div>
        </div>
    );
}

const RapTubeTab: React.FC<{onPromote: (info: any) => void}> = ({ onPromote }) => {
    const { state } = useGame();
    const { player, discography, gameDate } = state;
    const releasedMVs = discography.musicVideos.filter(mv => mv.isReleased);

    const getRelativeTime = (releaseYear: number, releaseWeek: number) => {
        if (!releaseYear || !releaseWeek) return '';
        const totalWeeksAgo = (gameDate.year - releaseYear) * 52 + (gameDate.week - releaseWeek);
        if (totalWeeksAgo <= 0) return 'Just now';
        if (totalWeeksAgo === 1) return '1 week ago';
        if (totalWeeksAgo < 4) return `${totalWeeksAgo} weeks ago`;
        if (totalWeeksAgo < 52) return `${Math.floor(totalWeeksAgo / 4)} months ago`;
        const years = Math.floor(totalWeeksAgo / 52);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    };

    return (
         <div className="bg-ios-bg-secondary p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2"><VideoCameraIcon className="w-6 h-6" /><span>My Music Videos</span></h2>
             <div className="max-h-[60vh] overflow-y-auto pr-2">
                {releasedMVs.length > 0 ? (
                    <div className="space-y-4">
                        {releasedMVs.slice().reverse().map(mv => (
                            <div key={mv.id} className="space-y-2">
                                <img src={getThematicUrl(mv.id)} alt={mv.trackTitle} className="w-full aspect-video rounded-lg object-cover bg-black" />
                                <div className="flex items-start space-x-3">
                                    <img src={player.avatarUrl} alt={player.stageName} className="w-10 h-10 rounded-full mt-1 bg-ios-gray"/>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-base leading-tight">{mv.trackTitle}</p>
                                        <p className="text-sm text-ios-label-secondary">{player.stageName}</p>
                                        <p className="text-xs text-ios-label-secondary">
                                            {mv.views.toLocaleString()} views • {getRelativeTime(mv.releaseYear!, mv.releaseWeek!)} • ${mv.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                        </p>
                                    </div>
                                </div>
                                <PromotionDisplay release={mv} type="mv" onPromote={onPromote} />
                            </div>
                        ))}
                    </div>
                ) : <p className="text-ios-label-secondary text-center py-8">No music videos released yet.</p>}
             </div>
        </div>
    )
}

export default SocialScreen;