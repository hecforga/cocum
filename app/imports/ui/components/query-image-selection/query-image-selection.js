import { Template } from 'meteor/templating';

import { performQuery } from '../../../api/queries/methods.js';

import { Queries } from '../../../api/queries/queries.js';

import './query-image-selection.html';

Template.Query_image_selection.events({
  'click .example-img'(event, instance) {
    const newId = event.target.id;
    if (!instance.data.currentQuery || instance.data.currentQuery._id !== newId) {
      instance.data.currentQueryId.cleanResultsAndSet(newId);
    }
  },

  'click #search-button'(event, instance) {
    const data = {
      croppedImageUrl: instance.data.currentQuery.croppedImageUrl
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
        Queries.update(instance.data.currentQuery._id, { $set : { results: results } });
      }
    });
  }
});
