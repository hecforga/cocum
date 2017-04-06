import { Mongo } from 'meteor/mongo';

export const Queries = new Mongo.Collection(null);

Queries.insert({
  imageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1491210829/5237518250_2_1_2.jpg",
  croppedImageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1491224013/5237518250_2_1_2_CROPPED.png",
  results : []
});

Queries.insert({
  imageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1491210829/5239555800_2_1_2.jpg",
  croppedImageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1491224013/5239555800_2_1_2_CROPPED.png",
  results : []
});

Queries.insert({
  imageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1491210829/9237506401_2_1_2.jpg",
  croppedImageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1491224013/9237506401_2_1_2_CROPPED.png",
  results : []
});