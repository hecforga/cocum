import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'
import Modal from 'react-native-modal';

import MyButton from '../common/MyButton.js';

class ProductDetailModal extends Component {
  render() {
    const {
      activeLevel,
      level,
      selectedProduct,
      setSelectedProduct,
      onVisitShopPress,
      onCocumItPress
    } = this.props;

    const isVisible = activeLevel === level && selectedProduct !== null;

    return (
      <View>
        {isVisible ?
          <Modal
            isVisible={isVisible}
            backdropColor='black'
            backdropOpacity={0.5}
            onBackButtonPress={() => setSelectedProduct(null)}
            onBackdropPress={() => setSelectedProduct(null)}
            style={styles.modal}
          >
                <View style={styles.detailTopContainer}>
                  <MyButton
                    iconName='close'
                    iconColor='black'
                    buttonStyle={{backgroundColor: 'white', minWidth:50}}
                    onPress={() => setSelectedProduct(null)}
                  />
                </View>
                <Image
                  style={styles.productImage}
                  source={{uri: selectedProduct.imageUrl}}
                />
                <View style={styles.detailTextContainer}>
                  <Text>{selectedProduct.shop.toUpperCase()}</Text>
                  <Text style={styles.price}>{selectedProduct.price + ' €'}</Text>
                </View>
                <View style={styles.detailBottomContainer}>
                  <MyButton
                    title='Ir a la tienda'
                    buttonStyle={{ minWidth: 120 }}
                    onPress={() => onVisitShopPress()}
                  />
                  <MyButton
                    title='Cocum it!'
                    buttonStyle={{ minWidth: 120 }}
                    onPress={() => onCocumItPress()}
                  />
                </View>
          </Modal>
          :
          null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 70,
    marginBottom: 60,
    margin:35
  },
  detailTopContainer: {
    flex: 0.08,
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  productImage: {
    flex: 0.72,
    resizeMode: 'contain',
    width: undefined,
    height: undefined
  },
  detailTextContainer: {
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  detailBottomContainer: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  price: {
    fontWeight: 'bold'
  }
});

export default ProductDetailModal;