export const getTabNameForTrendingScreen = () => 'TrendingTab';
export const getTabNameForHomeScreen = () => 'HomeTab';
export const getTabNameForCatalogueScreen = () => 'CatalogueTab';

const tabs = [
  getTabNameForTrendingScreen(),
  getTabNameForHomeScreen(),
  getTabNameForCatalogueScreen()
]; // order matters

export default tabs;

export const generateInitialState = (initialValue) => ({
  [getTabNameForTrendingScreen()]: initialValue,
  [getTabNameForHomeScreen()]: initialValue,
  [getTabNameForCatalogueScreen()]: initialValue
});