//Shim for promises, see mdn.io/web%20promise
!function(){var a,b,c,d;!function(){var e={},f={};a=function(a,b,c){e[a]={deps:b,callback:c}},d=c=b=function(a){function c(b){if("."!==b.charAt(0))return b;for(var c=b.split("/"),d=a.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(d._eak_seen=e,f[a])return f[a];if(f[a]={},!e[a])throw new Error("Could not find module "+a);for(var g,h=e[a],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)"exports"===i[l]?k.push(g={}):k.push(b(c(i[l])));var n=j.apply(this,k);return f[a]=g||n}}(),a("promise/all",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to all.");return new b(function(b,c){function d(a){return function(b){f(a,b)}}function f(a,c){h[a]=c,0===--i&&b(h)}var g,h=[],i=a.length;0===i&&b([]);for(var j=0;j<a.length;j++)g=a[j],g&&e(g.then)?g.then(d(j),c):f(j,g)})}var d=a.isArray,e=a.isFunction;b.all=c}),a("promise/asap",["exports"],function(a){"use strict";function b(){return function(){process.nextTick(e)}}function c(){var a=0,b=new i(e),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function d(){return function(){j.setTimeout(e,1)}}function e(){for(var a=0;a<k.length;a++){var b=k[a],c=b[0],d=b[1];c(d)}k=[]}function f(a,b){var c=k.push([a,b]);1===c&&g()}var g,h="undefined"!=typeof window?window:{},i=h.MutationObserver||h.WebKitMutationObserver,j="undefined"!=typeof global?global:this,k=[];g="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?b():i?c():d(),a.asap=f}),a("promise/cast",["exports"],function(a){"use strict";function b(a){if(a&&"object"==typeof a&&a.constructor===this)return a;var b=this;return new b(function(b){b(a)})}a.cast=b}),a("promise/config",["exports"],function(a){"use strict";function b(a,b){return 2!==arguments.length?c[a]:(c[a]=b,void 0)}var c={instrument:!1};a.config=c,a.configure=b}),a("promise/polyfill",["./promise","./utils","exports"],function(a,b,c){"use strict";function d(){var a="Promise"in window&&"cast"in window.Promise&&"resolve"in window.Promise&&"reject"in window.Promise&&"all"in window.Promise&&"race"in window.Promise&&function(){var a;return new window.Promise(function(b){a=b}),f(a)}();a||(window.Promise=e)}var e=a.Promise,f=b.isFunction;c.polyfill=d}),a("promise/promise",["./config","./utils","./cast","./all","./race","./resolve","./reject","./asap","exports"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(a){if(!w(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof j))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],k(a,this)}function k(a,b){function c(a){p(b,a)}function d(a){r(b,a)}try{a(c,d)}catch(e){d(e)}}function l(a,b,c,d){var e,f,g,h,i=w(c);if(i)try{e=c(d),g=!0}catch(j){h=!0,f=j}else e=d,g=!0;o(b,e)||(i&&g?p(b,e):h?r(b,f):a===F?p(b,e):a===G&&r(b,e))}function m(a,b,c,d){var e=a._subscribers,f=e.length;e[f]=b,e[f+F]=c,e[f+G]=d}function n(a,b){for(var c,d,e=a._subscribers,f=a._detail,g=0;g<e.length;g+=3)c=e[g],d=e[g+b],l(b,c,d,f);a._subscribers=null}function o(a,b){var c,d=null;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(v(b)&&(d=b.then,w(d)))return d.call(b,function(d){return c?!0:(c=!0,b!==d?p(a,d):q(a,d),void 0)},function(b){return c?!0:(c=!0,r(a,b),void 0)}),!0}catch(e){return c?!0:(r(a,e),!0)}return!1}function p(a,b){a===b?q(a,b):o(a,b)||q(a,b)}function q(a,b){a._state===D&&(a._state=E,a._detail=b,u.async(s,a))}function r(a,b){a._state===D&&(a._state=E,a._detail=b,u.async(t,a))}function s(a){n(a,a._state=F)}function t(a){n(a,a._state=G)}var u=a.config,v=(a.configure,b.objectOrFunction),w=b.isFunction,x=(b.now,c.cast),y=d.all,z=e.race,A=f.resolve,B=g.reject,C=h.asap;u.async=C;var D=void 0,E=0,F=1,G=2;j.prototype={constructor:j,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(a,b){var c=this,d=new this.constructor(function(){});if(this._state){var e=arguments;u.async(function(){l(c._state,d,e[c._state-1],c._detail)})}else m(this,d,a,b);return d},"catch":function(a){return this.then(null,a)}},j.all=y,j.cast=x,j.race=z,j.resolve=A,j.reject=B,i.Promise=j}),a("promise/race",["./utils","exports"],function(a,b){"use strict";function c(a){var b=this;if(!d(a))throw new TypeError("You must pass an array to race.");return new b(function(b,c){for(var d,e=0;e<a.length;e++)d=a[e],d&&"function"==typeof d.then?d.then(b,c):b(d)})}var d=a.isArray;b.race=c}),a("promise/reject",["exports"],function(a){"use strict";function b(a){var b=this;return new b(function(b,c){c(a)})}a.reject=b}),a("promise/resolve",["exports"],function(a){"use strict";function b(a){var b=this;return new b(function(b){b(a)})}a.resolve=b}),a("promise/utils",["exports"],function(a){"use strict";function b(a){return c(a)||"object"==typeof a&&null!==a}function c(a){return"function"==typeof a}function d(a){return"[object Array]"===Object.prototype.toString.call(a)}var e=Date.now||function(){return(new Date).getTime()};a.objectOrFunction=b,a.isFunction=c,a.isArray=d,a.now=e}),b("promise/polyfill").polyfill()}();

