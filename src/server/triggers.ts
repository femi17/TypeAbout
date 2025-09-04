import { Devvit } from '@devvit/public-api';

Devvit.addMenuItem({
  label: 'Play Type About Game',
  location: 'post',
  onPress: async (event, context) => {
    // This will be handled by the web app
    return;
  },
});

Devvit.addMenuItem({
  label: 'View Leaderboard',
  location: 'post',
  onPress: async (event, context) => {
    // This will be handled by the web app
    return;
  },
});

export default Devvit;
