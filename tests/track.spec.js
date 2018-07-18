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
    it('Should exist the getArtist method', () => {
      expect(spotify.track.track).to.exist;
    });

    it('Should exist the getArtists method', () => {
      expect(spotify.track.tracks).to.exist;
    });
  });

  describe('spotify.track.track', () => {
    it('should call fetch method', () => {
      const track = spotify.track.track();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const track = spotify.track.track('1f3yAtsJtY87CTmM8RLnxf');
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/tracks/1f3yAtsJtY87CTmM8RLnxf');

      const track2 = spotify.track.track('6Ko0LtUSamxOleNdwcM5DL');
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/tracks/6Ko0LtUSamxOleNdwcM5DL');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ track: 'name' });
      const track = spotify.track.track('6Ko0LtUSamxOleNdwcM5DL');
      expect(track.resolveValue).to.be.eql({ track: 'name' });
    });
  });

  describe('spotify.track.tracks', () => {
    it('should call fetch method', () => {
      const tracks = spotify.track.tracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.track.tracks(['1f3yAtsJtY87CTmM8RLnxf', '6Ko0LtUSamxOleNdwcM5DL']);
      expect(fetchedStub).to.have
        .calledWith('https://api.spotify.com/v1/tracks?ids=1f3yAtsJtY87CTmM8RLnxf,6Ko0LtUSamxOleNdwcM5DL');
    });

    it('Should returns the JSON data from the Promise', () => {
      promise.resolves({ tracks: 'name' });
      const tracks = spotify.track.tracks('6Ko0LtUSamxOleNdwcM5DL');
      expect(tracks.resolveValue).to.be.eql({ tracks: 'name' });
    });
  });
});
