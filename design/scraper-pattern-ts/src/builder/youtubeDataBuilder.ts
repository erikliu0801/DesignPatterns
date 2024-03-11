// type
import type {
  YoutubeChannel,
  RawYoutubeChannelAbout,
  RawYoutubeVideo,
  YoutubeChannelAbout,
  YoutubeVideo,
} from '../types/youtubeData';
// model
import { YoutubeData } from '../model/youtubeData';

export const oriYoutubeChannel: YoutubeChannel = {
  cId: '',
  description: '',
  stats: {
    subscribers: 0,
    views: 0,
  },
};

const merge = (ori: any, update: any) => ({ ...ori, ...update });
const steps = ['aboutPage', 'videoPage'] as const;
type Step = (typeof steps)[number];

export class YoutubeDataBuilder {
  private youtubeChannel: YoutubeChannel;

  /** handle model methods */
  private updateYoutubeChannel = <T>(
    data: T,
    modelMethod: (channel: YoutubeChannel, data: T) => YoutubeChannel,
    step: Step
  ) => {
    this.youtubeChannel = modelMethod(this.youtubeChannel, data);
    this.status[step] = true;
    return this;
  };

  private status: Record<Step, boolean> = {
    aboutPage: false,
    videoPage: false,
  };

  constructor() {
    this.youtubeChannel = oriYoutubeChannel;
  }

  setChannelAbout = (data: YoutubeChannelAbout) =>
    this.updateYoutubeChannel(data, YoutubeData.updateFromChannelAbout, 'aboutPage');
  setYoutubeVideos = (data: YoutubeVideo[]) =>
    this.updateYoutubeChannel(data, YoutubeData.updateFromChannelVideos, 'videoPage');

  calculateYoutubeStats = () => this;

  // check if all steps are done
  build = () => this.youtubeChannel;
}

class YoutubeChannelExtractor {
  static extractAboutPage = (json: string): RawYoutubeChannelAbout => ({} as RawYoutubeChannelAbout);
  static extractVideoPage = (json: string): RawYoutubeVideo[] => ({} as RawYoutubeVideo[]);
}

class YoutubeChannelParser {
  static parseAboutPage = (raw: RawYoutubeChannelAbout): Partial<YoutubeChannel> => ({} as Partial<YoutubeChannel>);
  static parseVideoPage = (raw: RawYoutubeVideo[]): Partial<YoutubeChannel> => ({} as Partial<YoutubeChannel>);
}

const scrapeYoutubeProgress = async () => {
  const builder = new YoutubeDataBuilder();

  // scrape about page
  const rawAboutPage = await YoutubeChannelExtractor.extractAboutPage('');
  builder.setChannelAbout(rawAboutPage);

  // scrape videos page
  const rawVideos = await YoutubeChannelExtractor.extractVideoPage('');
  builder.setYoutubeVideos(rawVideos);

  // after all pages are scraped, build stats
  builder.calculateYoutubeStats();

  // build channel
  const youtubeChannel = builder.build();
  return youtubeChannel;
};
