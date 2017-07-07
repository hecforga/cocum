import React, { Component } from 'react';
import { StyleSheet, View, Image, PanResponder, Platform } from 'react-native';
import { Constants } from 'expo';

const STATUSBAR_HEIGHT = Constants.statusBarHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const TOP_OFFSET = STATUSBAR_HEIGHT + APPBAR_HEIGHT;
const PADDING = 20;
const MIN_GRID_SIZE = 80;

class CropRectangle extends Component {
  componentWillMount() {
    const { imageLayout, onPanResponderEnd } = this.props;

    this.imageLayout = imageLayout;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.handlePanResponderGrant(e, gestureState);
      },
      onPanResponderMove: (e, gestureState,) => {
        this.handlePanResponderMove(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        this.handlePanResponderEnd(e, gestureState, onPanResponderEnd);
      },
      onPanResponderTerminate: (e, gestureState) => {
        this.handlePanResponderEnd(e, gestureState, onPanResponderEnd);
      },
    });

    this.movingSides = [];
  }

  componentWillUpdate(newProps) {
    const { imageLayout } = newProps;

    if (this.imageLayout === imageLayout) {
      return;
    }

    this.imageLayout = imageLayout;

    this.leftLimit = imageLayout.x;
    this.topLimit = imageLayout.y;
    this.rightLimit = imageLayout.x + imageLayout.width;
    this.bottomLimit = imageLayout.y + imageLayout.height;

    const initialWidth = Math.max(imageLayout.width / 3, MIN_GRID_SIZE);
    const initialHeight = Math.max(imageLayout.height / 3, MIN_GRID_SIZE);
    this.x0 = imageLayout.x + initialWidth - PADDING;
    this.y0 = imageLayout.y + initialHeight - PADDING;
    this.x1 = this.x0 + initialWidth + 2 * PADDING;
    this.y1 = this.y0 + initialHeight + 2 * PADDING;

    this.rectStyles = {
      style: {
        left: this.x0,
        top: this.y0,
        width: this.x1 - this.x0,
        height: this.y1 - this.y0
      }
    };
  }

  componentDidUpdate() {
    this.updateNativeStyles();
  }

  render() {
    const { imageLayout } = this.props;

    if (!imageLayout) {
      return null;
    }

    return (
      <View
        ref={(rect) => {
          this._rect = rect;
        }}
        style={styles.rect}
        {...this.panResponder.panHandlers}
      >
        <Image
          source={require('./img/grid.png')}
          style={styles.grid}
          resizeMode={'stretch'}
        />
      </View>
    );
  }

  updateNativeStyles() {
    this._rect && this._rect.setNativeProps(this.rectStyles);
  }

  handlePanResponderGrant(e, gestureState) {
    if (gestureState.x0 < this.x0 + 2 * PADDING) {
      this.movingSides.push('left');
    }
    if (gestureState.y0 - TOP_OFFSET < this.y0 + 2 * PADDING) {
      this.movingSides.push('top');
    }
    if (gestureState.x0 > this.x1 - 2 * PADDING) {
      this.movingSides.push('right');
    }
    if (gestureState.y0 - TOP_OFFSET > this.y1 - 2 * PADDING) {
      this.movingSides.push('bottom');
    }
    if (this.movingSides.length === 0) {
      this.movingSides.push('left', 'top', 'right', 'bottom');
    }
  }

  handlePanResponderMove(e, gestureState) {
    const minRectSize = MIN_GRID_SIZE + 2 * PADDING;

    if (this.movingSides.includes('left')) {
      if (gestureState.dx < 0) {
        gestureState.dx = Math.max(gestureState.dx, this.leftLimit - PADDING - this.x0);
      } else if (!this.movingSides.includes('right')) {
        gestureState.dx = Math.min(gestureState.dx, this.x1 - minRectSize - this.x0);
      }
    }
    if (this.movingSides.includes('top')) {
      if (gestureState.dy < 0) {
        gestureState.dy = Math.max(gestureState.dy, this.topLimit - PADDING - this.y0);
      } else if (!this.movingSides.includes('bottom')) {
        gestureState.dy = Math.min(gestureState.dy, this.y1 - minRectSize - this.y0);
      }
    }
    if (this.movingSides.includes('right')) {
      if (gestureState.dx > 0) {
        gestureState.dx = Math.min(gestureState.dx, this.rightLimit + PADDING - this.x1);
      } else if (!this.movingSides.includes('left')) {
        gestureState.dx = Math.max(gestureState.dx, this.x0 + minRectSize - this.x1);
      }
    }
    if (this.movingSides.includes('bottom')) {
      if (gestureState.dy > 0) {
        gestureState.dy = Math.min(gestureState.dy, this.bottomLimit + PADDING - this.y1);
      } else if (!this.movingSides.includes('top')) {
        gestureState.dy = Math.max(gestureState.dy, this.y0 + minRectSize - this.y1);
      }
    }

    let x0Aux = this.x0;
    let y0Aux = this.y0;
    let x1Aux = this.x1;
    let y1Aux = this.y1;
    if (this.movingSides.includes('left')) {
      x0Aux += gestureState.dx;
    }
    if (this.movingSides.includes('top')) {
      y0Aux += gestureState.dy;
    }
    if (this.movingSides.includes('right')) {
      x1Aux += gestureState.dx;
    }
    if (this.movingSides.includes('bottom')) {
      y1Aux += gestureState.dy;
    }

    this.rectStyles.style.left = x0Aux;
    this.rectStyles.style.top = y0Aux;
    this.rectStyles.style.width = x1Aux - x0Aux;
    this.rectStyles.style.height = y1Aux - y0Aux;

    this.updateNativeStyles();
  }

  handlePanResponderEnd(e, gestureState, onPanResponderEnd) {
    this.x0 = this.rectStyles.style.left;
    this.y0 = this.rectStyles.style.top;
    this.x1 = this.x0 + this.rectStyles.style.width;
    this.y1 = this.y0 + this.rectStyles.style.height;

    const cropData = {
      offset: {
        x: this.x0 + PADDING,
        y: this.y0 + PADDING
      },
      size: {
        width: this.x1 - this.x0 - 2 * PADDING,
        height: this.y1 - this.y0 - 2 * PADDING
      }
    };
    onPanResponderEnd(cropData);

    this.movingSides = [];
  }
}

const styles = StyleSheet.create({
  rect: {
    position: 'absolute',
    flex: 1,
    padding: PADDING,
  },
  grid: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined
  }
});

export default CropRectangle;