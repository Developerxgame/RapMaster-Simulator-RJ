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

export interface Track {
  id: string;
  title: string;
  quality: number; // 0-100
  streams: number;
  isReleased: boolean;
  albumId: string | null;
  releaseWeek: number | null;
  releaseYear: number | null;
}

export interface Album {
  id: string;
  title: string;
  trackIds: string[];
  sales: number;
  releaseWeek: number;
  releaseYear: number;
}

export interface MusicVideo {
    id: string;
    trackId: string;
    trackTitle: string;
    quality: number; // 0-100
    views: number;
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
  }
}

export interface SaveSlot {
    slotId: string;
    saveDate: string;
    stageName: string;
    year: number;
    netWorth: number;
}


export enum ActionType {
  START_GAME = 'START_GAME',
  WORK_JOB = 'WORK_JOB',
  CREATE_TRACK = 'CREATE_TRACK',
  RELEASE_TRACK = 'RELEASE_TRACK',
  CREATE_ALBUM = 'CREATE_ALBUM',
  CREATE_MV = 'CREATE_MV',
  POST_ON_SOCIAL_MEDIA = 'POST_ON_SOCIAL_MEDIA',
  ADVANCE_WEEK = 'ADVANCE_WEEK',
  TRAIN_SKILL = 'TRAIN_SKILL',
  END_GAME = 'END_GAME',
  SET_STATUS = 'SET_STATUS',
  SAVE_GAME = 'SAVE_GAME',
  LOAD_GAME = 'LOAD_GAME',
  DELETE_SAVE = 'DELETE_SAVE',
}

export type GameAction =
  | { type: ActionType.START_GAME; payload: { stageName: string; avatarUrl: string } }
  | { type: ActionType.SET_STATUS; payload: GameStatus }
  | { type: ActionType.WORK_JOB; payload: { money: number; energyCost: number; fameGain: number } }
  | { type: ActionType.CREATE_TRACK; payload: { track: Omit<Track, 'streams' | 'isReleased' | 'albumId' | 'releaseWeek' | 'releaseYear'>, energyCost: number } }
  | { type: ActionType.RELEASE_TRACK; payload: { trackId: string } }
  | { type: ActionType.CREATE_ALBUM; payload: { title: string, trackIds: string[], energyCost: number } }
  | { type: ActionType.CREATE_MV; payload: { trackId: string, trackTitle: string, energyCost: number } }
  | { type: ActionType.POST_ON_SOCIAL_MEDIA, payload: { energyCost: number, fameGain: number } }
  | { type: ActionType.ADVANCE_WEEK }
  | { type: ActionType.TRAIN_SKILL, payload: { skill: keyof Player['skills'], cost: number, energyCost: number } }
  | { type: ActionType.END_GAME }
  | { type: ActionType.SAVE_GAME; payload: { slotId: string } }
  | { type: ActionType.LOAD_GAME; payload: { state: GameState } }
  | { type: ActionType.DELETE_SAVE; payload: { slotId: string } };