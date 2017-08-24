import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const INITIAL_CATEGORY = 'vestidos';

class CategoriesHeader extends Component {
  componentWillMount() {
    const { setQueryCategory } = this.props;

    setQueryCategory(INITIAL_CATEGORY);
  }

  render() {
    const { category, setQueryCategory } = this.props;

    return (
      <div>
        {category ? <Paper style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
          {categories.map((c, index) =>
            <FlatButton
              key={index}
              label={c.label}
              onTouchTap={() => setQueryCategory(c.name)}
              labelStyle={{textTransform: 'none'}}
              backgroundColor={getButtonBackgroundColor(category, c.name)}
            />
          )}
        </Paper> : null}
      </div>
    );
  }
}

const getButtonBackgroundColor = (activeCategory, myName) =>
  activeCategory === myName ? 'light-grey' : 'white';

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
    name: 'camisetas',
    label: 'Camisetas'
  },
  {
    name: 'faldas',
    label: 'Faldas'
  },
  {
    name: 'monos',
    label: 'Monos'
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
    name: 'sudaderas_jerseis',
    label: 'Sudaderas y jerseis'
  },
  {
    name: 'tops_bodies',
    label: 'Tops y bodies'
  },
  {
    name: 'vestidos',
    label: 'Vestidos'
  }
];

export default CategoriesHeader;