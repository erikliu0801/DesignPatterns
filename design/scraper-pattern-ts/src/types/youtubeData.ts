export type YoutubeChannel = {
  cId: string;
  description: string;
  stats: {
    subscribers: number;
    views: number;
  };
};

export type RawYoutubeChannelAbout = {
  cId: string;
  description: string;
  xxx: string;
};
export type YoutubeChannelAbout = {
  cId: string;
  description: string;
  xxx: string;
};

export type RawYoutubeVideo = {
  vId: string;
  title: string;
  viewsCount: number;
  xxx: string;
};

export type YoutubeVideo = {
  vId: string;
  title: string;
  viewsCount: number;
};
