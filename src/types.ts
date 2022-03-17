export type Post = {
  id: string;
  username: string;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
  visible: boolean;
  avatar: string;
};

export type User = {
  username: string;
  password: string;
};
