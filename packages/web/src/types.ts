export type User = {
  id: number;
  email?: string;
  username: string;
  avatar_url: string;
  bio: string;
};

export type Meow = {
  id: number;
  creator: User;
  content: string;
  image_url: string;
  inserted_at: string;
  has_liked: boolean;
  like_count: number;
};

export type Like = {
  user: User;
  meow_id: string;
};

export type DefaultError = {
  detail: string;
};

export type AuthResponse = {
  access: string;
};
