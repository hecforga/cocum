export const getTabNameForTrendingScreen = () => 'TrendingTab';
export const getTabNameForHomeScreen = () => 'HomeTab';
export const getTabNameForExploreScreen = () => 'ExploreTab';

const tabs = [
  getTabNameForTrendingScreen(),
  getTabNameForHomeScreen(),
  getTabNameForExploreScreen()
]; // order matters

export default tabs;

export const generateInitialState = (initialValue) => ({
  [getTabNameForTrendingScreen()]: initialValue,
  [getTabNameForHomeScreen()]: initialValue,
  [getTabNameForExploreScreen()]: initialValue
});