//Global scope
APP_DAT = {};

function ImageGrabber(fileInput, canvas) {
	this.resolvers = {};
	this.ret = new Promise(this.grabResolvers.bind(this));
	this.grabPasteFunc = this.grabPaste.bind(this);
	this.grabFileFunc = this.grabFile.bind(this);
	this.grabDropFunc = this.grabDrop.bind(this);
	this.fileInput = fileInput;
	this.canvas = canvas;
	
	document.addEventListener("paste", this.grabPasteFunc, false);
	this.fileInput.addEventListener("change", this.grabFileFunc, false);
	this.canvas.addEventListener("dragenter", blockDefaultBehaviour, false);
	this.canvas.addEventListener("dragover", blockDefaultBehaviour, false);
	this.canvas.addEventListener("drop", this.grabDropFunc, false);

	return this.ret;
}

ImageGrabber.prototype.grabResolvers = function(resolve, reject) {
	this.resolvers.resolve = resolve;
	this.resolvers.reject = reject;
}

ImageGrabber.prototype.grabPaste = function(e) {
	blockDefaultBehaviour(e);
	if (e.clipboardData) {
		var items = e.clipboardData.items;
		if (items) {
			if (!this.handleDataList(items)) {
				this.resolvers.reject("An image wasn't found on your clipboard.");
			}
		} else {
			this.resolvers.reject("There were no items found on your clipboard.");
		}
	} else {
		this.resolvers.reject("Your browser does not support the paste event listener.");
	}
}

ImageGrabber.prototype.grabFile = function(e) {
	if (e.target.files) {
		if (!this.handleDataList(e.target.files)) {
			this.resolvers.reject("An image was not found.");
		}
	} else {
		this.resolvers.reject("An error occurred while selecting a file.");
	}
}

ImageGrabber.prototype.grabDrop = function(e) {
	blockDefaultBehaviour(e);
	if (e.dataTransfer) {
		var dt = e.dataTransfer;
		if (dt.files) {
			if (!this.handleDataList(dt.files)) {
                if (!this.handleHTMLData(dt.getData("text/html"))) {
                    this.resolvers.reject("No image was found in the dropped files.");
                }
			}
		} else {
			this.resolvers.reject("An error occurred while selecting dropped files.");
		}
	} else {
		this.resolvers.reject("An error occurred while transferring dropped files.");
	}
}

ImageGrabber.prototype.handleDataList = function(arr) {
	for (var i = 0, len = arr.length; i < len; i++) {
        var datum = arr[i];
        if(datum.type.indexOf("image") !== -1) {
            this.handleImageData(datum);
            return true;
    }
    }
    return false;
}

ImageGrabber.prototype.handleImageData = function(imgDat) {
	//image
	var blob = (!(imgDat instanceof File)) ? imgDat.getAsFile() : imgDat;
	var URLObj = window.URL || window.webkitURL;
	var source = URLObj.createObjectURL(blob);
	this.resolvers.resolve(source);
	this.destroy();
}

ImageGrabber.prototype.handleHTMLData = function(htmlDat) {
    var fakeElm = document.createElement("div");
    fakeElm.innerHTML = htmlDat;
    var img = fakeElm.querySelector("img");
    if (img) {
        this.resolvers.resolve(img.src);
        this.destroy();
        return true;
    } else {
        return false;   
    }
}

ImageGrabber.prototype.destroy = function() {
	document.removeEventListener("paste", this.grabPasteFunc);
	this.fileInput.removeEventListener("change", this.grabFileFunc);
	this.canvas.removeEventListener("dragenter", blockDefaultBehaviour);
	this.canvas.removeEventListener("dragover", blockDefaultBehaviour);
	this.canvas.removeEventListener("drop", this.grabDropFunc);
	delete this.resolvers;
}

function ImageManipulator(canvas) {
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.scale = 1;
	this.origDims = {};
	this.origPos = {};
}

