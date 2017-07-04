import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

const ImagesList = ({ queries, selectedQueryId, onImageClick }) => (
  <View style={ styles.container }>
    {queries.map((query) =>
      <TouchableOpacity
        key={query.id}
        onPress={ () => onImageClick(query.id) }
        activeOpacity={1}
        style={ styles.imageContainer }
      >
        <Image
          source={ { uri: query.imageUrl } }
          style={ getImageStyle(query.id, selectedQueryId) }
        />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 1
  }
});

const getImageStyle = (id, selectedQueryId) => ({
  flex: 1,
  opacity: id === selectedQueryId ? 0.2 : 1
});

export default ImagesList;