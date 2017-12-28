import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

class NoResultsMessage extends Component {
  render() {
    return (
      <View>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>Lo sentimos</Text>
          <Entypo name='emoji-sad' color='black' style={styles.icon} />
        </View>
        <Text>No hay resultados con los filtros seleccionados</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  topText: {
    fontSize: 20,
    fontWeight: '500',
    marginRight: 40
  },
  icon: {
    fontSize: 32
  }
});

export default NoResultsMessage;