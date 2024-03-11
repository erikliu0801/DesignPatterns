import { RawYoutubeChannelAbout, RawYoutubeVideo, YoutubeChannelAbout, YoutubeVideo } from '../types/youtubeData';

/** parse RawYoutubeData into YoutubeData  */
export const YoutubeDataParser = {
  parseAboutPage: (raw: RawYoutubeChannelAbout): YoutubeChannelAbout => ({} as YoutubeChannelAbout),
  parseVideoPage: (raw: RawYoutubeVideo): YoutubeVideo => ({} as YoutubeVideo),
};
