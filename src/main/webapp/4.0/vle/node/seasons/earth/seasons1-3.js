﻿<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Investigation 3: How Does Earth's Tilt Affect Temperature?</title>
    <link href="../stylesheets/style.css"        rel="stylesheet" type="text/css"/>
    <link href="../stylesheets/video-js.css"     rel="stylesheet" type="text/css"/>
		<link href="../stylesheets/flotr.css" rel="stylesheet" type="text/css" />
		<link href="../stylesheets/table.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="../lib/modernizr-1.6.js"></script>

		<script type="text/javascript" src="../lib/flotr/lib/prototype.js"></script>
		<script type="text/javascript" src="../lib/table/fastinit.js"></script>
		<script type="text/javascript" src="../lib/table/tablesort.js"></script>
		
		<!--[if IE]>
			<script type="text/javascript" src="../lib/flotr/lib/excanvas.js"></script>
			<script type="text/javascript" src="../lib/flotr/lib/base64.js"></script>
		<![endif]-->
		<script type="text/javascript" src="../lib/flotr/lib/canvas2image.js"></script>
		<script type="text/javascript" src="../lib/flotr/lib/canvastext.js"></script>
		<script type="text/javascript" src="../lib/flotr/flotr.debug-0.2.0-test.js"></script>
    <!-- <script src="../lib/ace/ace-uncompressed.js" type="text/javascript" charset="utf-8"></script> -->
    <!-- <script src="../lib/ace/theme-twilight.js" type="text/javascript" charset="utf-8"></script>
    <script src="../lib/ace/mode-javascript.js" type="text/javascript" charset="utf-8"></script> -->
    
</head>
<div id="container">
  <div id="header-inner">
    <h1 id="title">探究 3: 地球的傾斜如何影響溫度？</h1>
    <div id="simulation-controls"></div>
  </div>
  <div id="content">
    <div id="webglCanvasContainer">
      <ul class="hlist">
        <li>
          <div class="glCanvasQuarterFrame">
            <p>視野： 太空中的地球</p>
            <canvas id="theCanvas3">
            </canvas>
          </div>
        </li>
        <li>
          <div class="glCanvasQuarterFrame">
            <p>視野： 太陽-地球 系統</p>
            <canvas id="theCanvas1">
            </canvas>
            <div class="underCanvasUI">
            </div>
          </div>
        </li>
      </ul>
      <ul class="hlist">
        <li>
          <div class="editorQuarterFrame">
            <div class="underCanvasUI">
              <ul class="hlist">
                <li>
                  <form>
                    <fieldset>
                      <legend>選擇月份</legend>
                      <select id="choose-month" name="chosen-month">
                        <option value="jun" selected>六月</option>
                        <option value="sep">九月</option>
                        <option value="dec">十二月</option>
                        <option value="mar">三月</option>
                      </select>
                    </fieldset>
                  </form>
                </li>
                <li>
                  <form id="choose-tilt">
                    <fieldset>
                      <legend>地球傾斜</legend>
                      <label><input type="radio" name="tilt" value="yes" checked> 是</input></label>
                      <label><input type="radio" name="tilt" value="no"> 否</input></label>
                    </fieldset>
                  </form>
                </li>
                <li>
                  <form id="choose-view">
                    <fieldset>
                      <legend>選擇視野： </legend>
                      <label><input type="radio" name="view" value="top"> 頂部</input></label>
                      <label><input type="radio" name="view" value="side" checked> 側面</input></label>
                    </fieldset>
                  </form>
                </li>
                <li>
                  <form id="show-me">
                    <fieldset>
                      <legend>顯示： </legend>
                      <label><input id="orbital-grid" type="checkbox"/> 方格 </label>
                      <label><input id="earth-rotation" type="checkbox" checked/> 旋轉</label>
                    </fieldset>
                  </form>  
                </li>
              </ul>
              <ul class="hlist">
                <li>
                  <form id="select-city-latitude">
                    <label for="selected-city-latitude">選擇城市：</label>
                    <select id="selected-city-latitude" name="selected-city-latitude">
                      <option disabled selected>城市 ...</option>
                    </select>
                  </form>
                </li>
                <li>
                  選擇的月份： <span id="selected-month"></span>
                </li>
                <li><span>&nbsp&nbsp&nbsp</span></li>
                <li>
                   Orientation of Earth: <span id="selected-tilt"></span>
                </li>
                <li>
                  <form id="city-latitude-temperature">
                    <label id="city-latitude-temperature-label" for="city-latitude-temperature-prediction">預測平均溫度 &deg;F</label>
                    <input type="text" id="city-latitude-temperature-prediction" name="city-latitude-temperature-prediction" />
                    <input type="submit" value="Run" />
                  </form>
                </li>
                <p><span class="tip">提示 #1:</span> 從您收集的每一列資料中選擇您認為的季節。</p>
                <p><span class="tip">提示 #2:</span> 按下欄位名稱您可以將表格中的資料排序。</p>
              </ul>
            </div>
            <div class="tableFrame">
              <table id='city-data-table' class='sortable'>
                <thead>
                  <tr>
                    <th class='sortfirstdesc number'></th>
                    <th class='text'>城市</th>
                    <th class='text'>月份</th>
                    <th class='number'>傾斜</th>
                    <th class='number'>溫度</th>
                    <th class='number'>預測</th>
                    <th class="nosort">季節 ?</th>
                    <th class="nosort">圖片</th>
                </thead>
                <tbody id="city-data-table-body">
                </tbody>
              </table>
            </div>
            <!-- <div class="editorFrame" id="editor">results ...</div> -->
          </div>
        </li>
        <li>
          <ul class="hlist">
            <li>
              <!-- <form id="show-graph">
                 <fieldset>
                   <legend>Show graph: </legend>
                   <label><input id="solar-radiation-graph" type="checkbox"/> Solar Radiation</label>
                   <label><input id="sun-earth-distance-graph" type="checkbox"/> Distance from Sun</label>
                 </fieldset>
               </form> -->
             </li>
          </ul>
          <div class="quarterFrame">
            <div class="glGraphQuarterFrame" id="theCanvas4"></div>
            <div id="city-color-keys">
              <ul id="color-key-list" />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div id="snapshots">
      <ul>
        <li>
          <ul class="hlist">
            <li>
              <img id="s1-small"></img>
            </li>
            <li>
              <img id="s1-full"></img>
            </li>
          </ul>
        </li>
      </ul>
    </div>   
  </div>
