export interface User {
  name: string;
  email: string;
  id: string;
}

export interface Petition {
  id: string;
  title: string;
  description: string;
  listedBy: User;
  listedOn: Date;
  goal: number;
  votes: number;
  videoId: string;
  longitude: number;
  latitude: number;
}
