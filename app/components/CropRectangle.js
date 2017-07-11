import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Platform } from 'react-native';
import { Constants } from 'expo';

const STATUSBAR_HEIGHT = Constants.statusBarHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const TOP_OFFSET = STATUSBAR_HEIGHT + APPBAR_HEIGHT;
const PADDING = 30;
const MIN_GRID_SIZE = 70;

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

    this.movingSides = [];
  }

  componentDidMount() {
    this.rectStyles = {
      style: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    };

    this.insideStyles = {
      style: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    };

    this.topStyles = {
      style: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    };

    this.rightStyles = {
      style: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    };

    this.bottomStyles = {
      style: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    };

    this.leftStyles = {
      style: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    };

    this.updateNativeStyles(this.x0, this.y0, this.x1, this.y1);
  }

  render() {
    const { imageLayout } = this.props;

    if (!imageLayout) {
      return null;
    }

    return (
      <View>
        <View
          ref={(inside) => {
            this._inside = inside;
          }}
          style={styles.inside}
        />
        <View
          ref={(top) => {
            this._top = top;
          }}
          style={styles.surround}
        />
        <View
          ref={(right) => {
            this._right = right;
          }}
          style={styles.surround}
        />
        <View
          ref={(bottom) => {
            this._bottom = bottom;
          }}
          style={styles.surround}
        />
        <View
          ref={(left) => {
            this._left = left;
          }}
          style={styles.surround}
        />
        <View
          ref={(rect) => {
            this._rect = rect;
          }}
          style={styles.rect}
          {...this.panResponder.panHandlers}
        />
      </View>
    );
  }

  updateNativeStyles(x0, y0, x1, y1) {
    this.rectStyles.style.left = x0;
    this.rectStyles.style.top = y0;
    this.rectStyles.style.width = x1 - x0;
    this.rectStyles.style.height = y1 - y0;

    this.insideStyles.style.left = x0 + PADDING;
    this.insideStyles.style.top = y0 + PADDING;
    this.insideStyles.style.width = x1 - x0 - 2 * PADDING;
    this.insideStyles.style.height = y1 - y0 - 2 * PADDING;

    this.topStyles.style.left = this.imageLayout.x;
    this.topStyles.style.top = this.imageLayout.y;
    this.topStyles.style.width = this.imageLayout.width;
    this.topStyles.style.height = y0 + PADDING - this.topStyles.style.top;

    this.rightStyles.style.left = x1 - PADDING;
    this.rightStyles.style.top = y0 + PADDING;
    this.rightStyles.style.width = this.imageLayout.x + this.imageLayout.width - this.rightStyles.style.left;
    this.rightStyles.style.height = y1 - PADDING - this.rightStyles.style.top;

    this.bottomStyles.style.left = this.imageLayout.x;
    this.bottomStyles.style.top = y1 - PADDING;
    this.bottomStyles.style.width = this.imageLayout.width;
    this.bottomStyles.style.height = this.imageLayout.y + this.imageLayout.height - this.bottomStyles.style.top;

    this.leftStyles.style.left = this.imageLayout.x;
    this.leftStyles.style.top = y0 + PADDING;
    this.leftStyles.style.width = x0 + PADDING - this.imageLayout.x;
    this.leftStyles.style.height = y1 - PADDING - this.rightStyles.style.top;

    this._rect && this._rect.setNativeProps(this.rectStyles);
    this._inside && this._inside.setNativeProps(this.insideStyles);
    this._top && this._top.setNativeProps(this.topStyles);
    this._right && this._right.setNativeProps(this.rightStyles);
    this._bottom && this._bottom.setNativeProps(this.bottomStyles);
    this._left && this._left.setNativeProps(this.leftStyles);
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

    this.updateNativeStyles(x0Aux, y0Aux, x1Aux, y1Aux);
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
    backgroundColor: 'green',
    opacity: 0
  },
  inside: {
    borderColor: 'white',
    borderWidth: 1
  },
  surround: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5
  }
});

export default CropRectangle;