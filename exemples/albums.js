import SpotifyWrapper from '../src';

global.fetch = require('node-fetch');

const spotify = new SpotifyWrapper({
  token: 'BQAfegOJ32EfHju0_fkHcHHzc0PUFWIkafMd388-bBllIJewR0WUJYRDZbb35bkqvQZldB4mw5j0iCI3MrA0hQ0DdL0a9DVyKBOi1nMbVCWBBpW_CBJ96hF7txPnnSGnTG70HBIBlknx',
});

const albums = spotify.search.albums('nirvana');

albums
  .then(data => data.albums.items.map(item => console.log(item.name)));