ImageManipulator.prototype.drawImage = function(imgObjURL) {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.imgSrc = new Image();
	var _self = this;
	var resolvers = {};
	this.imgSrc.onload = function(){
		_self.origDims = {width: _self.imgSrc.width, height: _self.imgSrc.height};
		_self.scale = 1;
		_self.currentPos = {x: 0, y: 0};
		_self.canvas.width = _self.imgSrc.width;
		_self.canvas.height = _self.imgSrc.height;
		_self.context.drawImage(_self.imgSrc, _self.currentPos.x, _self.currentPos.y);
		resolvers.resolve();
		};
	this.imgSrc.onerror = function() {resolvers.reject()};
	this.imgSrc.src = imgObjURL;
	return new Promise(function(resolve, reject) {resolvers.resolve = resolve; resolvers.reject = reject;});
}

ImageManipulator.prototype.redrawImage = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.context.drawImage(this.imgSrc, this.currentPos.x, this.currentPos.y, this.origDims.width * this.scale, this.origDims.height * this.scale);
}

ImageManipulator.prototype.scaleImage = function(scale, adjustDims) {
	if (adjustDims) {
		this.canvas.width = this.canvas.width * (scale/this.scale);
		this.canvas.height = this.canvas.height * (scale/this.scale);
	}
	this.scale = scale;
	this.redrawImage();
}

ImageManipulator.prototype.cropImage = function(width, height) {
	this.canvas.width = width;
	this.canvas.height = height;
	this.redrawImage();
}

ImageManipulator.prototype.resetImageDimensions = function() {
	this.cropImage(this.origDims.width * this.scale, this.origDims.height * this.scale)
}

ImageManipulator.prototype.moveImage = function(x, y, adjustDims) {
    this.currentPos = {x: x, y: y};
    if (adjustDims) {
        this.alignImageDimensions();   
    }
    this.redrawImage();
}

ImageManipulator.prototype.alignImageDimensions = function() {
    this.canvas.width = this.canvas.width + this.currentPos.x;
	this.canvas.height = this.canvas.height + this.currentPos.y;
}

ImageManipulator.prototype.getCanvasData = function() {
	return this.canvas.toDataURL();
}

function init() {
	APP_DAT.canvas = document.querySelector("#img-man-area");
	APP_DAT.fileInput = document.querySelector("#file-grabber");
	APP_DAT.form = {scale: document.querySelector("#img-scale"), scaleDims: document.querySelector("#img-scale-dims"), dims: {width: document.querySelector("#img-width"), height: document.querySelector("#img-height")}, commits: {scale: document.querySelector("#img-scale-commit"), dims: document.querySelector("#img-dims-commit"), resetDims: document.querySelector("#img-dims-reset")}};
	APP_DAT.dwnldLnk = document.querySelector("#download-img");
	APP_DAT.imgMan = new ImageManipulator(APP_DAT.canvas);
	new ImageGrabber(APP_DAT.fileInput, APP_DAT.canvas).then(APP_DAT.imgMan.drawImage.bind(APP_DAT.imgMan), alert.bind(window)).then(updateUI);
	
	APP_DAT.dwnldLnk.addEventListener("click", downloadImg, false);
	APP_DAT.form.commits.scale.addEventListener("click", scaleImage, false);
	APP_DAT.form.commits.dims.addEventListener("click", cropImage, false);
	APP_DAT.form.commits.resetDims.addEventListener("click", resetDims, false);
}

document.addEventListener("DOMContentLoaded", init, false);

function downloadImg(e) {
	e.target.href = APP_DAT.imgMan.getCanvasData();
	e.target.setAttribute("download", "modified-image.png");
}

function scaleImage(e) {
	blockDefaultBehaviour(e);
	APP_DAT.imgMan.scaleImage(APP_DAT.form.scale.valueAsNumber, APP_DAT.form.scaleDims.checked);
	updateUI();
}

function cropImage(e) {
	blockDefaultBehaviour(e);
	APP_DAT.imgMan.cropImage(APP_DAT.form.dims.width.valueAsNumber, APP_DAT.form.dims.height.valueAsNumber);
	updateUI();
}

function moveImage(e) {
    blockDefaultBehaviour(e);
    APP_DAT.imgMan.moveImage(APP_DAT.form.pos.x.valueAsNumber, APP_DAT.form.pos.y.valueAsNumber);
    updateUI();
}

function resetDims(e) {
	blockDefaultBehaviour(e);
	APP_DAT.imgMan.resetImageDimensions();
	updateUI();
}

function updateUI() {
	APP_DAT.form.scale.value = APP_DAT.imgMan.scale;
	APP_DAT.form.dims.width.value = APP_DAT.imgMan.canvas.width;
	APP_DAT.form.dims.height.value = APP_DAT.imgMan.canvas.height;
	//Add stuff here for moving
}

function blockDefaultBehaviour(e) {
	e.stopPropagation();
	e.preventDefault();
}