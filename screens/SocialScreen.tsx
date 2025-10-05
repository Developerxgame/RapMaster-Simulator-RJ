import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ActionType, Track, Album, MusicVideo } from '../types';
import { RapGramIcon, RapifyIcon, RapTubeIcon, MegaphoneIcon, CollectionIcon, MusicNoteIcon, VideoCameraIcon } from '../components/Icons';
import MobileMockup from '../components/MobileMockup';

const coverArtUrls = [
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1619983081593-e22f5899fa24?q=80&w=800&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1614999092404-500a68605c31?q=80&w=800&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1581333107534-13783c587428?q=80&w=800&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1542353436-312f0e16aa8e?q=80&w=800&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1508700115892-454a252dc065?q=80&w=800&auto-format&fit=crop',
    'https://images.unsplash.com/photo-1586156693842-0f357b545b63?q=80&w=800&auto-format&fit=crop'
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

type SocialApp = 'homescreen' | 'rapgram' | 'rapify' | 'raptube';

const promotions = {
    basic: { name: "Basic", cost: 1000, levelReq: 1, desc: "Small boost to streams and views." },
    medium: { name: "Medium", cost: 5000, levelReq: 2, desc: "Moderate boost, wider reach." },
    advanced: { name: "Advanced", cost: 20000, levelReq: 3, desc: "High boost, targets key demographics." },
    premium: { name: "Premium", cost: 100000, levelReq: 4, desc: "Massive boost, guaranteed viral potential." },
}

const SocialScreen: React.FC = () => {
    const { state } = useGame();
    const [activeApp, setActiveApp] = useState<SocialApp>('homescreen');
    const [promoModal, setPromoModal] = useState<{release: Track | Album | MusicVideo, type: 'track' | 'album' | 'mv'} | null>(null);

    if (!state.player.socialMedia.rapGramUsername) {
        return <CreateProfile />;
    }
    
    const renderAppContent = () => {
        switch (activeApp) {
            case 'rapgram': return <RapGramTab />;
            case 'rapify': return <RapifyTab onPromote={setPromoModal} />;
            case 'raptube': return <RapTubeTab onPromote={setPromoModal} />;
            case 'homescreen':
            default:
                return <HomeScreen onOpenApp={setActiveApp} />;
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <MobileMockup currentApp={activeApp} onGoHome={() => setActiveApp('homescreen')}>
                {renderAppContent()}
            </MobileMockup>
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
            <h1 className="text-2xl font-bold">Welcome to Socials</h1>
            <p className="text-ios-label-secondary text-center">Create your profile to start connecting with fans.</p>
            <input 
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full max-w-xs bg-ios-bg-secondary text-ios-label p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-ios-blue focus:outline-none"
            />
            <button onClick={handleCreate} disabled={username.trim().length <= 3} className="w-full max-w-xs ios-button-blue font-bold">Create Profile</button>
        </div>
    );
};

const HomeScreen: React.FC<{onOpenApp: (app: SocialApp) => void}> = ({ onOpenApp }) => {
    return (
        <div className="w-full h-full p-8 grid grid-cols-3 gap-4 items-start">
            <AppIcon icon={<RapGramIcon className="w-16 h-16"/>} label="RapGram" onClick={() => onOpenApp('rapgram')} />
            <AppIcon icon={<RapifyIcon className="w-16 h-16"/>} label="Rapify" onClick={() => onOpenApp('rapify')} />
            <AppIcon icon={<RapTubeIcon className="w-16 h-16"/>} label="RapTube" onClick={() => onOpenApp('raptube')} />
        </div>
    );
};

const AppIcon: React.FC<{icon: React.ReactNode, label: string, onClick: () => void}> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center space-y-2 text-white font-medium">
        {icon}
        <span>{label}</span>
    </button>
);

const RapGramTab = () => {
    const { state, dispatch } = useGame();
    const { player, socialFeed } = state;
    const energyCostForPost = 10;
    
    const handlePost = () => {
        if (player.stats.energy >= energyCostForPost) {
            dispatch({ type: ActionType.CREATE_RAPGRAM_POST, payload: { energyCost: energyCostForPost } });
        }
    };
    
    return (
        <div className="bg-black text-white h-full flex flex-col">
            <header className="flex-shrink-0 flex items-center justify-between p-3 border-b border-gray-700">
                <h1 className="font-serif text-xl font-bold">RapGram</h1>
                <button onClick={handlePost} disabled={player.stats.energy < energyCostForPost} className="text-ios-blue font-semibold text-lg disabled:opacity-50">+</button>
            </header>
            <main className="flex-grow overflow-y-auto">
                <div className="flex items-center space-x-4 p-4">
                    <img src={player.avatarUrl} alt="Player Avatar" className="w-20 h-20 rounded-full bg-gray-700"/>
                    <div className="flex-grow flex justify-around text-center">
                        <div><p className="font-bold text-lg">{socialFeed.length}</p><p className="text-sm text-gray-400">Posts</p></div>
                        <div><p className="font-bold text-lg">{player.stats.fans.toLocaleString()}</p><p className="text-sm text-gray-400">Fans</p></div>
                    </div>
                </div>
                <div className="px-4 pb-4">
                    <p className="font-semibold">{player.stageName}</p>
                    <p className="text-sm text-gray-400">@{player.socialMedia.rapGramUsername}</p>
                </div>
                <div className="grid grid-cols-3">
                    {socialFeed.map(post => (
                        <div key={post.id} className="aspect-square bg-gray-800 border-2 border-black">
                            <img src={post.imageUrl} alt="Social post" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

const RapifyTab: React.FC<{onPromote: (info: any) => void}> = ({ onPromote }) => {
    const { state } = useGame();
    const { player, discography } = state;
    const releasedSingles = discography.tracks.filter(t => t.isReleased && !t.albumId);
    const releasedAlbums = discography.albums.filter(a => a.isReleased);

    return (
        <div className="bg-[#121212] text-white h-full flex flex-col">
            <header className="p-4"><h1 className="text-2xl font-bold">Your Library</h1></header>
            <main className="flex-grow overflow-y-auto px-4 space-y-6 pb-4">
                <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2"><CollectionIcon className="w-6 h-6" /><span>Albums</span></h2>
                    <div className="space-y-3">
                        {releasedAlbums.length > 0 ? releasedAlbums.slice().reverse().map(album => (
                            <div key={album.id} className="bg-[#181818] p-3 rounded-lg hover:bg-[#282828] transition-colors">
                                <div className="flex items-center space-x-3">
                                    <img src={getThematicUrl(album.id)} alt={album.title} className="w-14 h-14 rounded-md object-cover" />
                                    <div className="flex-grow">
                                        <p className="font-semibold">{album.title}</p>
                                        <p className="text-sm text-gray-400">Album • {player.stageName}</p>
                                    </div>
                                </div>
                                <PromotionButton release={album} type="album" onPromote={onPromote} />
                            </div>
                        )) : <p className="text-gray-400 text-center py-4">No albums released.</p>}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2"><MusicNoteIcon className="w-6 h-6" /><span>Singles</span></h2>
                    <div className="space-y-3">
                        {releasedSingles.length > 0 ? releasedSingles.slice().reverse().map(track => (
                            <div key={track.id} className="bg-[#181818] p-3 rounded-lg hover:bg-[#282828] transition-colors">
                                <div className="flex items-center space-x-3">
                                    <img src={getThematicUrl(track.id)} alt={track.title} className="w-14 h-14 rounded-md object-cover" />
                                    <div className="flex-grow">
                                        <p className="font-semibold">{track.title}</p>
                                        <p className="text-sm text-gray-400">Single • {player.stageName}</p>
                                    </div>
                                </div>
                                <PromotionButton release={track} type="track" onPromote={onPromote} />
                            </div>
                        )) : <p className="text-gray-400 text-center py-4">No singles released.</p>}
                    </div>
                </div>
            </main>
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
        <div className="bg-[#0F0F0F] text-white h-full flex flex-col">
            <header className="p-4"><h1 className="text-2xl font-bold">Your Videos</h1></header>
            <main className="flex-grow overflow-y-auto">
                {releasedMVs.length > 0 ? (
                    <div className="space-y-4">
                        {releasedMVs.slice().reverse().map(mv => (
                            <div key={mv.id} className="space-y-2 pb-2">
                                <img src={getThematicUrl(mv.id)} alt={mv.trackTitle} className="w-full aspect-video object-cover bg-black" />
                                <div className="px-3">
                                    <div className="flex items-start space-x-3">
                                        <img src={player.avatarUrl} alt={player.stageName} className="w-9 h-9 rounded-full mt-1 bg-gray-700"/>
                                        <div className="flex-grow">
                                            <p className="font-semibold text-base leading-tight">{mv.trackTitle}</p>
                                            <p className="text-sm text-gray-400">
                                                {player.stageName} • {mv.views.toLocaleString()} views • {getRelativeTime(mv.releaseYear!, mv.releaseWeek!)}
                                            </p>
                                        </div>
                                    </div>
                                    <PromotionButton release={mv} type="mv" onPromote={onPromote} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-gray-400 text-center py-8">No music videos released.</p>}
            </main>
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
                <button onClick={onClose} className="w-full ios-button-gray font-semibold mt-2">Cancel</button>
            </div>
        </div>
    );
};

const PromotionButton: React.FC<{release: Track | Album | MusicVideo, type: 'track' | 'album' | 'mv', onPromote: (info: any) => void}> = ({ release, type, onPromote }) => {
    if(release.promotion.isActive){
        return <p className="text-sm text-green-400 font-semibold mt-2">Promotion Active ({release.promotion.weeksLeft}w left)</p>
    }

    return (
        <button onClick={() => onPromote({release, type})} className="w-full py-1.5 mt-2 flex items-center justify-center space-x-2 bg-purple-600 text-white font-bold rounded-md shadow-md transition-colors text-sm hover:bg-purple-500">
            <MegaphoneIcon className="w-4 h-4" />
            <span>Promote</span>
        </button>
    )
}


export default SocialScreen;