export enum GameStatus {
  SPLASH,
  MAIN_MENU,
  LOAD_GAME,
  CHARACTER_CREATION,
  PLAYING,
  ENDED,
}

export interface PlayerStats {
  fame: number;
  reputation: number;
  fans: number;
  netWorth: number;
  energy: number;
}

export interface GameDate {
  year: number;
  week: number;
}

export interface Promotion {
    isActive: boolean;
    weeksLeft: number;
}

export interface Track {
  id: string;
  title: string;
  quality: number; // 0-100
  streams: number;
  isReleased: boolean;
  albumId: string | null;
  releaseWeek: number | null;
  releaseYear: number | null;
  revenue: number;
  promotion: Promotion;
}

export interface Album {
  id: string;
  title: string;
  trackIds: string[];
  sales: number;
  releaseWeek: number;
  releaseYear: number;
  revenue: number;
  promotion: Promotion;
}

export interface MusicVideo {
    id: string;
    trackId: string;
    trackTitle: string;
    quality: number; // 0-100
    views: number;
    revenue: number;
    promotion: Promotion;
    agency: 'low' | 'mid' | 'high' | 'premium';
}

export interface Player {
  stageName: string;
  avatarUrl: string;
  stats: PlayerStats;
  skills: {
    lyricism: number;
    flow: number;
    production: number;
    marketing: number;
  };
  ownedItemIds: string[];
  studioEquipment: {
    mic: number; // level
    audio: number; // level
    software: number; // level
  };
}

export interface RapGramComment {
    username: string;
    text: string;
    avatarUrl: string;
    createdAt: number;
}

export interface RapGramPost {
    id: string;
    text: string;
    imageUrl: string;
    likes: number;
    comments: RapGramComment[];
    isLiked: boolean;
    isCommented: boolean;
    createdAt: number;
}

export interface GameEventChoice {
    text: string;
    effects: Partial<PlayerStats> & { log: string };
}

export interface GameEvent {
    id: string;
    title: string;
    description: string;
    choices: GameEventChoice[];
}

export interface GameState {
  gameStatus: GameStatus;
  player: Player;
  gameDate: GameDate;
  discography: {
    tracks: Track[];
    albums: Album[];
    musicVideos: MusicVideo[];
  };
  log: string[];
  history: {
      [year: number]: {
          fame: number;
          fans: number;
          netWorth: number;
      }
  };
  socialFeed: RapGramPost[];
  activeEvent: GameEvent | null;
}

export interface SaveSlot {
    slotId: string;
    saveDate: string;
    stageName: string;
    year: number;
    netWorth: number;
}

export enum ItemCategory {
    LIFESTYLE = 'LIFESTYLE',
    STUDIO = 'STUDIO',
}

export interface ShopItem {
    id: string;
    name: string;
    category: ItemCategory;
    cost: number;
    description: string;
    // For LIFESTYLE items
    fameBonus?: number;
    repBonus?: number;
    // For STUDIO items
    equipmentType?: keyof Player['studioEquipment'];
    qualityBonus?: number;
}


export enum ActionType {
  START_GAME = 'START_GAME',
  WORK_JOB = 'WORK_JOB',
  CREATE_TRACK = 'CREATE_TRACK',
  RELEASE_TRACK = 'RELEASE_TRACK',
  CREATE_ALBUM = 'CREATE_ALBUM',
  CREATE_MV = 'CREATE_MV',
  CREATE_RAPGRAM_POST = 'CREATE_RAPGRAM_POST',
  LIKE_POST = 'LIKE_POST',
  COMMENT_ON_POST = 'COMMENT_ON_POST',
  PROMOTE_RELEASE = 'PROMOTE_RELEASE',
  ADVANCE_WEEK = 'ADVANCE_WEEK',
  TRAIN_SKILL = 'TRAIN_SKILL',
  BUY_ITEM = 'BUY_ITEM',
  END_GAME = 'END_GAME',
  SET_STATUS = 'SET_STATUS',
  SAVE_GAME = 'SAVE_GAME',
  LOAD_GAME = 'LOAD_GAME',
  DELETE_SAVE = 'DELETE_SAVE',
  RESOLVE_EVENT = 'RESOLVE_EVENT',
}

export type GameAction =
  | { type: ActionType.START_GAME; payload: { stageName: string; avatarUrl: string } }
  | { type: ActionType.SET_STATUS; payload: GameStatus }
  | { type: ActionType.WORK_JOB; payload: { money: number; energyCost: number; fameGain: number } }
  | { type: ActionType.CREATE_TRACK; payload: { title: string; energyCost: number; beatType: 'free' | 'premium'; cost: number } }
  | { type: ActionType.RELEASE_TRACK; payload: { trackId: string } }
  | { type: ActionType.CREATE_ALBUM; payload: { title: string; trackIds: string[]; energyCost: number; releaseType: 'default' | 'premium'; cost: number } }
  | { type: ActionType.CREATE_MV; payload: { trackId: string; trackTitle: string; energyCost: number; agency: 'low' | 'mid' | 'high' | 'premium'; cost: number } }
  | { type: ActionType.CREATE_RAPGRAM_POST, payload: { energyCost: number } }
  | { type: ActionType.LIKE_POST, payload: { postId: string, energyCost: number } }
  | { type: ActionType.COMMENT_ON_POST, payload: { postId: string, energyCost: number } }
  | { type: ActionType.PROMOTE_RELEASE, payload: { releaseId: string, type: 'track' | 'album' | 'mv', cost: number } }
  | { type: ActionType.ADVANCE_WEEK }
  | { type: ActionType.TRAIN_SKILL, payload: { skill: keyof Player['skills'], energyCost: number } }
  | { type: ActionType.BUY_ITEM, payload: { item: ShopItem } }
  | { type: ActionType.END_GAME }
  | { type: ActionType.SAVE_GAME; payload: { slotId: string } }
  | { type: ActionType.LOAD_GAME; payload: { state: GameState } }
  | { type: ActionType.DELETE_SAVE; payload: { slotId: string } }
  | { type: ActionType.RESOLVE_EVENT; payload: { choice: GameEventChoice } };