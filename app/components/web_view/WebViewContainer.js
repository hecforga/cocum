import React, { Component } from 'react';
import { StyleSheet, View, WebView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class WebViewContainer extends Component {
  componentWillUnmount() {
    const { resetWebView } = this.props;

    resetWebView();
  }

  render() {
    const { navigation, setWebView, setWebViewCanGoBack, setWebViewCanGoForward } = this.props;

    return (
      <WebView
        ref={setWebView}
        source={{uri: navigation.state.params.url}}
        renderLoading={() => (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size='large' />
          </View>
        )}
        startInLoadingState={!navigation.state.params.url.includes('forever21')}
        onNavigationStateChange={(navState) => {
          setWebViewCanGoBack(navState.canGoBack);
          setWebViewCanGoForward(navState.canGoForward);
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default connect(
  null,
  actions
)(WebViewContainer);