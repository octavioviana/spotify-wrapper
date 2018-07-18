import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('#Album', () => {
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
    it('Should exist the getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('Should exist the getAlbumsTracks method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('Should exist the searchAlbums method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('2uEf3r9i2bnxwJQsxQ0xQ7');
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/albums/2uEf3r9i2bnxwJQsxQ0xQ7');

      const album2 = spotify.album.getAlbum('6N88vAiBfbbyjNm2JRgE43');
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/albums/6N88vAiBfbbyjNm2JRgE43');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbum('2uEf3r9i2bnxwJQsxQ0xQ7');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbums(['2uEf3r9i2bnxwJQsxQ0xQ7', '6N88vAiBfbbyjNm2JRgE43']);
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/albums?ids=2uEf3r9i2bnxwJQsxQ0xQ7,6N88vAiBfbbyjNm2JRgE43');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbums(['2uEf3r9i2bnxwJQsxQ0xQ7', '6N88vAiBfbbyjNm2JRgE43']);
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getTracks('2uEf3r9i2bnxwJQsxQ0xQ7');
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/albums/2uEf3r9i2bnxwJQsxQ0xQ7/tracks');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getTracks('2uEf3r9i2bnxwJQsxQ0xQ7');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
