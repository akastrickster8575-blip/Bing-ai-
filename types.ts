
export interface UserStats {
  balance: number;
  totalData: number;
  photosUploaded: number;
  totalLikes: number;
  totalLikeEarnings: number;
}

export interface PhotoEntry {
  id: string;
  url: string;
  timestamp: number;
  likes: number;
  views: number;
  shares: number;
  comments: number;
  feedback: string;
  isVisible?: boolean; // New property to hide from feed without deleting data
}

export interface HistoryItem {
  id: string;
  type: 'upload' | 'redeem' | 'withdraw';
  amount: number;
  unit: string;
  timestamp: number;
  status: 'completed' | 'pending' | 'failed';
  method?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  avatarColor: string;
  photos: PhotoEntry[];
  history: HistoryItem[];
  totalData: number;
  withdrawalsTotal: number;
}

export enum Tab {
  Dashboard = 'dashboard',
  Upload = 'upload',
  Feed = 'feed',
  Redeem = 'redeem',
  AIGen = 'aigen'
}
