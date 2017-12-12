import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import shops from '../../utilities/shopsInfo.js';

class ShopsFilter extends Component {
  render() {
    const { addShopFilter, removeShopFilter } = this.props;

    return (
      <View>
        <Text style={styles.title}>Tiendas:</Text>
        {shops.map((shop, index) =>
          <TouchableHighlight
            key={index}
            onPress={() => this.isShopSelected(shop.name) ? removeShopFilter(shop.name) : addShopFilter(shop.name)}
          >
            <View style={[styles.button, { borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth }]}>
              <Text style={styles.text}>{shop.label}</Text>
              {this.isShopSelected(shop.name) ?
                <FontAwesome name={'check'} style={styles.icon} />
                :
                null
              }

            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  }

  isShopSelected(shopName) {
    const { selectedShops } = this.props;
    return selectedShops.indexOf(shopName) > -1;
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20
  },
  button: {
    flexDirection: 'row',
    elevation: 4,
    backgroundColor: 'white',
    padding: 8,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
  icon: {
    color: '#2196F3',
    fontSize: 24
  }
});

export default ShopsFilter;