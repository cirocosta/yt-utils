'use strict';

var YT = require('../src/yt')
  , assert = require('assert')
  , request = require('request')
  , sinon = require('sinon')
  , yt = null;

describe('YT,', function () {
  beforeEach(function () {
    yt = new YT();
  });

  it('should be defined', function () {
    assert(!!yt);
  });

  describe('isYoutubeVideoUrl,', function () {
    it('should match a normal youtube url', function () {
      var url = 'https://www.youtube.com/watch?v=vRxeiUD1Hyw';
      var expected = true;
      var actual = !!yt.isYoutubeVideoUrl(url);

      assert.equal(actual, expected);
    });

    it('should match a yt url without wwww', function () {
      var url = 'https://youtube.com/watch?v=vRxeiUD1Hyw';
      var expected = true;
      var actual = !!yt.isYoutubeVideoUrl(url);

      assert.equal(actual, expected);
    });

    it('should NOT match a vimeo url', function () {
      var url = 'https://vimeo.com/90375500';
      var expected = false;
      var actual = !!yt.isYoutubeVideoUrl(url);

      assert.equal(actual, expected);

    });

    it('should match a short yt url without videoqs but with videoid', function () {
      var url = 'http://youtu.be/VbZ9WzFrwUo';
      var expected = true;
      var actual = !!yt.isYoutubeVideoUrl(url);

      assert.equal(actual, expected);
    });

    it('should NOT match a short yt url without a thing after youtu.be', function () {
      var url = 'http://youtu.be/';
      var expected = false;
      var actual = !!yt.isYoutubeVideoUrl(url);

      assert.equal(actual, expected);
    });
  });

  describe('getVideoId', function () {
    it('should get the video id of a common link', function () {
      var url = 'https://www.youtube.com/watch?v=vRxeiUD1Hyw';
      var expected = 'vRxeiUD1Hyw';
      var actual = yt.getVideoId(url);

      assert.equal(actual, expected);
    });

    it('should get the video id of a short link', function () {
      var url = 'http://youtu.be/VbZ9WzFrwUo';
      var expected = 'VbZ9WzFrwUo';
      var actual = yt.getVideoId(url);

      assert.equal(actual, expected);
    });
  });

  describe('getVideoInfo', function () {
    beforeEach(function (done) {
      sinon.stub(request, 'get');
      done();
    });

    afterEach(function (done) {
      request.get.restore();
      done();
    });

    describe('without KEY,', function () {
      it('should go to the right path', function () {
        var videoId = 'videoid';
        var expectedPath = 'http://gdata.youtube.com/feeds/api/videos?q=' +
                           videoId + '&max-results=1&v=2&alt=jsonc';
        yt.getVideoInfo(videoId, function () { });

        assert(request.get.calledOnce);
        assert.equal(request.get.getCall(0).args[0].uri, expectedPath);
      });
    });

    describe('with KEY,', function () {

      beforeEach(function () {
        yt = new YT('mykey');
      });

      it('should go to the right path', function () {
        var videoId = 'videoid';
        var apiKey = 'mykey';
        var expectedPath = 'https://www.googleapis.com/youtube/v3/videos?id=' +
                           videoId + '&part=contentDetails&key=' + apiKey;

        yt.getVideoInfo(videoId, function () {});

        assert(request.get.calledOnce);
        assert.equal(request.get.getCall(0).args[0].uri, expectedPath);
      });
    });
  });
});
