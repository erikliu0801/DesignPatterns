// type
import { YoutubeChannel, YoutubeVideo } from '../types/youtubeData';
// scraper: return raw data
import { YoutubeAPI } from '../scraper/youtubeAPI';
// parser: parse raw data into structured data
import { YoutubeDataParser } from '../parser/yotubeDataParser';
// builder: build structured data into final object
import { YoutubeDataBuilder } from '../builder/youtubeDataBuilder';

export const YoutubeDataFacade = {
  // You might inject services, configurations, or anything needed here
  // For simplicity, we are directly using static methods and classes without dependency injection.

  async fetchChannelData(channelId: string): Promise<YoutubeChannel> {
    // Step1. scrape raw data
    const promises = [
      YoutubeAPI.getChannelAbout(channelId), // Fetch raw data from the API
      YoutubeAPI.getChannelVideos(channelId), // if request same time is possible
    ] as const;

    // try and catch here for error handling
    const [rawChannelAbout, rawChannelVideos] = await Promise.all(promises); // Fetch raw data from the API

    // Step2. parse data
    const channelAboutData = YoutubeDataParser.parseAboutPage(rawChannelAbout); // Use the parser to parse raw data (if separate parsing step is required)
    const channelVideosData = rawChannelVideos.map(YoutubeDataParser.parseVideoPage); // Use the parser to parse raw data (if separate parsing step is required)

    // Step3. aggregate data into structured data
    // use the builder to consolidate all data into the final object
    const builder = new YoutubeDataBuilder();
    builder
      .setChannelAbout(channelAboutData) // Set the about page data
      .setYoutubeVideos(channelVideosData); // Set the video page data

    return builder
      .calculateYoutubeStats() // Calculate stats after all data is collected; this can put into build method
      .build(); // Return the fully constructed channel data
  },

  async fetchVideoData(videoId: string): Promise<YoutubeVideo[]> {
    // Step1. scrape raw data
    const rawChannelVideos = await YoutubeAPI.getChannelVideos(videoId); // Fetch raw data from the API

    // Step2. parse data
    const channelVideosData = rawChannelVideos.map(YoutubeDataParser.parseVideoPage); // Use the parser to parse raw data (if separate parsing step is required)

    return channelVideosData;
  },
};
