import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('#SpotifyWrapper library', () => {
  it('Should create an instance of SpotifyWrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('Should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'hello',
    });
    expect(spotify.apiURL).to.be.equal('hello');
  });

  it('Should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('Should receive Token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });
    expect(spotify.token).to.be.equal('foo');
  });

  describe('#Request method', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('Should have request method', () => {
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });

    it('Should call fetch when request', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Should call fetch with correct url passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url');
      expect(fetchedStub).to.have.been.calledWith('url');
    });

    it('Should call fetch with correct headers passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });
      const headers = {
        headers: {
          Authorization: "'Bearer foo'",
        },
      };
      spotify.request('url');
      expect(fetchedStub).to.have.been.calledWith('url', headers);
    });
  });
});
