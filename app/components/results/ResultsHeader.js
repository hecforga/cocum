import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import MyButton from '../common/MyButton.js';

class ResultsHeader extends Component {
  render() {
    const { navigation, level } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ marginLeft: 16, marginRight: 16, fontSize: 20 }}>Resultados</Text>
          <View>
            <MyButton
              touchableType={'highlight'}
              title={'Filtrar'}
              onPress={() => navigation.navigate('Filters', { level })}
              buttonStyle={{ flex: 1, backgroundColor: '#e8e8ee', borderRadius: 0 }}
              textStyle={{ color: 'black' }}
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 48
  }
});

export default ResultsHeader;