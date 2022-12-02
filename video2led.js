// import * as Zlib from './deflate.min.js'
// import videoDump from './VerticalLineLoop.mp4.json' assert {type: 'json'};

/*
  Q Light Controller Plus
  video2led.js

  Copyright (c) Niklas Köhn

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0.txt

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


// Development tool access
var testAlgo;

(
  function()
  {
    var algo = new Object;
    algo.apiVersion = 2;
    algo.name = "Nik sagt hallo Chris!";
    algo.author = "Niklas Köhn";

    algo.orientation = 0;
    algo.properties = new Array();
    // algo.properties.push("name:orientation|type:list|display:Orientation|values:Horizontal,Vertical|write:setOrientation|read:getOrientation");


    algo.frames = 0;
    algo.properties.push("name:frames|type:range|"
      + "display:Frames|"
      + "values:1,1000|"
      + "write:setFrames|read:getFrames");
    algo.setFrames = function(_number) {
      algo.frames = parseInt(_number);
    };
    algo.getFrames = function() {
      return algo.frames;
    };


    var util = new Object;
    util.initialized = false;

    util.initialize = function()
    {
      // var base64Data = "eJztwTEBAAAAwqD1T20JT6AAAHgaCWAAAQ==";
      // var compressData = atob(base64Data);
      // var compressData = compressData.split('').map(function(e) {
      //     return e.charCodeAt(0);
      // });
      // var inflate = new Zlib.Inflate(compressData);
      // var output = inflate.decompress();

      // algo.setFrames(videoDump.length);

      util.initialized = true;
    };

    algo.rgbMap = function(width, height, rgb, step)
    {
      if (util.initialized === false)
      {
        util.initialize();
      }

      var map = new Array(height);

      for (var y = 0; y < height; y++)
      {
        map[y] = new Array();
        for (var x = 0; x < width; x++)
        {
          if (algo.orientation === 0)
          {
            if (step < height)
            {
              if (y <= step) {
                  map[y][x] = rgb;
              } else {
                  map[y][x] = 0;
              }
            }
            else
            {
              if (y > step - height) {
                  map[y][x] = rgb;
              } else {
                  map[y][x] = 0;
              }
            }
          }
          else
          {
            if (step < width)
            {
              if (x <= step) {
                  map[y][x] = rgb;
              } else {
                  map[y][x] = 0;
              }
            }
            else
            {
              if (x > step - width) {
                  map[y][x] = rgb;
              } else {
                  map[y][x] = 0;
              }
            }
          }
        }
      }

      // dummy
      map[0][0] = rgb+30;

      return map;
    };

    algo.rgbMapStepCount = function(width, height)
    {
      if (algo.orientation === 1) {
          return (width * 2) - 1;
      } else {
          return (height * 2) - 1;
      }
    };

    // Development tool access
    testAlgo = algo;

    return algo;
    }
)();
