import React, { Component } from 'react';
import { StyleSheet, View, WebView, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';

import { getWebViewIsLoading } from '../../reducers/index';
import * as actions from '../../actions';

class WebViewContainer extends Component {
  componentWillUnmount() {
    const { resetWebView } = this.props;

    resetWebView();
  }

  render() {
    const {
      navigation,
      isLoading,
      setWebView,
      setWebViewCanGoBack,
      setWebViewCanGoForward,
      setWebViewIsLoading
    } = this.props;

    return (
      <View style={{flex: 1}}>
        {isLoading ? <View style={styles.whiteOverlay} pointerEvents='box-none' /> : null}
        {isLoading ?
          <View style={styles.loadingContainer} pointerEvents='box-none'>
            <ActivityIndicator />
            <Text style={styles.loadingText}>{'Conectando a ' + navigation.state.params.domain + '...'}</Text>
          </View>
          :
          null
        }
        <WebView
          ref={setWebView}
          source={{uri: navigation.state.params.url}}
          onLoadStart={() => setWebViewIsLoading(true)}
          onLoadEnd={() => setWebViewIsLoading(false)}
          onNavigationStateChange={(navState) => {
            setWebViewCanGoBack(navState.canGoBack);
            setWebViewCanGoForward(navState.canGoForward);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    backgroundColor: 'white',
    opacity: 0.3
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    zIndex: 101
  },
  loadingText: {
    marginLeft: 8
  }
});

const mapStateToProps = (state) => ({
  isLoading: getWebViewIsLoading(state)
});

export default connect(
  mapStateToProps,
  actions
)(WebViewContainer);