import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

class PriceFilter extends Component {
  render() {
    const { minPrice, maxPrice, setMinPriceFilter, setMaxPriceFilter } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Precio (€):</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            value={minPrice}
            placeholder={'Mín.'}
            maxLength={4}
            keyboardType={'numeric'}
            onChangeText={(text) => setMinPriceFilter(text)}
            selectTextOnFocus={true}
            style={styles.textInput}
          />
          <Text style={styles.separator}>-</Text>
          <TextInput
            value={maxPrice}
            placeholder={'Máx.'}
            maxLength={4}
            keyboardType={'numeric'}
            onChangeText={(text) => setMaxPriceFilter(text)}
            selectTextOnFocus={true}
            style={styles.textInput}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  title: {
    fontSize: 20,
    paddingBottom: 8
  },
  textInput: {
    fontSize: 18,
    height: 40,
    width: 60,
    textAlign: 'center'
  },
  separator: {
    fontSize: 18,
    marginLeft: 8,
    marginRight: 8
  }
});

export default PriceFilter;