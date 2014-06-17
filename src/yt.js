var request = require('request');

/**
 * YT encapsulates validation, videoId extraction from URL and it also
 * checks if the videoID is a valid one.
 */
function YT (apiKey) {
  this.APIKEY = apiKey;
  this.URL_W_KEY = 'https://www.googleapis.com/youtube/v3/videos?id=VIDEOID&part=contentDetails&key=' + apiKey;
  this.URL_NO_KEY = 'http://gdata.youtube.com/feeds/api/videos?q=VIDEOID&max-results=1&v=2&alt=jsonc';
}

/**
 * Validates a URL. If it is a proper youtube video URL, returns the
 * video url, otherwise, false.
 */
YT.prototype.isYoutubeVideoUrl = function (url) {
  if (!(url && (typeof url === 'string' || url instanceof String)))
    url = '';

  var matched = url.match(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g);

  return matched ? matched[0] : false;
};

/**
 * Receives a valid youtube video url and returns the video ID of it
 */
YT.prototype.getVideoId = function (url) {
	if (url.match(/youtu\.be/)) {
		return url.match(/youtu\.be\/?(.+)/)[1];
	}

  var videoId = url.split('v=')[1] || '';
  var ampersandPosition = videoId.indexOf('&');

  if (ampersandPosition !== -1) {
    return videoId.substring(0, ampersandPosition);
  }

  return videoId;
};

YT.prototype.getVideoInfo = function(videoId, cb) {
  var url = this.APIKEY ? this.URL_W_KEY : this.URL_NO_KEY;

  url = url.replace('VIDEOID', videoId);

  request.get({
    uri: url
  }, cb);
};

module.exports = YT;
