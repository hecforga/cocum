import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Constants } from 'expo';

const HomeScreen = ({ navigation }) => (
  <View style={ styles.container }>
    <View style={ styles.topContainer }>
      <Text style={ styles.topText }>Encuentra la ropa que te gusta</Text>
      <Text style={ styles.topText }>a partir de una imagen</Text>
    </View>
    <View style={ styles.centerContainer }>
      <Text style={ styles.centerText }>Escoge una y empieza a buscar</Text>
    </View>
    <View style={ styles.bottomContainer }>
      <Button
        title={'Seleccionar'}
        onPress={() => navigation.navigate('ImageSelection')}
      />
    </View>
  </View>
);

HomeScreen.navigationOptions = {
  title: 'Cocum',
  headerStyle: { marginTop: Constants.statusBarHeight }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  topText: {
    fontSize: 24
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerText: {
  fontSize: 16
},
  bottomContainer: {
    flex: 1,
    alignItems: 'center'
  }
});

export default HomeScreen;
