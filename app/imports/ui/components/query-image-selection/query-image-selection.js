import { Template } from 'meteor/templating';

import { createQuery } from '../../../api/queries/methods.js';
import { performQuery } from '../../../api/queries/methods.js';

import './query-image-selection.html';

Template.Query_image_selection.helpers({

});

Template.Query_image_selection.events({
  'change #file-input'(event, instance) {
    const file = event.target.files.item(0);
    const fileType = file.type;
    if (fileType == 'image/jpeg' || fileType == 'image/png') {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = function(event) {
        const queryImageArrayBuffer = event.target.result;
        const queryImageUint8Array = Buffer.from(queryImageArrayBuffer);
        const data = {
          queryImageUint8Array: queryImageUint8Array,
          imageType: fileType
        };
        createQuery.call(data, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            instance.data.currentQueryId.set(res);
          }
        })
      }
    } else {
      //TODO: show 'invalid format' message
    }
  },

  'click #search-button'(event, instance) {
    const data = { queryId: instance.data.currentQuery._id };
    performQuery.call(data);
  }
});
