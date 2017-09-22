import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';

import ProductThumbnail from './ProductThumbnail.js';
import MyButton from './MyButton.js';

class ProductsHorizontalList extends Component {
  render() {
    const {
      title,
      button,
      buttonTitle,
      onButtonPress,
      onProductPress,
      products,
      scrollbarStyle,
      productThumbnailContainerStyle
    } = this.props;

    return (
      <View style={ scrollbarStyle}>
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>{title}</Text>
          {button ?
            <MyButton
              title={buttonTitle}
              textStyle={{color:'#2196F3'}}
              buttonStyle={{
                backgroundColor: 'transparent',
                justifyContent: 'flex-end',
                marginRight: StyleSheet.flatten(scrollbarStyle).marginLeft
              }}
              onPress={onButtonPress}
            />
            :
            <View/>
          }
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => this.scrollViewPosition = e.nativeEvent.contentOffset.x}
          scrollEventThrottle={16}
          ref={(scrollView) => this._scrollView = scrollView}
        >
          {products.map((product, index) =>
            <ProductThumbnail
              key={ product.productId}
              product={product}
              productThumbnailContainerStyle={[
                {
                  marginTop: 4,
                  marginLeft: index === 0 ? 0 : 4,
                  marginRight: index === (products.length - 1) ? StyleSheet.flatten(scrollbarStyle).marginLeft : 4
                },
                productThumbnailContainerStyle
              ]}
              onPress={onProductPress}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '500',
    fontSize: 20,
  }
});

export default ProductsHorizontalList;