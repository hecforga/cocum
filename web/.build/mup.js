module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '188.166.160.54',
      username: 'root',
      pem: '~/.ssh/id_rsa'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'cocum',
    path: '..',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://188.166.160.54',
      MONGO_URL: 'mongodb://meteor:PasswordForMeteor@cluster1-shard-00-00-dmovm.mongodb.net:27017,cluster1-shard-00-01-dmovm.mongodb.net:27017,cluster1-shard-00-02-dmovm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin',
    },

    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      image: 'abernix/meteord:base',
      // imagePort: 80, // (default: 80, some images EXPOSE different ports)
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 120,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  }
};
