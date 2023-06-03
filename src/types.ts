export type ChallengeType = {
  id: string;
  deposit: number;
  title: string;
  image: string;
  startDate: Date;
  endDate: Date;
  participants: number;
  limit: number;
  minDeposits: number;
  maxDeposits: number;
  hashtags: Array<string>;
  timeLeft: number;
  organizer: {
    name: string;
    image: string;
  };
  description: string;
  nfts: Array<{
    title: string;
    image: string;
    description: string;
  }>;
  background: string;
  fontColor: string;
  average: number;
  disabled?: boolean;
};

export type ExecutionType = {
  id: string;
  account: string;
  challengeId: string;
  count: number;
  imagePath: string;
  imageName: string;
  status: ImageUploadStatus;
  date: Date;
};

export type ImageUploadStatus =
  | 'none'
  | 'uploading'
  | 'success'
  | 'pending'
  | 'rejected'
  | 'load';

export type NftType = {
  image: string;
  hash: string;
};

export type MypageHistoryType = {
  challengeId: string;
  balance: number;
};

export type TokenType = {
  network: string;
  unit: string;
  image: string;
  balance: string;
};
