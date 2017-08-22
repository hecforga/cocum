const fs = require('fs');
const { Lokka } = require('lokka');
const { Transport } = require('lokka-transport-http');
const Baby = require('babyparse');

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cj2grdzj0e72c0123e02e884g')
});

client.query(`
  query {
    allMyQueries(filter: {
      rating: null
    }) {
      id
  }
}
`).then((res) => {
  res.allMyQueries.forEach((myQuery) => {
    client.mutate(`
      {
        deleteMyQuery(
          id: "${myQuery.id}"
        ) {
          id
        }
      }
    `);
  });
});
