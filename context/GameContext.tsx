import React, { createContext, useReducer, useContext, Dispatch, ReactNode } from 'react';
import { GameState, GameAction, ActionType, GameStatus, Player, Track, Album, MusicVideo, SaveSlot, RapGramPost, ShopItem, ItemCategory, GameEvent, GameEventChoice } from '../types';
import { shopItems } from '../screens/ShopScreen'; 

const MAX_ENERGY = 100;
const FANS_PER_FAME_POINT = 10;
const SINGLE_STREAM_RATE = 0.20;
const ALBUM_STREAM_RATE = 0.50;
const MV_VIEWS_INCOME_RATE = 0.30; 
const ALBUM_PRICE = 3;
const ALBUM_SALES_FACTOR = 0.5;
const MV_VIEWS_FACTOR = 1.2;
const END_YEAR = 2060;
const EVENT_CHANCE_PER_WEEK = 0.25;

const gameEvents: GameEvent[] = [
    {
        id: 'event1',
        title: "Surprise Interview",
        description: "A popular hip-hop blog wants to interview you. This could be a big break, but it will take up your time.",
        choices: [
            { text: "Do the interview (-15 Energy)", effects: { fame: 50, energy: -15, log: "The interview was a success! Gained 50 fame." } },
            { text: "Decline politely", effects: { reputation: 5, log: "You declined the interview to focus on music. +5 Reputation." } },
        ]
    },
    {
        id: 'event2',
        title: "Fan Encounter",
        description: "You run into a group of dedicated fans on the street. They ask for a picture.",
        choices: [
            { text: "Take the picture (+10 Fame)", effects: { fame: 10, log: "Your fans loved the interaction! +10 Fame." } },
            { text: "Pretend you're busy (-5 Reputation)", effects: { reputation: -5, log: "You ignored your fans. That's not a good look. -5 Reputation." } },
        ]
    },
    {
        id: 'event3',
        title: "Collaboration Offer",
        description: "A slightly more famous local artist wants you to feature on their track.",
        choices: [
            { text: "Accept (-$500, +100 Fame)", effects: { netWorth: -500, fame: 100, log: "The collab was a hit! Gained 100 fame." } },
            { text: "Decline", effects: { log: "You decided to focus on your own work." } },
        ]
    }
];


const initialState: GameState = {
  gameStatus: GameStatus.SPLASH,
  player: {
    stageName: 'Rookie',
    avatarUrl: 'https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=rapper1',
    stats: {
      fame: 0,
      reputation: 0,
      fans: 0,
      netWorth: 0,
      energy: MAX_ENERGY,
    },
    skills: {
      lyricism: 1,
      flow: 1,
      production: 1,
      marketing: 1,
    },
    ownedItemIds: [],
    studioEquipment: {
        mic: 0,
        audio: 0,
        software: 0,
    }
  },
  gameDate: {
    year: 2020,
    week: 1,
  },
  discography: {
    tracks: [],
    albums: [],
    musicVideos: [],
  },
  log: ["Welcome to RapMaster Simulator! It's time to start your career."],
  history: {},
  socialFeed: [],
  activeEvent: null,
};

