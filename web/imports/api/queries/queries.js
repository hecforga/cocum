import { Mongo } from 'meteor/mongo';

export const Queries = new Mongo.Collection(null);

Queries.insert({
  name: 'Cazadora vaquera',
  imageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1493830905/5710189427_2_6_2.jpg",
  gender: 'mujer',
  category: 'abrigos_chaquetas',
  results : []
});

Queries.insert({
  name: 'Vestido rojo',
  imageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1493831103/2878042600_6_1_1.jpg",
  gender: 'mujer',
  category: 'vestidos_monos',
  results : []
});

Queries.insert({
  name: 'Blusa negra',
  imageUrl : "http://res.cloudinary.com/ddjzq70ve/image/upload/v1493831271/0605022401_6_1_1.jpg",
  gender: 'mujer',
  category: 'camisas_blusas',
  results : []
});