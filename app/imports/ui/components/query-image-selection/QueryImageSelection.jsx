import React, { Component } from 'react';
import { HTTP } from 'meteor/http';

import { performQuery } from '../../../api/queries/methods.js';

const CLOUDINARY_UPLOAD_PRESET = 'wzuxiuby';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ddjzq70ve/image/upload';

export default class QueryImageSelection extends Component {
  constructor(props) {
    super(props);

    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleFileInputChange(e) {
    const file = e.target.files.item(0);
    const fileType = file.type;
    if (fileType === 'image/jpeg' || fileType === 'image/png') {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        const queryImageURI = e.target.result;
        this.handleImageUpload(queryImageURI);
      }
    }
  }

  handleImageUpload(queryImageURI) {
    HTTP.post(CLOUDINARY_UPLOAD_URL, { data: { upload_preset: CLOUDINARY_UPLOAD_PRESET, file: queryImageURI } }, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }

      if (res.data.url !== '') {
        this.props.onNewQuery(res.data.public_id, res.data.url);
      }
    });
  }

  handleSearchButtonClick(e) {
    const data = {
      croppedImageUrl: this.props.currentQuery.imageUrl
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
    return (
      <div className="col s12 m4 l3" style={{overflowY: 'auto', height: '100vh'}}>
        <form action="#">
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input id="file-input" type="file" onChange={this.handleFileInputChange}/>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </form>

        <div>
          {!this.props.currentQuery ? null :
            <div>
              <img className="responsive-img" src={this.props.currentQuery.imageUrl} />
              <div className="center-align">
                <a id="search-button" className="waves-effect waves-light btn" onClick={this.handleSearchButtonClick}>buscar</a>
              </div>
            </div>}
        </div>
      </div>
    );
  }
}
