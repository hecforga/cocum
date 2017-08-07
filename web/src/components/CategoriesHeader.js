import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const INITIAL_CATEGORY = 'vestidos_monos';

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

export default CategoriesHeader;