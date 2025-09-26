import React, { createContext, useReducer, useContext, Dispatch, ReactNode } from 'react';
import { GameState, GameAction, ActionType, GameStatus, Player, Track, Album, MusicVideo, SaveSlot } from '../types';

const MAX_ENERGY = 100;
const FANS_PER_FAME_POINT = 10;
const STREAMS_INCOME_RATE = 0.003; // $ per stream
const ALBUM_PRICE = 5;
const ALBUM_SALES_FACTOR = 0.5;
const MV_VIEWS_FACTOR = 1.2;
const END_YEAR = 2060;

const initialState: GameState = {
  gameStatus: GameStatus.SPLASH,
  player: {
    stageName: 'Rookie',
    avatarUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=male1',
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
  history: {}
};

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
        if (state.player.stats.energy < energyCost) return state; // Not enough energy
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
        const { track, energyCost } = action.payload;
        if (state.player.stats.energy < energyCost) return state;
        
        const newTrack: Track = {
            ...track,
            streams: 0,
            isReleased: false,
            albumId: null,
            releaseWeek: null,
            releaseYear: null,
        }

        return {
            ...state,
            player: {
                ...state.player,
                stats: {
                    ...state.player.stats,
                    energy: state.player.stats.energy - energyCost,
                }
            },
            discography: {
                ...state.discography,
                tracks: [...state.discography.tracks, newTrack]
            },
            log: [...state.log, `Recorded a new track: "${track.title}" with a quality score of ${track.quality}.`]
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
                    ...t,
                    isReleased: true,
                    releaseWeek: state.gameDate.week,
                    releaseYear: state.gameDate.year
                } : t)
            },
            log: [...state.log, `Released the single "${trackToRelease.title}".`]
        }
    }

    case ActionType.CREATE_ALBUM: {
        const { title, trackIds, energyCost } = action.payload;
        if (state.player.stats.energy < energyCost) return state;

        const newAlbum: Album = {
            id: `album-${Date.now()}`,
            title,
            trackIds,
            sales: 0,
            releaseWeek: state.gameDate.week,
            releaseYear: state.gameDate.year,
        };

        return {
            ...state,
            player: {
                ...state.player,
                stats: { ...state.player.stats, energy: state.player.stats.energy - energyCost }
            },
            discography: {
                ...state.discography,
                albums: [...state.discography.albums, newAlbum],
                tracks: state.discography.tracks.map(t => trackIds.includes(t.id) ? {
                    ...t,
                    albumId: newAlbum.id,
                    isReleased: true,
                    releaseWeek: state.gameDate.week,
                    releaseYear: state.gameDate.year
                } : t),
            },
            log: [...state.log, `Released a new album: "${title}".`]
        }
    }

    case ActionType.CREATE_MV: {
        const { trackId, trackTitle, energyCost } = action.payload;
        if (state.player.stats.energy < energyCost) return state;
        
        const trackQuality = state.discography.tracks.find(t => t.id === trackId)?.quality || 0;
        
        const marketingBonus = 1 + (state.player.skills.marketing / 200);
        const baseQuality = trackQuality * (0.8 + (state.player.stats.fame + 1) / 10000);
        const mvQuality = Math.min(100, Math.floor(baseQuality * marketingBonus));

        const newMv: MusicVideo = {
            id: `mv-${Date.now()}`,
            trackId,
            trackTitle,
            quality: mvQuality,
            views: 0
        };

        return {
            ...state,
             player: {
                ...state.player,
                stats: { ...state.player.stats, energy: state.player.stats.energy - energyCost }
            },
            discography: {
                ...state.discography,
                musicVideos: [...state.discography.musicVideos, newMv]
            },
            log: [...state.log, `Shot a music video for "${trackTitle}" with quality ${mvQuality}.`]
        }
    }

    case ActionType.POST_ON_SOCIAL_MEDIA: {
        const { energyCost, fameGain } = action.payload;
        if (state.player.stats.energy < energyCost) return state;
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
            log: [...state.log, `Posted on RapGram, gained ${fameGain} fame.`]
        }
    }

    case ActionType.ADVANCE_WEEK: {
        let { week, year } = state.gameDate;
        week++;
        if (week > 52) {
            week = 1;
            year++;
        }
        
        if (year >= END_YEAR) {
            return { ...state, gameStatus: GameStatus.ENDED };
        }
        
        let newEnergy = MAX_ENERGY; // Energy now fully refills each week
        
        let streamIncome = 0;
        const updatedTracks = state.discography.tracks.map(t => {
            if(t.isReleased){
                const newStreams = Math.floor(t.quality * (state.player.stats.fame + 1) * 0.1 * (Math.random() + 0.5));
                streamIncome += newStreams * STREAMS_INCOME_RATE;
                return {...t, streams: t.streams + newStreams};
            }
            return t;
        });

        let albumIncome = 0;
        const updatedAlbums = state.discography.albums.map(a => {
            const weeksSinceRelease = (year - a.releaseYear) * 52 + (week - a.releaseWeek);
            const salesDecay = Math.max(0.1, Math.pow(0.95, weeksSinceRelease));
            const newSales = Math.floor((state.player.stats.fame + 1) * ALBUM_SALES_FACTOR * (1 + state.player.skills.marketing / 100) * (Math.random() * 0.5 + 0.75) * salesDecay);
            albumIncome += newSales * ALBUM_PRICE;
            return {...a, sales: a.sales + newSales};
        });
        
        let fameFromMVs = 0;
        const updatedMVs = state.discography.musicVideos.map(mv => {
            const newViews = Math.floor(mv.quality * (state.player.stats.fame + 1) * MV_VIEWS_FACTOR * (1 + state.player.skills.marketing / 100));
            fameFromMVs += Math.floor(newViews / 5000); // 1 fame per 5000 views
            return {...mv, views: mv.views + newViews};
        });
        
        const totalIncome = streamIncome + albumIncome;
        const fameGrowth = Math.floor(streamIncome / 100) + fameFromMVs;
        const newFame = state.player.stats.fame + fameGrowth;
        const newFans = Math.floor(newFame * FANS_PER_FAME_POINT * (1 + state.player.skills.marketing / 100));

        const newHistory = {...state.history};
        if(week === 52) {
            newHistory[year] = {
                fame: newFame,
                fans: newFans,
                netWorth: state.player.stats.netWorth + totalIncome,
            }
        }

        const newState = {
            ...state,
            gameDate: { week, year },
            player: {
                ...state.player,
                stats: {
                    ...state.player.stats,
                    energy: newEnergy,
                    netWorth: state.player.stats.netWorth + totalIncome,
                    fame: newFame,
                    fans: newFans,
                }
            },
            discography: {
                ...state.discography,
                tracks: updatedTracks,
                albums: updatedAlbums,
                musicVideos: updatedMVs
            },
            log: [...state.log.slice(-10), `Earned $${totalIncome.toFixed(2)} from music sales this week.`],
            history: newHistory
        };
        
        // Auto-save
        try {
            localStorage.setItem('saveSlot_auto', JSON.stringify(newState));
            const meta: SaveSlot = {
                slotId: 'auto',
                saveDate: new Date().toLocaleString(),
                stageName: newState.player.stageName,
                year: newState.gameDate.year,
                netWorth: newState.player.stats.netWorth,
            };
            localStorage.setItem('saveSlot_auto_meta', JSON.stringify(meta));
        } catch (e) {
            console.error("Failed to auto-save game", e);
        }

        return newState;
    }
    
    case ActionType.TRAIN_SKILL: {
        const { skill, cost, energyCost } = action.payload;
        const player = state.player;
        if (player.stats.netWorth < cost || player.stats.energy < energyCost || player.skills[skill] >= 100) {
            return state;
        }
        
        return {
            ...state,
            player: {
                ...player,
                stats: {
                    ...player.stats,
                    netWorth: player.stats.netWorth - cost,
                    energy: player.stats.energy - energyCost,
                },
                skills: {
                    ...player.skills,
                    [skill]: player.skills[skill] + 1
                }
            },
            log: [...state.log, `Trained ${skill}, it's now level ${player.skills[skill] + 1}.`]
        }
    }

    case ActionType.SAVE_GAME: {
        const { slotId } = action.payload;
        try {
            const stateToSave = { ...state, gameStatus: GameStatus.PLAYING };
            localStorage.setItem(`saveSlot_${slotId}`, JSON.stringify(stateToSave));
            const meta: SaveSlot = {
                slotId,
                saveDate: new Date().toLocaleString(),
                stageName: state.player.stageName,
                year: state.gameDate.year,
                netWorth: state.player.stats.netWorth,
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