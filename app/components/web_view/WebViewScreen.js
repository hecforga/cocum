import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { Constants } from 'expo';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import WebViewContainer from './WebViewContainer.js';
import HeaderButtonContainer from '../header/HeaderButtonContainer.js';

let _webView = null;

class WebViewScreen extends Component {
  componentWillMount() {
    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
    this.tracker.trackScreenView('WebView');
  }

  render() {
    const { navigation } = this.props;

    return (
      <WebViewContainer navigation={navigation} setWebView={(webView) => _webView = webView} />
    );
  }
}

WebViewScreen.navigationOptions = {
  title: 'Comprar',
  headerRight: (
    <View style={{ flexDirection: 'row', marginRight: 4 }}>
      <HeaderButtonContainer
        iconName='ios-arrow-back-outline'
        iconFamily='Ionicons'
        iconColor='black'
        buttonStyle={{
          backgroundColor: Platform.OS === 'ios' ? '#F7F7F7' : '#FFF',
          padding: 16
        }}
        iconStyle={{ fontSize: 24 }}
        onPress={(state) => {
          if (state.webView.canGoBack) {
            _webView.goBack();
          }
        }}
        isDisabled={(state) => !state.webView.canGoBack}
        noBackground={true}
      />
      <HeaderButtonContainer
        iconName='ios-arrow-forward-outline'
        iconFamily='Ionicons'
        iconColor='black'
        buttonStyle={{
          backgroundColor: Platform.OS === 'ios' ? '#F7F7F7' : '#FFF',
          padding: 16
        }}
        iconStyle={{ fontSize: 24 }}
        onPress={(state) => {
          if (state.webView.canGoForward) {
            _webView.goForward();
          }
        }}
        isDisabled={(state) => !state.webView.canGoForward}
        noBackground={true}
      />
    </View>
  ),
  headerStyle: Platform.OS === 'android' ? {marginTop: Constants.statusBarHeight} : null,
  tabBarVisible: false
};

export default WebViewScreen;
