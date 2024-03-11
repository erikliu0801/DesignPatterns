import { YoutubeDataFacade } from './facade/youtubeDataFacade';

async function main() {
  const youtubeChannelIds: string[] = ['UC-lHJZR3Gqxm24_Vd_AJ5Yw'];

  const promises = youtubeChannelIds.map(YoutubeDataFacade.fetchChannelData);
  const youtubeChannels = await Promise.all(promises); // Bluebird when really work
  console.log(youtubeChannels);
  // store the channel data into database, create or update the channel data
}
