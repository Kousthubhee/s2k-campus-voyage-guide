
// Shared types for the Hub feature
export type QAReply = {
  id: number;
  author: string;
  content: string;
  time?: string;
  likes: number;
};

export type QAComment = {
  id: number;
  author: string;
  content: string;
  time?: string;
  likes: number;
  replies: QAReply[];
};

export type QAPost = {
  id: number;
  type: "post";
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: QAComment[];
  category: string;
};

export type Reel = {
  id: number;
  type: "reel";
  author: string;
  avatar: string;
  time: string;
  videoUrl: string;
  caption: string;
  likes: number;
  comments: QAComment[];
  category: string;
};

export type Poll = {
  id: number;
  type: "poll";
  author: string;
  avatar: string;
  time: string;
  question: string;
  options: { text: string; votes: number }[];
  likes: number;
  comments: QAComment[];
  category: string;
};

export type Blog = {
  id: number;
  author: string;
  title: string;
  time: string;
  content: string;
  likes: number;
  comments: QAComment[];
};
