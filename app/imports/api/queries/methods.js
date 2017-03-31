import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Queries } from './queries.js';

export const createQuery = new ValidatedMethod({
  name: 'queries.createQuery',
  validate: new SimpleSchema({
    queryImageUint8Array: { type: Uint8Array },
    imageType: { type: String }
  }).validator(),
  run({ queryImageUint8Array, imageType }) {
    const queryId = Queries.insert({
      imagePath: '',
      results: [],
      error: ''
    });

    const basePath = '../../../../../public';
    const relativePath = '/queries/' + queryId + '/';
    const storagePath = basePath + relativePath;
    let extension = imageType.substring(imageType.lastIndexOf('/') + 1, imageType.length);
    if (extension == 'jpeg')
      extension = 'jpg';
    const imageName = queryId + '.' + extension;
    const imageAbsolutePath = storagePath + imageName;
    const imageRelativePath = relativePath + imageName;

    if (!this.isSimulation) {
      const toBuffer = Npm.require('typedarray-to-buffer');
      const queryImageBuffer = toBuffer(queryImageUint8Array);

      const fs = Npm.require('fs');

      fs.mkdirSync(storagePath);

      fs.writeFileSync(imageAbsolutePath, queryImageBuffer);
      Queries.update(queryId, { $set: { imagePath: imageRelativePath }});

      Meteor._sleepForMs(500);
    }

    return queryId;
  }
});

export const performQuery = new ValidatedMethod({
  name: 'queries.performQuery',
  validate: new SimpleSchema({
    queryId: { type: String }
  }).validator(),
  run({ queryId }) {
    if (!this.isSimulation) {
      const exec = Npm.require('child_process').exec;
      const runCmd = Meteor.wrapAsync(exec);
      runCmd('cd ../../../../../../object_detection;' +
        './shape_predictor_single.py t-shirts/pullandbear/detector_t-shirts_pullandbear_products_squares10x12_53560c1.svm t-shirts/pullandbear/predictor_t-shirts_pullandbear_products_squares10x12.dat ../app/public/queries/' + queryId + '/' + queryId + '.jpg ../app/public/queries/' + queryId + '/;' +
        'cd ../lire;' +
        './gradlew runSearch -PappArgs="[' + "'" + queryId + "'" + ']"');
    }
  }
});
