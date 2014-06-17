# youtube utils [![Build Status](https://travis-ci.org/cirocosta/yt-utils.svg?branch=master)](https://travis-ci.org/cirocosta/yt-utils)

> Some utility functions for dealing with Youtube

[![NPM](https://nodei.co/npm/yt-utils.png?compact=true)](https://nodei.co/npm/yt-utils/)

For running in the browser:

```sh
$ bower install --save yt-utils
```

## Methods

|         method         |                                           desc                                          |
| ---------------------- | --------------------------------------------------------------------------------------- |
| YT(apiKey)             | Constructor. apiKey is optional. If set, will perform the queries with youtube V3  api  |
| isYoutubeVideoUrl(url) | Verifies if a given URL is from youtube and is a valid one (a youtube shortlink or not) |
| getVideoId(url)        | from a valid youtube video URL gets the ID of that video                                |
| getVideoInfo(vId, cb)  | queries the Data API for getting info about a particular videoId.                       |

#### MIT LICENSE