const processWeeklyUpdate = (state: GameState): GameState => {
    let { week, year } = state.gameDate;
    week++;
    if (week > 52) {
        week = 1;
        year++;
    }
    
    if (year >= END_YEAR) {
        return { ...state, gameStatus: GameStatus.ENDED };
    }
    
    let passiveFameBonus = 0;
    let passiveRepBonus = 0;
    state.player.ownedItemIds.forEach(itemId => {
        const item = shopItems.find(i => i.id === itemId);
        if(item && item.category === ItemCategory.LIFESTYLE){
            passiveFameBonus += item.fameBonus || 0;
            passiveRepBonus += item.repBonus || 0;
        }
    });
    
    let totalIncome = 0;

    const updatedTracks = state.discography.tracks.map(t => {
        if(!t.isReleased) return t;
        const promotionMultiplier = t.promotion.isActive ? 3 : 1;
        const newStreams = Math.floor(t.quality * (state.player.stats.fame + 1) * 0.1 * (Math.random() + 0.5) * promotionMultiplier);
        
        const streamRate = t.albumId ? ALBUM_STREAM_RATE : SINGLE_STREAM_RATE;
        const streamIncome = newStreams * streamRate;

        totalIncome += streamIncome;
        const weeksLeft = t.promotion.isActive ? t.promotion.weeksLeft - 1 : 0;
        return {...t, streams: t.streams + newStreams, revenue: t.revenue + streamIncome, promotion: {isActive: weeksLeft > 0, weeksLeft}};
    });

    const updatedAlbums = state.discography.albums.map(a => {
        const promotionMultiplier = a.promotion.isActive ? 3 : 1;
        const weeksSinceRelease = (year - a.releaseYear) * 52 + (week - a.releaseWeek);
        const salesDecay = Math.max(0.1, Math.pow(0.95, weeksSinceRelease));
        const newSales = Math.floor((state.player.stats.fame + 1) * ALBUM_SALES_FACTOR * (1 + state.player.skills.marketing / 100) * (Math.random() * 0.5 + 0.75) * salesDecay * promotionMultiplier);
        const albumIncome = newSales * ALBUM_PRICE;
        totalIncome += albumIncome;
        const weeksLeft = a.promotion.isActive ? a.promotion.weeksLeft - 1 : 0;
        return {...a, sales: a.sales + newSales, revenue: a.revenue + albumIncome, promotion: {isActive: weeksLeft > 0, weeksLeft}};
    });
    
    let fameFromMVs = 0;
    const updatedMVs = state.discography.musicVideos.map(mv => {
        const promotionMultiplier = mv.promotion.isActive ? 3 : 1;
        const newViews = Math.floor(mv.quality * (state.player.stats.fame + 1) * MV_VIEWS_FACTOR * (1 + state.player.skills.marketing / 100) * promotionMultiplier);
        const mvIncome = newViews * MV_VIEWS_INCOME_RATE;
        totalIncome += mvIncome;
        fameFromMVs += Math.floor(newViews / 5000); // 1 fame per 5000 views
        const weeksLeft = mv.promotion.isActive ? mv.promotion.weeksLeft - 1 : 0;
        return {...mv, views: mv.views + newViews, revenue: mv.revenue + mvIncome, promotion: {isActive: weeksLeft > 0, weeksLeft}};
    });
    
    const fameGrowth = Math.floor(totalIncome / 200) + fameFromMVs + passiveFameBonus;
    const newFame = state.player.stats.fame + fameGrowth;
    const newRep = state.player.stats.reputation + passiveRepBonus;
    const newFans = Math.floor(newFame * FANS_PER_FAME_POINT * (1 + state.player.skills.marketing / 100));

    const newHistory = {...state.history};
    if(week === 52) {
        newHistory[year] = { fame: newFame, fans: newFans, netWorth: state.player.stats.netWorth + totalIncome };
    }

    const newState = {
        ...state,
        gameDate: { week, year },
        player: {
            ...state.player,
            stats: {
                ...state.player.stats,
                energy: MAX_ENERGY,
                netWorth: state.player.stats.netWorth + totalIncome,
                fame: newFame,
                fans: newFans,
                reputation: newRep,
            }
        },
        discography: { tracks: updatedTracks, albums: updatedAlbums, musicVideos: updatedMVs },
        log: [...state.log.slice(-10), `Earned $${totalIncome.toFixed(2)} from music this week.`],
        history: newHistory
    };
    
    try {
        localStorage.setItem('saveSlot_auto', JSON.stringify(newState));
        const meta: SaveSlot = {
            slotId: 'auto', saveDate: new Date().toLocaleString(), stageName: newState.player.stageName,
            year: newState.gameDate.year, netWorth: newState.player.stats.netWorth,
        };
        localStorage.setItem('saveSlot_auto_meta', JSON.stringify(meta));
    } catch (e) {
        console.error("Failed to auto-save game", e);
    }

    return newState;
}

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case ActionType.SET_STATUS:
        return { ...state, gameStatus: action.payload };

    case ActionType.START_GAME:
        return {
            ...initialState,
            gameStatus: GameStatus.PLAYING,
            player: {
                ...initialState.player,
                stageName: action.payload.stageName,
                avatarUrl: action.payload.avatarUrl,
            },
            log: [`The year is 2020. ${action.payload.stageName} is ready to take over the rap game.`]
        };
    
    case ActionType.WORK_JOB: {
        const { money, energyCost, fameGain } = action.payload;
        if (state.player.stats.energy < energyCost) return state;
        return {
            ...state,
            player: {
                ...state.player,
                stats: {
                    ...state.player.stats,
                    netWorth: state.player.stats.netWorth + money,
                    energy: state.player.stats.energy - energyCost,
                    fame: state.player.stats.fame + fameGain,
                }
            },
            log: [...state.log, `Worked a job and earned $${money}.`]
        };
    }
    
    case ActionType.CREATE_TRACK: {
        const { title, energyCost, beatType, cost } = action.payload;
        if (state.player.stats.energy < energyCost || state.player.stats.netWorth < cost) return state;
        
        const micBonus = state.player.studioEquipment.mic;
        const audioBonus = state.player.studioEquipment.audio;
        const softwareBonus = state.player.studioEquipment.software;
        const equipmentBonus = micBonus + audioBonus + softwareBonus;

        const beatMultiplier = beatType === 'premium' ? 1.2 : 1.0;
        const baseQuality = (state.player.skills.lyricism + state.player.skills.flow + state.player.skills.production) / 3;
        const qualityWithBonus = (baseQuality + equipmentBonus) * beatMultiplier;
        const quality = Math.floor(qualityWithBonus * (Math.random() * 0.4 + 0.8)); // 80-120% variance

        const newTrack: Track = {
            id: `track-${Date.now()}`,
            title,
            quality: Math.min(100, Math.max(1, quality)),
            streams: 0,
            isReleased: false,
            albumId: null,
            releaseWeek: null,
            releaseYear: null,
            revenue: 0,
            promotion: { isActive: false, weeksLeft: 0 },
        };

        return {
            ...state,
            player: {
                ...state.player,
                stats: { 
                    ...state.player.stats, 
                    energy: state.player.stats.energy - energyCost,
                    netWorth: state.player.stats.netWorth - cost,
                }
            },
            discography: { ...state.discography, tracks: [...state.discography.tracks, newTrack] },
            log: [...state.log, `Recorded a new track: "${title}" with a quality score of ${newTrack.quality}.`]
        }
    }

    case ActionType.RELEASE_TRACK: {
        const trackToRelease = state.discography.tracks.find(t => t.id === action.payload.trackId);
        if (!trackToRelease) return state;

        return {
            ...state,
            discography: {
                ...state.discography,
                tracks: state.discography.tracks.map(t => t.id === action.payload.trackId ? {
                    ...t, isReleased: true, releaseWeek: state.gameDate.week, releaseYear: state.gameDate.year
                } : t)
            },
            log: [...state.log, `Released the single "${trackToRelease.title}".`]
        }
    }

    case ActionType.CREATE_ALBUM: {
        const { title, trackIds, energyCost, releaseType, cost } = action.payload;
        if (state.player.stats.energy < energyCost || state.player.stats.netWorth < cost) return state;

        const newAlbum: Album = {
            id: `album-${Date.now()}`, title, trackIds, sales: 0,
            releaseWeek: state.gameDate.week, releaseYear: state.gameDate.year,
            revenue: 0, promotion: { isActive: false, weeksLeft: 0 },
        };

        const fameBoost = releaseType === 'premium' ? 100 : 0;
        const repBoost = releaseType === 'premium' ? 10 : 0;

        return {
            ...state,
            player: {
                ...state.player,
                stats: { 
                    ...state.player.stats, 
                    energy: state.player.stats.energy - energyCost,
                    netWorth: state.player.stats.netWorth - cost,
                    fame: state.player.stats.fame + fameBoost,
                    reputation: state.player.stats.reputation + repBoost,
                }
            },
            discography: {
                ...state.discography,
                albums: [...state.discography.albums, newAlbum],
                tracks: state.discography.tracks.map(t => trackIds.includes(t.id) ? {
                    ...t, albumId: newAlbum.id, isReleased: true, releaseWeek: state.gameDate.week, releaseYear: state.gameDate.year
                } : t),
            },
            log: [...state.log, `Released a new album: "${title}". ${fameBoost > 0 ? 'The premium release generated some buzz!' : ''}`]
        }
    }

    case ActionType.CREATE_MV: {
        const { trackId, trackTitle, energyCost, agency, cost } = action.payload;
        if (state.player.stats.energy < energyCost || state.player.stats.netWorth < cost) return state;
        
        const agencyMultipliers = { low: 0.8, mid: 1.0, high: 1.3, premium: 1.8 };
        const agencyMultiplier = agencyMultipliers[agency];

        const trackQuality = state.discography.tracks.find(t => t.id === trackId)?.quality || 0;
        const marketingBonus = 1 + (state.player.skills.marketing / 200);
        const baseQuality = trackQuality * (0.8 + (state.player.stats.fame + 1) / 10000);
        const mvQuality = Math.min(100, Math.floor(baseQuality * marketingBonus * agencyMultiplier));

        const newMv: MusicVideo = {
            id: `mv-${Date.now()}`, trackId, trackTitle, quality: mvQuality, views: 0,
            revenue: 0, promotion: { isActive: false, weeksLeft: 0 }, agency
        };

        const fameGain = agency === 'premium' ? Math.floor(Math.random() * 500) + 500 : 0; // big initial boost for premium

        return {
            ...state,
             player: {
                ...state.player,
                stats: { 
                    ...state.player.stats,
                    energy: state.player.stats.energy - energyCost,
                    netWorth: state.player.stats.netWorth - cost,
                    fame: state.player.stats.fame + fameGain,
                }
            },
            discography: { ...state.discography, musicVideos: [...state.discography.musicVideos, newMv] },
            log: [...state.log, `Shot a music video for "${trackTitle}" with quality ${mvQuality}. ${fameGain > 0 ? 'The premium video went viral!' : ''}`]
        }
    }
    
    case ActionType.CREATE_RAPGRAM_POST: {
        const { energyCost } = action.payload;
        if (state.player.stats.energy < energyCost) return state;
        
        const postTemplates = ["Studio vibes today 🔥", "New music on the way!", "Shoutout to the fans 🙏", "Grinding.", "Cookin' up something special."];
        const commentTemplates = ["Dope!", "Fire!", "Let's gooo!", "Can't wait!", "Keep it up!", "King 👑"];
        const usernames = ["RapFan123", "HipHopHead", "MusicLover", "RealTalk", "BeatJunkie", "FlowMaster"];
        const now = Date.now();

        const fameGain = Math.floor(5 * (1 + state.player.skills.marketing / 20));

        const newPost: RapGramPost = {
            id: `post-${now}`,
            text: postTemplates[Math.floor(Math.random() * postTemplates.length)],
            imageUrl: `https://picsum.photos/seed/${Math.random()}/400`,
            likes: Math.floor(state.player.stats.fans * 0.05 * (Math.random() * 0.5 + 0.8)),
            comments: Array.from({ length: Math.floor(Math.random() * 3) + 3 }).map(() => ({
                username: usernames[Math.floor(Math.random() * usernames.length)],
                text: commentTemplates[Math.floor(Math.random() * commentTemplates.length)],
                avatarUrl: `https://api.dicebear.com/8.x/adventurer/svg?seed=${Math.random()}`,
                createdAt: now - Math.floor(Math.random() * 60000)
            })),
            isLiked: false,
            isCommented: false,
            createdAt: now,
        };

        return {
            ...state,
            player: {
                ...state.player,
                stats: {
                    ...state.player.stats,
                    energy: state.player.stats.energy - energyCost,
                    fame: state.player.stats.fame + fameGain,
                }
            },
            socialFeed: [newPost, ...state.socialFeed],
            log: [...state.log, `Posted on RapGram, gained ${fameGain} fame.`]
        }
    }
    
    case ActionType.LIKE_POST: {
        const { postId, energyCost } = action.payload;
        if(state.player.stats.energy < energyCost) return state;
        const post = state.socialFeed.find(p => p.id === postId);
        if(!post || post.isLiked) return state;

        const fameGain = Math.random() < 0.25 ? Math.floor(Math.random() * 5) + 1 : 0;
        let logMessage = `Liked a post.`;
        if(fameGain > 0) logMessage += ` Gained ${fameGain} fame!`;

        return {
            ...state,
            player: {...state.player, stats: {...state.player.stats, energy: state.player.stats.energy - energyCost, fame: state.player.stats.fame + fameGain}},
            socialFeed: state.socialFeed.map(p => p.id === postId ? {...p, isLiked: true, likes: p.likes + 1} : p),
            log: [...state.log, logMessage],
        }
    }
    
    case ActionType.COMMENT_ON_POST: {
        const { postId, energyCost } = action.payload;
        if(state.player.stats.energy < energyCost) return state;
        const post = state.socialFeed.find(p => p.id === postId);
        if(!post || post.isCommented) return state;

        const repGain = Math.random() < 0.25 ? Math.floor(Math.random() * 5) + 1 : 0;
        let logMessage = `Commented on a post.`;
        if(repGain > 0) logMessage += ` Gained ${repGain} reputation!`;
        
        const newComment = {
            username: state.player.stageName,
            text: "Let's get it!",
            avatarUrl: state.player.avatarUrl,
            createdAt: Date.now(),
        };

        return {
            ...state,
            player: {...state.player, stats: {...state.player.stats, energy: state.player.stats.energy - energyCost, reputation: state.player.stats.reputation + repGain}},
            socialFeed: state.socialFeed.map(p => p.id === postId ? {...p, isCommented: true, comments: [...p.comments, newComment]} : p),
            log: [...state.log, logMessage],
        }
    }

    case ActionType.PROMOTE_RELEASE: {
        const { releaseId, type, cost } = action.payload;
        if (state.player.stats.netWorth < cost) return state;
        
        const updatePromotion = (item: any) => ({ ...item, promotion: { isActive: true, weeksLeft: 4 } });

        let updatedDiscography = { ...state.discography };
        let releaseName = "";
        if (type === 'track') {
            updatedDiscography.tracks = state.discography.tracks.map(t => t.id === releaseId ? (releaseName = t.title, updatePromotion(t)) : t);
        } else if (type === 'album') {
            updatedDiscography.albums = state.discography.albums.map(a => a.id === releaseId ? (releaseName = a.title, updatePromotion(a)) : a);
        } else if (type === 'mv') {
            updatedDiscography.musicVideos = state.discography.musicVideos.map(mv => mv.id === releaseId ? (releaseName = mv.trackTitle, updatePromotion(mv)) : mv);
        }

        return {
            ...state,
            player: { ...state.player, stats: { ...state.player.stats, netWorth: state.player.stats.netWorth - cost } },
            discography: updatedDiscography,
            log: [...state.log, `Started a 4-week promotion for "${releaseName}" for $${cost}.`]
        }
    }

    case ActionType.ADVANCE_WEEK: {
        if (state.activeEvent) return state;

        if (Math.random() < EVENT_CHANCE_PER_WEEK) {
            const event = gameEvents[Math.floor(Math.random() * gameEvents.length)];
            return { ...state, activeEvent: event };
        }
        
        return processWeeklyUpdate(state);
    }

    case ActionType.RESOLVE_EVENT: {
        const { choice } = action.payload;
        const { effects } = choice;
        
        const currentStats = state.player.stats;
        const newStats = {
            ...currentStats,
            fame: currentStats.fame + (effects.fame || 0),
            reputation: currentStats.reputation + (effects.reputation || 0),
            fans: currentStats.fans + (effects.fans || 0),
            netWorth: currentStats.netWorth + (effects.netWorth || 0),
            energy: Math.max(0, currentStats.energy + (effects.energy || 0)),
        }

        const stateAfterEvent = {
            ...state,
            player: {
                ...state.player,
                stats: newStats
            },
            log: [...state.log, effects.log],
            activeEvent: null,
        }

        return processWeeklyUpdate(stateAfterEvent);
    }
    
    case ActionType.TRAIN_SKILL: {
        const { skill, energyCost } = action.payload;
        const player = state.player;
        if (player.stats.energy < energyCost || player.skills[skill] >= 100) {
            return state;
        }
        
        return {
            ...state,
            player: {
                ...player,
                stats: { ...player.stats, energy: player.stats.energy - energyCost },
                skills: { ...player.skills, [skill]: player.skills[skill] + 1 }
            },
            log: [...state.log, `Trained ${skill}, it's now level ${player.skills[skill] + 1}.`]
        }
    }

    case ActionType.BUY_ITEM: {
        const { item } = action.payload;
        const player = state.player;
        if(player.stats.netWorth < item.cost) return state;

        const newStats = {...player.stats, netWorth: player.stats.netWorth - item.cost};
        let newOwnedItemIds = player.ownedItemIds;
        let newStudioEquipment = player.studioEquipment;
        let logMessage = `Purchased ${item.name} for $${item.cost}.`;

        if(item.category === ItemCategory.LIFESTYLE) {
            if(player.ownedItemIds.includes(item.id)) return state; // Already own this unique item
            newOwnedItemIds = [...player.ownedItemIds, item.id];
            newStats.reputation += item.repBonus || 0;
            logMessage += ` Gained ${item.repBonus || 0} reputation.`
        }

        if(item.category === ItemCategory.STUDIO) {
            const equipmentType = item.equipmentType!;
            const currentLevel = player.studioEquipment[equipmentType];
            // Assuming shop items for studio are tiered and have a qualityBonus representing the level
            if(currentLevel >= (item.qualityBonus || 0)) return state; // Already have this level or better
            newStudioEquipment = { ...player.studioEquipment, [equipmentType]: item.qualityBonus || currentLevel };
            logMessage += ` Studio quality improved.`
        }

        return {
            ...state,
            player: {
                ...player,
                stats: newStats,
                ownedItemIds: newOwnedItemIds,
                studioEquipment: newStudioEquipment,
            },
            log: [...state.log, logMessage],
        }
    }

    case ActionType.SAVE_GAME: {
        const { slotId } = action.payload;
        try {
            const stateToSave = { ...state, gameStatus: GameStatus.PLAYING, activeEvent: null };
            localStorage.setItem(`saveSlot_${slotId}`, JSON.stringify(stateToSave));
            const meta: SaveSlot = {
                slotId, saveDate: new Date().toLocaleString(), stageName: state.player.stageName,
                year: state.gameDate.year, netWorth: state.player.stats.netWorth,
            };
            localStorage.setItem(`saveSlot_${slotId}_meta`, JSON.stringify(meta));
            return { ...state, log: [...state.log, `Game saved to slot ${slotId}.`] };
        } catch (e) {
            console.error("Failed to save game", e);
            return { ...state, log: [...state.log, `Error: Could not save game.`] };
        }
    }

    case ActionType.LOAD_GAME: {
        return { ...action.payload.state, log: [...action.payload.state.log.slice(-10), 'Game loaded successfully.'] };
    }

    case ActionType.DELETE_SAVE: {
        try {
            localStorage.removeItem(`saveSlot_${action.payload.slotId}`);
            localStorage.removeItem(`saveSlot_${action.payload.slotId}_meta`);
            return { ...state, log: [...state.log, `Deleted save slot ${action.payload.slotId}.`] };
        } catch (e) {
            console.error("Failed to delete save", e);
        }
        return state;
    }

    default:
      return state;
  }
};

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<GameAction> } | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};