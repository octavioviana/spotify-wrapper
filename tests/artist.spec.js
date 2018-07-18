import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('#Artist', () => {
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
    it('Should exist the getArtists method', () => {
      expect(spotify.artist.artist).to.exist;
    });

    it('Should exist the getArtists method', () => {
      expect(spotify.artist.artists).to.exist;
    });

    it('Should exist the getArtistAlbums method', () => {
      expect(spotify.artist.albums).to.exist;
    });

    it('Should exist the getArtistAlbums method', () => {
      expect(spotify.artist.topTracks).to.exist;
    });
  });

  describe('spotify.artist.artists', () => {
    it('should call fetch method', () => {
      const artists = spotify.artist.artist();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.artist.artist('6pAuTi6FXi6qFQJ1dzMXQs');
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/artists/6pAuTi6FXi6qFQJ1dzMXQs');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ artist: 'name' });
      const artist = spotify.artist.artist('6pAuTi6FXi6qFQJ1dzMXQs');
      expect(artist.resolveValue).to.be.eql({ artist: 'name' });
    });
  });

  describe('spotify.artist.artists', () => {
    it('should call fetch method', () => {
      const artists = spotify.artist.artists();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.artist.artists(['3sS2Q1UZuUXL7TZSbQumDI', '6pAuTi6FXi6qFQJ1dzMXQs']);
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/artists?ids=3sS2Q1UZuUXL7TZSbQumDI,6pAuTi6FXi6qFQJ1dzMXQs');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ artist: 'name' });
      const artist = spotify.artist.artists(['6pAuTi6FXi6qFQJ1dzMXQs', '3sS2Q1UZuUXL7TZSbQumDI']);
      expect(artist.resolveValue).to.be.eql({ artist: 'name' });
    });
  });

  describe('spotify.artist.albums', () => {
    it('should call fetch method', () => {
      const artistsAlbums = spotify.artist.albums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artistsAlbums = spotify.artist.albums('6pAuTi6FXi6qFQJ1dzMXQs');
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/artists/6pAuTi6FXi6qFQJ1dzMXQs/albums');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ artistsAlbums: 'name' });
      const artistsAlbums = spotify.artist.albums('6pAuTi6FXi6qFQJ1dzMXQs');
      expect(artistsAlbums.resolveValue).to.be.eql({ artistsAlbums: 'name' });
    });
  });

  describe('spotify.artist.topTracks', () => {
    it('should call fetch method', () => {
      const artistsTopTracks = spotify.artist.topTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artistsTopTracks = spotify.artist.topTracks('6pAuTi6FXi6qFQJ1dzMXQs', 'ES');
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/artists/6pAuTi6FXi6qFQJ1dzMXQs/top-tracks?country=ES');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ artistsTopTracks: 'name' });
      const artistsTopTracks = spotify.artist.topTracks('6pAuTi6FXi6qFQJ1dzMXQs', 'ES');
      expect(artistsTopTracks.resolveValue).to.be.eql({ artistsTopTracks: 'name' });
    });
  });
});
