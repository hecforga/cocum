import { HTTP } from 'meteor/http';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const performQuery = new ValidatedMethod({
  name: 'queries.performQuery',
  validate: new SimpleSchema({
    croppedImageUrl: { type: String }
  }).validator(),
  run({ croppedImageUrl }) {
    if (!this.isSimulation) {
      const url = 'http://139.59.155.103:8983/solr/lire/lireq?url=' + croppedImageUrl + '&field=ce&ms=false&rows=12';
      return HTTP.get(url);
    }
  }
});
