import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';

import SelectableList from './SelectableList.js';

class CategoriesList extends Component {
  render() {
    return (
      <div style={{flex: 1}}>
        <SelectableList defaultValue={0}>
          {categories.map((category, index) =>
            <ListItem
              key={index}
              value={index}
              primaryText={category.label}
            />
          )}
        </SelectableList>
      </div>
    );
  }
}

const categories = [
  {
    name: 'abrigos_chaquetas',
    label: 'Abrigos y chaquetas'
  },
  {
    name: 'camisas_blusas',
    label: 'Camisas y blusas'
  },
  {
    name: 'camisetas_tops_bodies',
    label: 'Camisetas, tops y bodies'
  },
  {
    name: 'faldas',
    label: 'Faldas'
  },
  {
    name: 'pantalones_cortos',
    label: 'Pantalones cortos'
  },
  {
    name: 'pantalones_largos',
    label: 'Pantalones largos'
  },
  {
    name: 'punto',
    label: 'Punto'
  },
  {
    name: 'sudaderas_jerseis',
    label: 'Sudaderas y jerseis'
  },
  {
    name: 'vestidos_monos',
    label: 'Vestidos y monos'
  }
];

export default CategoriesList;