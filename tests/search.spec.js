import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('#Spotify Wrapper', () => {
  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('#Smoke Test', () => {
    it('Should exist the albums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('Should exist the artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('Should exist the tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('Should exist the playLists method', () => {
      expect(spotify.search.playLists).to.exist;
    });
  });

  describe('#spotify.search.artists', () => {
    it('should call fetch method', () => {
      const artists = spotify.search.artists('nirvana');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('nirvana');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=nirvana&type=artist');

      const artists2 = spotify.search.artists('bush');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=bush&type=artist');
    });
  });

  describe('#spotify.search.albums', () => {
    it('should call fetch method', () => {
      const albums = spotify.search.albums('nirvana');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('nirvana');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=nirvana&type=album');

      const albums2 = spotify.search.albums('bush');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=bush&type=album');
    });
  });

  describe('#spotify.search.tracks', () => {
    it('should call fetch method', () => {
      const track = spotify.search.tracks('nirvana');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const track = spotify.search.tracks('nirvana');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=nirvana&type=track');

      const track2 = spotify.search.tracks('bush');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=bush&type=track');
    });
  });

  describe('#spotify.search.playLists', () => {
    it('should call fetch method', () => {
      const playLists = spotify.search.playLists('nirvana');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playLists = spotify.search.playLists('nirvana');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=nirvana&type=playlist');

      const playLists2 = spotify.search.playLists('bush');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=bush&type=playlist');
    });
  });
});
