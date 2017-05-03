import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import ImagePhotoIcon from 'material-ui/svg-icons/image/photo';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { performQuery } from '../../../api/queries/methods.js';

export default class QueryImageSelection extends Component {
  constructor(props) {
    super(props);

    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleQueryImageClick = this.handleQueryImageClick.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);

    this.state = {
      dialogOpened: false
    };
  }

  handleDialogOpen() {
    this.setState({
      dialogOpened: true
    });
  }

  handleDialogClose() {
    this.setState({
      dialogOpened: false
    });
  }

  handleQueryImageClick(e) {
    e.preventDefault();

    this.handleDialogClose();

    this.props.onUpdateCurrentQuery(e.target.id);
  }

  handleCategoryChange(e, category) {
    this.props.onUpdateCurrentQueryCategory(category);
  }

  handleSearchButtonClick() {
    const data = {
      query: this.props.currentQuery
    };
    performQuery.call(data, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const data = JSON.parse(res.content);
        let results = [];
        for (let i = 0; i < data.docs.length; i++) {
          const doc = data.docs[i];
          results.push(doc.id);
        }

        this.props.onUpdateCurrentQueryResults(results);
      }
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar" primary={true} onTouchTap={this.handleDialogClose}
      />
    ];

    const categories = [
      { value: 'abrigos_chaquetas', label: 'Abrigos y chaquetas' },
      { value: 'camisas_blusas', label: 'Camisas y blusas' },
      { value: 'camisetas_tops_bodies', label: 'Camisetas, tops y bodies' },
      { value: 'faldas', label: 'Faldas' },
      { value: 'pantalones_cortos', label: 'Pantalones cortos' },
      { value: 'pantalones_largos', label: 'Pantalones largos' },
      { value: 'punto', label: 'Punto' },
      { value: 'sudaderas_jerseis', label: 'Sudaderas y jerseis' },
      { value: 'vestidos_monos', label: 'Vestidos y monos' }
    ];

    return (
      <div className="col-xs-12 col-md-4 col-lg-3" style={{overflow: 'auto', height: '97vh'}}>
        <div className="box">
          <div className="row">
            <div className="col-xs-3">
              <div className="box">
                <RaisedButton
                  icon={<ImagePhotoIcon />}
                  onTouchTap={this.handleDialogOpen}
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="col-xs-9">
              <div className="box">
                <TextField
                  id="query-name"
                  value={this.props.currentQuery ? this.props.currentQuery.name : 'Selecciona una imagen'}
                  fullWidth={true}
                />
              </div>
            </div>
          </div>

          <div>
            {!this.props.currentQuery ? null :
              <div>
                <div className="row center-xs" style={{marginBottom: '8px'}}>
                  <div className="col-xs-8">
                    <div className="box">
                      <img src={this.props.currentQuery.imageUrl} style={{maxWidth: '100%'}} />
                    </div>
                  </div>
                </div>

                <div style={{marginBottom: '8px'}}>Elige una categoría:</div>
                <RadioButtonGroup
                  name="shipSpeed"
                  valueSelected={this.props.currentQuery.category}
                  onChange={this.handleCategoryChange}
                >
                  {categories.map((category) => {
                    return (
                      <RadioButton
                        key={category.value}
                        value={category.value}
                        label={category.label}
                      />
                    );
                  })}
                </RadioButtonGroup>
                <div className="row end-xs" style={{marginBottom: '8px'}}>
                  <div className="col-xs-12">
                    <div className="box">
                      <FloatingActionButton onTouchTap={this.handleSearchButtonClick}>
                        <ActionSearchIcon />
                      </FloatingActionButton>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div>

        <Dialog
          title="Selecciona una imagen"
          actions={actions}
          modal={true}
          open={this.state.dialogOpened}
          onRequestClose={this.handleDialogClose}
          autoScrollBodyContent={true}
        >
          <div className="row">
            {this.props.queries.map((query) =>
              <div key={query._id} className="col-xs-4">
                <div className="box">
                  <a href="">
                    <img id={query._id} src={query.imageUrl} onClick={this.handleQueryImageClick} style={{maxWidth: '100%'}} />
                  </a>
                  <div>{query.name}</div>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}
