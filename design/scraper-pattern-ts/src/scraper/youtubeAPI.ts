import { RawYoutubeChannelAbout, RawYoutubeVideo } from '../types/youtubeData';

/** return RawYoutubeData type */
export class YoutubeAPI {
  static getChannelAbout = async (channelId: string): Promise<RawYoutubeChannelAbout> => ({} as RawYoutubeChannelAbout);
  static getChannelVideos = async (videoId: string): Promise<RawYoutubeVideo[]> => [];
}
