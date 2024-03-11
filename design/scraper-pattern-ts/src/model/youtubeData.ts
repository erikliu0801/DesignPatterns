import { YoutubeChannel, YoutubeChannelAbout, YoutubeVideo } from '../types/youtubeData';

export const YoutubeData = {
  updateFromChannelAbout: (channel: YoutubeChannel, channelAboutData: YoutubeChannelAbout): YoutubeChannel =>
    ({} as YoutubeChannel),

  updateFromChannelVideos: (channel: YoutubeChannel, channelVideosData: YoutubeVideo[]): YoutubeChannel =>
    ({} as YoutubeChannel),
};
