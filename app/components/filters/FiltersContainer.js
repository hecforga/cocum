import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

import { getCurrentFilters, areFiltersCleared, areFiltersValid, getAppliedFiltersAtLevel } from '../../reducers/index';
import * as actions from '../../actions/index';
import { generateEventLabel } from '../../utilities/googleAnalytics.js';

import PriceFilter from './PriceFilter.js';
import ShopsFilter from './ShopsFilter.js';
import MyButton from "../common/MyButton";

class FiltersContainer extends Component {
  componentWillMount() {
    const { initCurrentFilters, appliedFilters } = this.props;
    initCurrentFilters(appliedFilters);

    this.tracker = new GoogleAnalyticsTracker('UA-106460906-1');
  }

  render() {
    const {
      currentFilters,
      setMinPriceFilter,
      setMaxPriceFilter,
      addShopFilter,
      removeShopFilter,
      areFiltersCleared,
      clearFilters,
    } = this.props;

    return (
      <View style={ styles.container }>
        <ScrollView style={styles.filtersContainer}>
          <View style={styles.filterContainer}>
            <PriceFilter
              minPrice={currentFilters.minPrice}
              maxPrice={currentFilters.maxPrice}
              setMinPriceFilter={setMinPriceFilter}
              setMaxPriceFilter={setMaxPriceFilter} />
          </View>
          <View style={styles.filterContainer}>
            <ShopsFilter selectedShops={currentFilters.shops} addShopFilter={addShopFilter} removeShopFilter={removeShopFilter} />
          </View>
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <MyButton
            title={'Borrar'}
            onPress={() => clearFilters()}
            disabled={areFiltersCleared}
            containerStyle={[styles.buttonContainer, { marginRight: 8 }]}
            buttonStyle={styles.button}
          />
          <MyButton
            title={'Aplicar'}
            onPress={() => this.applyFilters()}
            containerStyle={[styles.buttonContainer, { marginLeft: 8 }]}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    );
  }

  applyFilters() {
    const { navigation, tabName, currentFilters, areFiltersValid, applyFilters } = this.props;

    if (areFiltersValid) {
      const labelData = {
        tabName: tabName,
        minPrice: currentFilters.minPrice,
        maxPrice: currentFilters.maxPrice,
        shops: currentFilters.shops
      };
      this.tracker.trackEvent('button_applyFilters', 'pressed', { label: generateEventLabel(labelData) } );

      applyFilters(currentFilters, tabName);
      navigation.goBack(null);
    } else {
      Alert.alert(
        '',
        'El precio mínimo no puede ser mayor que el precio máximo'
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  filtersContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  filterContainer: {
    marginVertical: 8
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 16
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    padding: 16
  }
});

const mapStateToProps = (state, ownProps) => ({
  currentFilters: getCurrentFilters(state),
  areFiltersCleared: areFiltersCleared(state),
  areFiltersValid: areFiltersValid(state),
  appliedFilters: getAppliedFiltersAtLevel(state, ownProps.tabName, ownProps.level)
});

export default connect(
  mapStateToProps,
  actions
)(FiltersContainer);
