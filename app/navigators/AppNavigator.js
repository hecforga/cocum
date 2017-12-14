import React, { PropTypes, Component } from 'react';
import { BackHandler, Platform } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator, TabBarTop, TabBarBottom } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import tabs, { getTabNameForHomeScreen } from '../utilities/tabsInfo.js';

import HomeScreen from '../components/HomeScreen.js';
import CategorySelectionScreen from '../components/category_selection/CategorySelectionScreen.js';
import ResultsScreen from '../components/results/ResultsScreen.js';
import FiltersScreen from '../components/filters/FiltersScreen.js';
import TrendingScreen from '../components/trending_tab/TrendingScreen.js';
import CatalogueScreen from '../components/catalogue_tab/CatalogueScreen.js';
import WebViewScreen from '../components/web_view/WebViewScreen.js';

const HomeNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  CategorySelection: { screen: CategorySelectionScreen },
  Results: { screen: ResultsScreen },
  Filters: { screen: FiltersScreen },
  WebView: { screen: WebViewScreen }
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerBackTitle: null
  },
  cardStyle:{
    backgroundColor:'white'
  }
});

const TrendingNavigator = StackNavigator({
  TrendingHome: { screen: TrendingScreen },
  Results: { screen: ResultsScreen },
  Filters: { screen: FiltersScreen },
  WebView: { screen: WebViewScreen }
}, {
  navigationOptions: {
    headerBackTitle: null
  },
  cardStyle:{
    backgroundColor:'white'
  }
});

const CatalogueNavigator = StackNavigator({
  CatalogueHome: { screen: CatalogueScreen },
  Results: { screen: ResultsScreen },
  Filters: { screen: FiltersScreen },
  WebView: { screen: WebViewScreen }
}, {
  navigationOptions: {
    headerBackTitle: null
  },
  cardStyle:{
    backgroundColor:'white'
  }
});

let platformContainerStyles;
if (Platform.OS === 'ios') {
  platformContainerStyles = {    
    backgroundColor:'#F7F7F7',
    borderTopColor:'rgba(0, 0, 0, .3)',
    borderTopWidth: StyleSheet.hairlineWidth,
  };
} else {
  platformContainerStyles = {
    backgroundColor:'white',
    borderTopColor:'#e8e8ee',
    borderTopWidth:0.9
  };
}


export const AppNavigator = TabNavigator({
  HomeTab: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <FontAwesome
          name='home'
          color={tintColor}
          style={{ fontSize: 24}}
        />
      )
    }
  },
  TrendingTab: {
    screen: TrendingNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <FontAwesome
          name='star'
          color={tintColor}
          style={{ fontSize: 24}}
        />
      )
    }
  },
  CatalogueTab: {
    screen: CatalogueNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <MaterialCommunityIcons
          name='hanger'
          color={tintColor}
          style={{ fontSize: 24}}
        />
      )
    }
  }
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: getTabNameForHomeScreen(),
  order: tabs,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#f0742f',
    inactiveTintColor: '#9e9e9e',
    showIcon: true,
    showLabel: false,
    style: {...platformContainerStyles},
    indicatorStyle: { height: 0, width: 0 }
  }
});


class AppWithNavigationState extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => this.onBackPress());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    const homeScreenIndex = tabs.indexOf(getTabNameForHomeScreen());
    if (nav.index === homeScreenIndex && nav.routes[homeScreenIndex].routes.length === 1) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;

    return <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