</div>
<div id="earth-info-label1" class="earth-info-label transparent-ui"></div>
<div id="earth-info-label3" class="earth-info-label transparent-ui"></div>
<script type="text/javascript">

  function myRequire(src, callback){
    if (src.constructor == Array) {
      var libraries = src;
    } else {
      var libraries = [src];
    }
    var script = document.createElement("script") 
    script.type = "text/javascript";
    // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        libraries.shift();
        if (libraries.length > 0) {
          myRequire(libraries)
        }
        if (callback) {
          callback();            
        }
      }
    }
    // Not IE
    script.onload = function () {
      libraries.shift();
      if (libraries.length > 0) {
        myRequire(libraries)
      }
      if (callback) {
        callback();            
      }
    }
    script.src = libraries[0];
    document.getElementsByTagName("head")[0].appendChild(script);
  };
  
  window.onload=function() {
    var webGLEnabled = Modernizr.webgl;
    if (webGLEnabled){
      myRequire([
        "../lib/sprintf.js",
        "../lib/scenejs-0.8.0/scenejs.js",
        "solar-system-data.js",
        "earth-axis.js",
        "sun.js",
        "earth.js",
        "earth-orbit.js",
        "jpl-earth-ephemerides.js",
        "orbit-grid.js",
        "seasons.js",
        "cities.js",
        "latitude-line.js",
        "earth-surface-location-indicator.js",
        "seasons1-3a.js"
      ]);
    } else {
      var content = document.getElementById('content');
      var canvasContainer = document.getElementById('webglCanvasContainer');
      var controls = document.getElementById('simulation-controls');

      controls.style['display']='none';

      var header = document.getElementById('header-inner');
      var getting_webgl = document.getElementById('getting-webgl').cloneNode(true);
      header.appendChild(getting_webgl);


      var notice = document.createElement('p');
      notice.innerHTML = "<em>Play a video of the Earth visualization with an <a href=\"http://videojs.com\">HTML5 Video Player</a> because this browser doesn't support WebGL.</em>";
      notice.className = "videoplayernotice";
      content.insertBefore(notice, canvasContainer);

      myRequire("../lib/videojs/video.js", function () {
        var currentPath = location.href.replace(/index\.html$/, '');
        var earthVideoStr="";
        earthVideoStr += "<div class=\"video-js-box\">";
        earthVideoStr += "<video id=\"earth-video\" class=\"video-js\" width=\"1030\" height=\"700\" controls=\"controls\" ";
        earthVideoStr += "preload=\"auto\" poster=\"images\/earth-frame1-mixed.jpg\">";
        earthVideoStr += "<source src=\"videos\/earth3.mp4\" type='video\/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"' \/>";
        earthVideoStr += "<source src=\"videos\/earth3.webm\" type='video\/webm; codecs=\"vp8, vorbis\"' \/>";
        earthVideoStr += "<source src=\"videos\/earth3.ogv\" type='video\/ogg; codecs=\"theora, vorbis\"' \/>";
        earthVideoStr += "<object id=\"flash_fallback_1\" class=\"vjs-flash-fallback\" width=\"1030\" height=\"700\" type=\"application\/x-shockwave-flash\"";
        earthVideoStr += "data=\"http:\/\/releases.flowplayer.org\/swf\/flowplayer-3.2.1.swf\">";
        earthVideoStr += "<param name=\"movie\" value=\"http:\/\/releases.flowplayer.org\/swf\/flowplayer-3.2.1.swf\" \/>";
        earthVideoStr += "<param name=\"allowfullscreen\" value=\"true\" \/>";
        earthVideoStr += "<param name=\"flashvars\" value='config={\"playlist\":[\"" + currentPath + "/images/earth-frame1-mixed.jpg\", "
        earthVideoStr += "{\"url\": \"" + currentPath + "videos\/earth3.flv\",\"autoPlay\":false,\"loop\":false,\"autoBuffering\":true}]}' \/>";
        earthVideoStr += "<img src=\"" + currentPath + "images/earth-frame1-mixed.jpg\" width=\"1030\" height=\"700\" alt=\"Poster Image\"";
        earthVideoStr += "title=\"No video playback capabilities.\" \/>";
        earthVideoStr += "<\/object>";
        earthVideoStr += "<\/video>";
        earthVideoStr += "<p class=\"vjs-no-video\"><\/p>";
        earthVideoStr += "<\/div>";
        earthVideoStr += "";
        canvasContainer.innerHTML = earthVideoStr;
        VideoJS.setupAllWhenReady();
      });
    };
  }
</script>
</body>
</html>