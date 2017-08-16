import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, Dimensions } from 'react-native';

const SCROLL_VIEW_ITEM_WIDTH = 112;

class CategoriesList extends Component {
  componentWillMount() {
    this.scrollViewPosition = 0;
    const { height, width } = Dimensions.get('window');
    this.screenWidth = width;
  }

  render() {
    const { selectedCategory, setQueryCategory, setCanGoNext } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          onScroll={(e) => this.scrollViewPosition = e.nativeEvent.contentOffset.x}
          scrollEventThrottle={16}
          ref={(scrollView) => this._scrollView = scrollView}
        >
          {categories.map((category, index) =>
            <TouchableOpacity
              key={ index }
              onPress={ () => onCategoryClick(this.scrollViewPosition, index, categories.length, SCROLL_VIEW_ITEM_WIDTH, this.screenWidth, this._scrollView, category.name, setQueryCategory, setCanGoNext)}
              activeOpacity={1}
              style={ styles.scrollViewItem }
            >
              <View style={ styles.categoryNameContainer }>
                {category.labels.map((label) =>
                  <Text key={ label }>{label}</Text>
                )}
              </View>
              <Image source={ category.icon }>
                {category.name === selectedCategory ?
                  <Image source={require('./img/circle_blue.png')} /> :
                  <Image source={require('./img/circle_grey.png')} />
                }
              </Image>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

const categories = [
  {
    name: 'vestidos',
    labels: [
      'Vestidos',
    ],
    icon: require('./img/vestidos.png')
  }, {
    name: 'camisetas_tops_bodies',
    labels: [
      'Camisetas,',
      'tops y bodies'
    ],
    icon: require('./img/camisetas_tops_bodies.png')
  }, {
    name: 'monos',
    labels: [
      'Monos',
    ],
    icon: require('./img/monos.png')
  }, {
    name: 'camisas_blusas',
    labels: [
      'Camisas y',
      'blusas'
    ],
    icon: require('./img/camisas_blusas.png')
  }, {
    name: 'faldas',
    labels: [
      'Faldas',
    ],
    icon: require('./img/faldas.png')
  }, {
    name: 'pantalones_cortos',
    labels: [
      'Pantalones',
      'cortos'
    ],
    icon: require('./img/pantalones_cortos.png')
  }, {
    name: 'pantalones_largos',
    labels: [
      'Pantalones',
      'largos'
    ],
    icon: require('./img/pantalones_largos.png')
  }, {
    name: 'punto',
    labels: [
      'Punto',
    ],
    icon: require('./img/punto.png')
  }, {
    name: 'sudaderas_jerseis',
    labels: [
      'Sudaderas y',
      'jerseis'
    ],
    icon: require('./img/sudaderas_jerseis.png')
  }, {
    name: 'abrigos_chaquetas',
    labels: [
      'Abrigos y',
      'chaquetas'
    ],
    icon: require('./img/abrigos_chaquetas.png')
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  scrollViewItem: {
    flex: 1,
    width: SCROLL_VIEW_ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: 4
  },
});

const onCategoryClick = (scrollViewPosition, index, numberOfItems, scrollViewItemWidth, scrollViewWidth, scrollView, categoryName, setQueryCategory, setCanGoNext) => {
  const scrollViewPositionAtMiddle = scrollViewPosition + scrollViewWidth / 2;
  const clickedCategoryMiddle = index * scrollViewItemWidth + scrollViewItemWidth / 2;
  const scrollViewMaxOffset = numberOfItems * scrollViewItemWidth - scrollViewWidth;

  if (scrollViewMaxOffset > 0) {
    let newScrollViewPosition;
    let auxPosition;
    if (clickedCategoryMiddle <= scrollViewPositionAtMiddle) {
      auxPosition = index * scrollViewItemWidth;
      if (index > 0) {
        auxPosition -= scrollViewItemWidth;
      }
      while (auxPosition > scrollViewMaxOffset) {
        auxPosition -= scrollViewItemWidth;
      }
    } else {
      auxPosition = index * scrollViewItemWidth - scrollViewWidth + scrollViewItemWidth;
      if (index < numberOfItems - 1) {
        auxPosition += scrollViewItemWidth;
      }
      while (auxPosition < 0) {
        auxPosition += scrollViewItemWidth;
      }
    }
    newScrollViewPosition = auxPosition;
    scrollView.scrollTo({ x: newScrollViewPosition, y: 0, animated: false });
  }

  setQueryCategory(categoryName);
  setCanGoNext(true);
};

export default CategoriesList;