/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Gallery = __webpack_require__(1);
	
	var _Gallery2 = _interopRequireDefault(_Gallery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import LightBox from "LightBox/LightBox.js";
	
	var EasyGallery = function () {
	    function EasyGallery() {
	        _classCallCheck(this, EasyGallery);
	    }
	
	    _createClass(EasyGallery, null, [{
	        key: "lightbox",
	
	        //Display an image or a collection of images in the lightbox
	        value: function lightbox(images) {
	            LightBox.show(image);
	        }
	
	        //Display an image/videos or a collection of images/videos in a gallery
	
	    }, {
	        key: "gallery",
	        value: function gallery(parent, content) {
	            parent.appendChild(new _Gallery2.default(content));
	        }
	    }]);
	
	    return EasyGallery;
	}();
	
	//Global reference for non-node users
	
	
	exports.default = EasyGallery;
	window.EasyGallery = EasyGallery;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _hammerjs = __webpack_require__(2);
	
	var _hammerjs2 = _interopRequireDefault(_hammerjs);
	
	__webpack_require__(3);
	
	var _fullscreen = __webpack_require__(7);
	
	var _fullscreen2 = _interopRequireDefault(_fullscreen);
	
	var _backNav = __webpack_require__(8);
	
	var _backNav2 = _interopRequireDefault(_backNav);
	
	var _forwardNav = __webpack_require__(9);
	
	var _forwardNav2 = _interopRequireDefault(_forwardNav);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Gallery = function () {
	    function Gallery(content) {
	        var _this = this;
	
	        _classCallCheck(this, Gallery);
	
	        this.navigationStatus = null;
	        this.gallery = null;
	        this.galleryContentContainer = null;
	        this.itemTitle = null;
	        this.content = content;
	        this.index = 1;
	        this.isFullscreen = false;
	        this.onKeyUp = this._onKeyUp.bind(this);
	        this.images = [];
	        this.resizeTimeout;
	
	        window.addEventListener('resize', function (e) {
	            _this._setAllInitialImageSize();
	        });
	
	        return this.build(content);
	    }
	
	    _createClass(Gallery, [{
	        key: "build",
	        value: function build(content) {
	            var _this2 = this;
	
	            var gallery = document.createElement('div');
	            this.gallery = gallery;
	            gallery.className = "gallery";
	
	            //Container for the Content (Images/Videos)
	            var galleryContentContainer = document.createElement('div');
	            this.galleryContentContainer = galleryContentContainer;
	            galleryContentContainer.className = "gallery-content";
	            gallery.appendChild(galleryContentContainer);
	            this._attachEvents(galleryContentContainer);
	
	            //Add Content
	            for (var i in content) {
	                galleryContentContainer.appendChild(this._buildGalleryItem(content[i]));
	            }
	
	            //Navigation Icons
	            var backNavIcon = document.createElement('img');
	            backNavIcon.className = "back-nav-icon";
	            backNavIcon.src = _backNav2.default;
	            gallery.appendChild(backNavIcon);
	
	            var mc1 = new _hammerjs2.default.Manager(backNavIcon);
	            var Tap1 = new _hammerjs2.default.Tap();
	            mc1.add(Tap1);
	            mc1.on('tap', function (e) {
	                _this2.previous();
	            });
	
	            var forwardNavIcon = document.createElement('img');
	            forwardNavIcon.className = "forward-nav-icon";
	            forwardNavIcon.src = _forwardNav2.default;
	            gallery.appendChild(forwardNavIcon);
	
	            var mc2 = new _hammerjs2.default.Manager(forwardNavIcon);
	            var Tap2 = new _hammerjs2.default.Tap();
	            mc2.add(Tap2);
	            mc2.on('tap', function (e) {
	                _this2.next();
	            });
	
	            //Status bar for status of gallery navigation and icons for fullscreen, etc
	            var statusBar = document.createElement('div');
	            statusBar.className = "status-bar";
	            gallery.appendChild(statusBar);
	
	            //Navigation status
	            var navigationStatus = document.createElement('div');
	            navigationStatus.className = "navigation-status";
	            this.navigationStatus = navigationStatus;
	            statusBar.appendChild(navigationStatus);
	
	            //Full screen icon
	            var fullScreenIcon = document.createElement('img');
	            fullScreenIcon.className = "fullscreen-icon";
	            fullScreenIcon.src = _fullscreen2.default;
	            statusBar.appendChild(fullScreenIcon);
	
	            //Item Title
	            var itemTitle = document.createElement('span');
	            this.itemTitle = itemTitle;
	            statusBar.appendChild(itemTitle);
	
	            var mc3 = new _hammerjs2.default.Manager(fullScreenIcon);
	            var Tap3 = new _hammerjs2.default.Tap();
	            mc3.add(Tap3);
	            mc3.on("tap", function (e) {
	                //Toggle FullScreen
	                _this2.toggleFullscreen();
	            });
	
	            this._onNavigation();
	
	            return gallery;
	        }
	    }, {
	        key: "next",
	        value: function next() {
	            if (this.index < this.content.length) {
	                this.index += 1;
	                this._onNavigation();
	            }
	        }
	    }, {
	        key: "previous",
	        value: function previous() {
	            if (this.index > 1) {
	                this.index -= 1;
	                this._onNavigation();
	            }
	        }
	    }, {
	        key: "toggleFullscreen",
	        value: function toggleFullscreen() {
	            this.gallery.classList.toggle("fullscreen");
	            this.isFullscreen = !this.isFullscreen;
	            if (this.isFullscreen) {
	                document.body.addEventListener('keyup', this.onKeyUp);
	            } else {
	                document.body.removeEventListener('keyup', this.onKeyUp);
	            }
	
	            this._setAllInitialImageSize();
	        }
	    }, {
	        key: "_buildGalleryItem",
	        value: function _buildGalleryItem(item) {
	            var _this3 = this;
	
	            var itemContainer = document.createElement('div');
	
	            var pinch;
	            var pan;
	            var startW;
	            var startH;
	            var startX;
	            var startY;
	            var imageStartX;
	            var imageStartY;
	            var pinchStartX;
	            var pinchStartY;
	            var focusPoint;
	            var pinchOffset;
	
	            (function () {
	                switch (item.type) {
	                    case "image":
	                        var galleryImage = document.createElement('img');
	                        galleryImage.src = item.url;
	                        itemContainer.appendChild(galleryImage);
	                        galleryImage.onload = function (e) {
	                            _this3._setInitialImageSize(galleryImage);
	                            console.log("Display aspect ratio", _this3.galleryContentContainer.offsetWidth / _this3.galleryContentContainer.offsetHeight);
	
	                            console.log("Imagage aspect ratio", galleryImage.offsetWidth / galleryImage.offsetHeight, item.url);
	                        };
	                        _this3.images.push(galleryImage);
	                        // itemContainer.style.backgroundImage = "url('" + item.url + "')";
	
	                        var mc = new _hammerjs2.default.Manager(itemContainer);
	                        pinch = new _hammerjs2.default.Pinch();
	                        pan = new _hammerjs2.default.Pan();
	
	                        mc.add(pinch);
	                        mc.add(pan);
	                        focusPoint = {};
	                        pinchOffset = {};
	
	                        mc.on("pinchstart", function (e) {
	                            startW = galleryImage.offsetWidth;
	                            startH = galleryImage.offsetHeight;
	                            pinchStartX = galleryImage.offsetLeft;
	                            pinchStartY = galleryImage.offsetTop;
	                            startX = e.pointers[0].clientX;
	                            startY = e.pointers[0].clientY;
	                            imageStartX = galleryImage.offsetLeft;
	                            imageStartY = galleryImage.offsetTop;
	
	                            var x1 = e.pointers[0].clientX;
	                            var x2 = e.pointers[1].clientX;
	                            var y1 = e.pointers[0].clientY;
	                            var y2 = e.pointers[1].clientY;
	                            focusPoint.x = x1 + (x2 - x1) / 2;
	                            focusPoint.y = y1 + (y2 - y1) / 2;
	                        });
	                        var pinchFn = function pinchFn(e) {
	                            _this3._resizeImage(galleryImage, startW * e.scale, startH * e.scale, focusPoint, pinchStartX, pinchStartY, pinchOffset);
	                        };
	                        mc.on("pinchin", pinchFn);
	                        mc.on("pinchout", pinchFn);
	                        mc.on("panstart", function (e) {
	                            startX = e.pointers[0].clientX;
	                            startY = e.pointers[0].clientY;
	                            imageStartX = galleryImage.offsetLeft;
	                            imageStartY = galleryImage.offsetTop;
	                        });
	                        mc.on("pinchmove", function (e) {
	                            pinchOffset = { x: e.pointers[0].clientX - startX, y: e.pointers[0].clientY - startY };
	                            // this._moveImage(galleryImage, imageStartX - (startX - e.pointers[0].clientX) , imageStartY - (startY - e.pointers[0].clientY));
	                        });
	                        mc.on("panmove", function (e) {
	                            _this3._moveImage(galleryImage, imageStartX - (startX - e.pointers[0].clientX), imageStartY - (startY - e.pointers[0].clientY));
	                        });
	
	                        break;
	                    case "youtube":
	                        var yt = document.createElement('iframe');
	                        yt.setAttribute('id', "player");
	                        yt.setAttribute('type', 'text/html');
	                        yt.setAttribute('frameborder', '0');
	                        yt.setAttribute('src', "http://www.youtube.com/embed/" + item.video_id + "?enablejsapi=1&origin=http://example.com");
	                        itemContainer.appendChild(yt);
	                        break;
	                }
	            })();
	
	            return itemContainer;
	        }
	    }, {
	        key: "_moveImage",
	        value: function _moveImage(image, x, y) {
	            //Constrain movement...
	            if (image.offsetWidth > this.galleryContentContainer.offsetWidth) {
	                if (x > 0) {
	                    x = 0;
	                } else if (x < this.galleryContentContainer.offsetWidth - image.offsetWidth) {
	                    x = this.galleryContentContainer.offsetWidth - image.offsetWidth;
	                }
	            } else {
	                //Don't allow it to move
	                x = image.offsetLeft;
	            }
	
	            if (image.offsetHeight > this.galleryContentContainer.offsetHeight) {
	                if (y > 0) {
	                    y = 0;
	                } else if (y < this.galleryContentContainer.offsetHeight - image.offsetHeight) {
	                    y = this.galleryContentContainer.offsetHeight - image.offsetHeight;
	                }
	            } else {
	                y = image.offsetTop;
	            }
	
	            //Set finalized coordinates
	            image.style.left = x + "px";
	            image.style.top = y + "px";
	        }
	    }, {
	        key: "_resizeImage",
	        value: function _resizeImage(image, w, h, focusPoint, startX, startY, offset) {
	            var x = void 0;
	            var y = void 0;
	
	            //Constrain Image size
	            var displayAR = this.galleryContentContainer.offsetWidth / this.galleryContentContainer.offsetHeight;
	            var imageAR = image.offsetWidth / image.offsetHeight;
	
	            if (displayAR > imageAR && h < this.galleryContentContainer.offsetHeight) {
	                h = this.galleryContentContainer.offsetHeight;
	                w = image.offsetWidth;
	            } else if (displayAR < imageAR && w < this.galleryContentContainer.offsetWidth) {
	                h = image.offsetHeight;
	                w = this.galleryContentContainer.offsetWidth;
	            }
	
	            //Make sure it doesn't exceed original dimensions x2
	            if (h > this.galleryContentContainer.offsetHeight * 2 || w > this.galleryContentContainer.offsetWidth * 2) {
	                h = image.offsetHeight;
	                w = image.offsetWidth;
	            }
	            // console.log(focusPoint);
	            var scale = void 0;
	            if (displayAR > imageAR) {
	                scale = image.offsetHeight / this.galleryContentContainer.offsetHeight - 1;
	            } else {
	                scale = image.offsetWidth / this.galleryContentContainer.offsetWidth - 1;
	            }
	
	            //TODO: Redo focus point calculations to be more accurate
	            //Recenter image with new dimensions against focus point based on zoom level
	            var destination = { x: startX - focusPoint.x * 2, y: startY - focusPoint.y * 2 };
	
	            x = (startX + destination.x) * scale;
	            y = (startY + destination.y) * scale;
	            x += offset.x;
	            y += offset.y;
	
	            //Boundry Enforcement
	            if (h < this.galleryContentContainer.offsetHeight) {
	                y = (this.galleryContentContainer.offsetHeight - h) / 2;
	            } else if (h > this.galleryContentContainer.offsetHeight && y > 0) {
	                y = 0;
	            } else if (h > this.galleryContentContainer.offsetHeight && y < 0 - (h - this.galleryContentContainer.offsetHeight)) {
	                y = 0 - (h - this.galleryContentContainer.offsetHeight);
	            }
	
	            if (w < this.galleryContentContainer.offsetWidth) {
	                x = (this.galleryContentContainer.offsetWidth - w) / 2;
	            } else if (w > this.galleryContentContainer.offsetWidth && x > 0) {
	                x = 0;
	            } else if (w > this.galleryContentContainer.offsetWidth && x < 0 - (w - this.galleryContentContainer.offsetWidth)) {
	                x = 0 - (w - this.galleryContentContainer.offsetWidth);
	            }
	
	            image.style.display = "none";
	            image.style.top = Math.floor(y) + "px";
	            image.style.left = Math.floor(x) + "px";
	            image.style.width = Math.floor(w) + "px";
	            image.style.height = Math.floor(h) + "px";
	            image.style.display = "block";
	        }
	    }, {
	        key: "_attachEvents",
	        value: function _attachEvents(galleryContentContainer) {
	            var mc = new _hammerjs2.default.Manager(galleryContentContainer.parentNode);
	            var Swipe = new _hammerjs2.default.Swipe();
	            mc.add(Swipe);
	            mc.on('swipeleft', function (e) {
	                // this.next();
	            });
	            mc.on('swiperight', function (e) {
	                // this.previous();
	            });
	        }
	    }, {
	        key: "_setAllInitialImageSize",
	        value: function _setAllInitialImageSize() {
	            for (var i in this.images) {
	                this._setInitialImageSize(this.images[i]);
	            }
	        }
	    }, {
	        key: "_setInitialImageSize",
	        value: function _setInitialImageSize(galleryImage) {
	            //Remove all dimensions styling to insure a fresh slate
	            galleryImage.style.removeProperty("height");
	            galleryImage.style.removeProperty("width");
	
	            //Compare Aspect Ratios and set the size of the image
	            var displayAR = this.galleryContentContainer.offsetWidth / this.galleryContentContainer.offsetHeight;
	            var imageAR = galleryImage.offsetWidth / galleryImage.offsetHeight;
	
	            if (displayAR > imageAR) {
	                galleryImage.style.top = "0px";
	                galleryImage.style.height = this.galleryContentContainer.offsetHeight + "px";
	                galleryImage.style.left = (this.galleryContentContainer.offsetWidth - galleryImage.offsetWidth) / 2 + "px";
	            } else if (displayAR < imageAR) {
	                galleryImage.style.left = "0px";
	                galleryImage.style.width = this.galleryContentContainer.offsetWidth + "px";
	                galleryImage.style.top = (this.galleryContentContainer.offsetHeight - galleryImage.offsetHeight) / 2 + "px";
	            } else {
	                galleryImage.style.top = "0px";
	                galleryImage.style.left = "0px";
	                galleryImage.style.height = this.galleryContentContainer.offsetHeight + "px";
	                galleryImage.style.width = this.galleryContentContainer.offsetWidth + "px";
	            }
	        }
	    }, {
	        key: "_onNavigation",
	        value: function _onNavigation() {
	            this.navigationStatus.innerHTML = this.index + "/" + this.content.length;
	            this.galleryContentContainer.style.left = (this.index - 1) * 100 * -1 + "%";
	            this.itemTitle.innerHTML = this.content[this.index - 1].title || "";
	        }
	    }, {
	        key: "_onKeyUp",
	        value: function _onKeyUp(e) {
	            switch (e.which) {
	                case 37:
	                    //Left
	                    this.previous();
	                    break;
	                case 39:
	                    //Right
	                    this.next();
	                    break;
	                case 27:
	                    //Esp
	                    this.toggleFullscreen();
	                    break;
	            }
	        }
	    }]);
	
	    return Gallery;
	}();
	
	exports.default = Gallery;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	(function (window, document, exportName, undefined) {
	    'use strict';
	
	    var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	    var TEST_ELEMENT = document.createElement('div');
	
	    var TYPE_FUNCTION = 'function';
	
	    var round = Math.round;
	    var abs = Math.abs;
	    var now = Date.now;
	
	    /**
	     * set a timeout with a given scope
	     * @param {Function} fn
	     * @param {Number} timeout
	     * @param {Object} context
	     * @returns {number}
	     */
	    function setTimeoutContext(fn, timeout, context) {
	        return setTimeout(bindFn(fn, context), timeout);
	    }
	
	    /**
	     * if the argument is an array, we want to execute the fn on each entry
	     * if it aint an array we don't want to do a thing.
	     * this is used by all the methods that accept a single and array argument.
	     * @param {*|Array} arg
	     * @param {String} fn
	     * @param {Object} [context]
	     * @returns {Boolean}
	     */
	    function invokeArrayArg(arg, fn, context) {
	        if (Array.isArray(arg)) {
	            each(arg, context[fn], context);
	            return true;
	        }
	        return false;
	    }
	
	    /**
	     * walk objects and arrays
	     * @param {Object} obj
	     * @param {Function} iterator
	     * @param {Object} context
	     */
	    function each(obj, iterator, context) {
	        var i;
	
	        if (!obj) {
	            return;
	        }
	
	        if (obj.forEach) {
	            obj.forEach(iterator, context);
	        } else if (obj.length !== undefined) {
	            i = 0;
	            while (i < obj.length) {
	                iterator.call(context, obj[i], i, obj);
	                i++;
	            }
	        } else {
	            for (i in obj) {
	                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	            }
	        }
	    }
	
	    /**
	     * wrap a method with a deprecation warning and stack trace
	     * @param {Function} method
	     * @param {String} name
	     * @param {String} message
	     * @returns {Function} A new function wrapping the supplied method.
	     */
	    function deprecate(method, name, message) {
	        var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	        return function () {
	            var e = new Error('get-stack-trace');
	            var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
	
	            var log = window.console && (window.console.warn || window.console.log);
	            if (log) {
	                log.call(window.console, deprecationMessage, stack);
	            }
	            return method.apply(this, arguments);
	        };
	    }
	
	    /**
	     * extend object.
	     * means that properties in dest will be overwritten by the ones in src.
	     * @param {Object} target
	     * @param {...Object} objects_to_assign
	     * @returns {Object} target
	     */
	    var assign;
	    if (typeof Object.assign !== 'function') {
	        assign = function assign(target) {
	            if (target === undefined || target === null) {
	                throw new TypeError('Cannot convert undefined or null to object');
	            }
	
	            var output = Object(target);
	            for (var index = 1; index < arguments.length; index++) {
	                var source = arguments[index];
	                if (source !== undefined && source !== null) {
	                    for (var nextKey in source) {
	                        if (source.hasOwnProperty(nextKey)) {
	                            output[nextKey] = source[nextKey];
	                        }
	                    }
	                }
	            }
	            return output;
	        };
	    } else {
	        assign = Object.assign;
	    }
	
	    /**
	     * extend object.
	     * means that properties in dest will be overwritten by the ones in src.
	     * @param {Object} dest
	     * @param {Object} src
	     * @param {Boolean} [merge=false]
	     * @returns {Object} dest
	     */
	    var extend = deprecate(function extend(dest, src, merge) {
	        var keys = Object.keys(src);
	        var i = 0;
	        while (i < keys.length) {
	            if (!merge || merge && dest[keys[i]] === undefined) {
	                dest[keys[i]] = src[keys[i]];
	            }
	            i++;
	        }
	        return dest;
	    }, 'extend', 'Use `assign`.');
	
	    /**
	     * merge the values from src in the dest.
	     * means that properties that exist in dest will not be overwritten by src
	     * @param {Object} dest
	     * @param {Object} src
	     * @returns {Object} dest
	     */
	    var merge = deprecate(function merge(dest, src) {
	        return extend(dest, src, true);
	    }, 'merge', 'Use `assign`.');
	
	    /**
	     * simple class inheritance
	     * @param {Function} child
	     * @param {Function} base
	     * @param {Object} [properties]
	     */
	    function inherit(child, base, properties) {
	        var baseP = base.prototype,
	            childP;
	
	        childP = child.prototype = Object.create(baseP);
	        childP.constructor = child;
	        childP._super = baseP;
	
	        if (properties) {
	            assign(childP, properties);
	        }
	    }
	
	    /**
	     * simple function bind
	     * @param {Function} fn
	     * @param {Object} context
	     * @returns {Function}
	     */
	    function bindFn(fn, context) {
	        return function boundFn() {
	            return fn.apply(context, arguments);
	        };
	    }
	
	    /**
	     * let a boolean value also be a function that must return a boolean
	     * this first item in args will be used as the context
	     * @param {Boolean|Function} val
	     * @param {Array} [args]
	     * @returns {Boolean}
	     */
	    function boolOrFn(val, args) {
	        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == TYPE_FUNCTION) {
	            return val.apply(args ? args[0] || undefined : undefined, args);
	        }
	        return val;
	    }
	
	    /**
	     * use the val2 when val1 is undefined
	     * @param {*} val1
	     * @param {*} val2
	     * @returns {*}
	     */
	    function ifUndefined(val1, val2) {
	        return val1 === undefined ? val2 : val1;
	    }
	
	    /**
	     * addEventListener with multiple events at once
	     * @param {EventTarget} target
	     * @param {String} types
	     * @param {Function} handler
	     */
	    function addEventListeners(target, types, handler) {
	        each(splitStr(types), function (type) {
	            target.addEventListener(type, handler, false);
	        });
	    }
	
	    /**
	     * removeEventListener with multiple events at once
	     * @param {EventTarget} target
	     * @param {String} types
	     * @param {Function} handler
	     */
	    function removeEventListeners(target, types, handler) {
	        each(splitStr(types), function (type) {
	            target.removeEventListener(type, handler, false);
	        });
	    }
	
	    /**
	     * find if a node is in the given parent
	     * @method hasParent
	     * @param {HTMLElement} node
	     * @param {HTMLElement} parent
	     * @return {Boolean} found
	     */
	    function hasParent(node, parent) {
	        while (node) {
	            if (node == parent) {
	                return true;
	            }
	            node = node.parentNode;
	        }
	        return false;
	    }
	
	    /**
	     * small indexOf wrapper
	     * @param {String} str
	     * @param {String} find
	     * @returns {Boolean} found
	     */
	    function inStr(str, find) {
	        return str.indexOf(find) > -1;
	    }
	
	    /**
	     * split string on whitespace
	     * @param {String} str
	     * @returns {Array} words
	     */
	    function splitStr(str) {
	        return str.trim().split(/\s+/g);
	    }
	
	    /**
	     * find if a array contains the object using indexOf or a simple polyFill
	     * @param {Array} src
	     * @param {String} find
	     * @param {String} [findByKey]
	     * @return {Boolean|Number} false when not found, or the index
	     */
	    function inArray(src, find, findByKey) {
	        if (src.indexOf && !findByKey) {
	            return src.indexOf(find);
	        } else {
	            var i = 0;
	            while (i < src.length) {
	                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
	                    return i;
	                }
	                i++;
	            }
	            return -1;
	        }
	    }
	
	    /**
	     * convert array-like objects to real arrays
	     * @param {Object} obj
	     * @returns {Array}
	     */
	    function toArray(obj) {
	        return Array.prototype.slice.call(obj, 0);
	    }
	
	    /**
	     * unique array with objects based on a key (like 'id') or just by the array's value
	     * @param {Array} src [{id:1},{id:2},{id:1}]
	     * @param {String} [key]
	     * @param {Boolean} [sort=False]
	     * @returns {Array} [{id:1},{id:2}]
	     */
	    function uniqueArray(src, key, sort) {
	        var results = [];
	        var values = [];
	        var i = 0;
	
	        while (i < src.length) {
	            var val = key ? src[i][key] : src[i];
	            if (inArray(values, val) < 0) {
	                results.push(src[i]);
	            }
	            values[i] = val;
	            i++;
	        }
	
	        if (sort) {
	            if (!key) {
	                results = results.sort();
	            } else {
	                results = results.sort(function sortUniqueArray(a, b) {
	                    return a[key] > b[key];
	                });
	            }
	        }
	
	        return results;
	    }
	
	    /**
	     * get the prefixed property
	     * @param {Object} obj
	     * @param {String} property
	     * @returns {String|Undefined} prefixed
	     */
	    function prefixed(obj, property) {
	        var prefix, prop;
	        var camelProp = property[0].toUpperCase() + property.slice(1);
	
	        var i = 0;
	        while (i < VENDOR_PREFIXES.length) {
	            prefix = VENDOR_PREFIXES[i];
	            prop = prefix ? prefix + camelProp : property;
	
	            if (prop in obj) {
	                return prop;
	            }
	            i++;
	        }
	        return undefined;
	    }
	
	    /**
	     * get a unique id
	     * @returns {number} uniqueId
	     */
	    var _uniqueId = 1;
	    function uniqueId() {
	        return _uniqueId++;
	    }
	
	    /**
	     * get the window object of an element
	     * @param {HTMLElement} element
	     * @returns {DocumentView|Window}
	     */
	    function getWindowForElement(element) {
	        var doc = element.ownerDocument || element;
	        return doc.defaultView || doc.parentWindow || window;
	    }
	
	    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	
	    var SUPPORT_TOUCH = 'ontouchstart' in window;
	    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
	
	    var INPUT_TYPE_TOUCH = 'touch';
	    var INPUT_TYPE_PEN = 'pen';
	    var INPUT_TYPE_MOUSE = 'mouse';
	    var INPUT_TYPE_KINECT = 'kinect';
	
	    var COMPUTE_INTERVAL = 25;
	
	    var INPUT_START = 1;
	    var INPUT_MOVE = 2;
	    var INPUT_END = 4;
	    var INPUT_CANCEL = 8;
	
	    var DIRECTION_NONE = 1;
	    var DIRECTION_LEFT = 2;
	    var DIRECTION_RIGHT = 4;
	    var DIRECTION_UP = 8;
	    var DIRECTION_DOWN = 16;
	
	    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
	
	    var PROPS_XY = ['x', 'y'];
	    var PROPS_CLIENT_XY = ['clientX', 'clientY'];
	
	    /**
	     * create new input type manager
	     * @param {Manager} manager
	     * @param {Function} callback
	     * @returns {Input}
	     * @constructor
	     */
	    function Input(manager, callback) {
	        var self = this;
	        this.manager = manager;
	        this.callback = callback;
	        this.element = manager.element;
	        this.target = manager.options.inputTarget;
	
	        // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	        // so when disabled the input events are completely bypassed.
	        this.domHandler = function (ev) {
	            if (boolOrFn(manager.options.enable, [manager])) {
	                self.handler(ev);
	            }
	        };
	
	        this.init();
	    }
	
	    Input.prototype = {
	        /**
	         * should handle the inputEvent data and trigger the callback
	         * @virtual
	         */
	        handler: function handler() {},
	
	        /**
	         * bind the events
	         */
	        init: function init() {
	            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	        },
	
	        /**
	         * unbind the events
	         */
	        destroy: function destroy() {
	            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	        }
	    };
	
	    /**
	     * create new input type manager
	     * called by the Manager constructor
	     * @param {Hammer} manager
	     * @returns {Input}
	     */
	    function createInputInstance(manager) {
	        var Type;
	        var inputClass = manager.options.inputClass;
	
	        if (inputClass) {
	            Type = inputClass;
	        } else if (SUPPORT_POINTER_EVENTS) {
	            Type = PointerEventInput;
	        } else if (SUPPORT_ONLY_TOUCH) {
	            Type = TouchInput;
	        } else if (!SUPPORT_TOUCH) {
	            Type = MouseInput;
	        } else {
	            Type = TouchMouseInput;
	        }
	        return new Type(manager, inputHandler);
	    }
	
	    /**
	     * handle input events
	     * @param {Manager} manager
	     * @param {String} eventType
	     * @param {Object} input
	     */
	    function inputHandler(manager, eventType, input) {
	        var pointersLen = input.pointers.length;
	        var changedPointersLen = input.changedPointers.length;
	        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
	        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
	
	        input.isFirst = !!isFirst;
	        input.isFinal = !!isFinal;
	
	        if (isFirst) {
	            manager.session = {};
	        }
	
	        // source event is the normalized value of the domEvents
	        // like 'touchstart, mouseup, pointerdown'
	        input.eventType = eventType;
	
	        // compute scale, rotation etc
	        computeInputData(manager, input);
	
	        // emit secret event
	        manager.emit('hammer.input', input);
	
	        manager.recognize(input);
	        manager.session.prevInput = input;
	    }
	
	    /**
	     * extend the data with some usable properties like scale, rotate, velocity etc
	     * @param {Object} manager
	     * @param {Object} input
	     */
	    function computeInputData(manager, input) {
	        var session = manager.session;
	        var pointers = input.pointers;
	        var pointersLength = pointers.length;
	
	        // store the first input to calculate the distance and direction
	        if (!session.firstInput) {
	            session.firstInput = simpleCloneInputData(input);
	        }
	
	        // to compute scale and rotation we need to store the multiple touches
	        if (pointersLength > 1 && !session.firstMultiple) {
	            session.firstMultiple = simpleCloneInputData(input);
	        } else if (pointersLength === 1) {
	            session.firstMultiple = false;
	        }
	
	        var firstInput = session.firstInput;
	        var firstMultiple = session.firstMultiple;
	        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
	
	        var center = input.center = getCenter(pointers);
	        input.timeStamp = now();
	        input.deltaTime = input.timeStamp - firstInput.timeStamp;
	
	        input.angle = getAngle(offsetCenter, center);
	        input.distance = getDistance(offsetCenter, center);
	
	        computeDeltaXY(session, input);
	        input.offsetDirection = getDirection(input.deltaX, input.deltaY);
	
	        var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	        input.overallVelocityX = overallVelocity.x;
	        input.overallVelocityY = overallVelocity.y;
	        input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
	
	        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
	
	        input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
	
	        computeIntervalInputData(session, input);
	
	        // find the correct target
	        var target = manager.element;
	        if (hasParent(input.srcEvent.target, target)) {
	            target = input.srcEvent.target;
	        }
	        input.target = target;
	    }
	
	    function computeDeltaXY(session, input) {
	        var center = input.center;
	        var offset = session.offsetDelta || {};
	        var prevDelta = session.prevDelta || {};
	        var prevInput = session.prevInput || {};
	
	        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	            prevDelta = session.prevDelta = {
	                x: prevInput.deltaX || 0,
	                y: prevInput.deltaY || 0
	            };
	
	            offset = session.offsetDelta = {
	                x: center.x,
	                y: center.y
	            };
	        }
	
	        input.deltaX = prevDelta.x + (center.x - offset.x);
	        input.deltaY = prevDelta.y + (center.y - offset.y);
	    }
	
	    /**
	     * velocity is calculated every x ms
	     * @param {Object} session
	     * @param {Object} input
	     */
	    function computeIntervalInputData(session, input) {
	        var last = session.lastInterval || input,
	            deltaTime = input.timeStamp - last.timeStamp,
	            velocity,
	            velocityX,
	            velocityY,
	            direction;
	
	        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	            var deltaX = input.deltaX - last.deltaX;
	            var deltaY = input.deltaY - last.deltaY;
	
	            var v = getVelocity(deltaTime, deltaX, deltaY);
	            velocityX = v.x;
	            velocityY = v.y;
	            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
	            direction = getDirection(deltaX, deltaY);
	
	            session.lastInterval = input;
	        } else {
	            // use latest velocity info if it doesn't overtake a minimum period
	            velocity = last.velocity;
	            velocityX = last.velocityX;
	            velocityY = last.velocityY;
	            direction = last.direction;
	        }
	
	        input.velocity = velocity;
	        input.velocityX = velocityX;
	        input.velocityY = velocityY;
	        input.direction = direction;
	    }
	
	    /**
	     * create a simple clone from the input used for storage of firstInput and firstMultiple
	     * @param {Object} input
	     * @returns {Object} clonedInputData
	     */
	    function simpleCloneInputData(input) {
	        // make a simple copy of the pointers because we will get a reference if we don't
	        // we only need clientXY for the calculations
	        var pointers = [];
	        var i = 0;
	        while (i < input.pointers.length) {
	            pointers[i] = {
	                clientX: round(input.pointers[i].clientX),
	                clientY: round(input.pointers[i].clientY)
	            };
	            i++;
	        }
	
	        return {
	            timeStamp: now(),
	            pointers: pointers,
	            center: getCenter(pointers),
	            deltaX: input.deltaX,
	            deltaY: input.deltaY
	        };
	    }
	
	    /**
	     * get the center of all the pointers
	     * @param {Array} pointers
	     * @return {Object} center contains `x` and `y` properties
	     */
	    function getCenter(pointers) {
	        var pointersLength = pointers.length;
	
	        // no need to loop when only one touch
	        if (pointersLength === 1) {
	            return {
	                x: round(pointers[0].clientX),
	                y: round(pointers[0].clientY)
	            };
	        }
	
	        var x = 0,
	            y = 0,
	            i = 0;
	        while (i < pointersLength) {
	            x += pointers[i].clientX;
	            y += pointers[i].clientY;
	            i++;
	        }
	
	        return {
	            x: round(x / pointersLength),
	            y: round(y / pointersLength)
	        };
	    }
	
	    /**
	     * calculate the velocity between two points. unit is in px per ms.
	     * @param {Number} deltaTime
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Object} velocity `x` and `y`
	     */
	    function getVelocity(deltaTime, x, y) {
	        return {
	            x: x / deltaTime || 0,
	            y: y / deltaTime || 0
	        };
	    }
	
	    /**
	     * get the direction between two points
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Number} direction
	     */
	    function getDirection(x, y) {
	        if (x === y) {
	            return DIRECTION_NONE;
	        }
	
	        if (abs(x) >= abs(y)) {
	            return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        }
	        return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	    }
	
	    /**
	     * calculate the absolute distance between two points
	     * @param {Object} p1 {x, y}
	     * @param {Object} p2 {x, y}
	     * @param {Array} [props] containing x and y keys
	     * @return {Number} distance
	     */
	    function getDistance(p1, p2, props) {
	        if (!props) {
	            props = PROPS_XY;
	        }
	        var x = p2[props[0]] - p1[props[0]],
	            y = p2[props[1]] - p1[props[1]];
	
	        return Math.sqrt(x * x + y * y);
	    }
	
	    /**
	     * calculate the angle between two coordinates
	     * @param {Object} p1
	     * @param {Object} p2
	     * @param {Array} [props] containing x and y keys
	     * @return {Number} angle
	     */
	    function getAngle(p1, p2, props) {
	        if (!props) {
	            props = PROPS_XY;
	        }
	        var x = p2[props[0]] - p1[props[0]],
	            y = p2[props[1]] - p1[props[1]];
	        return Math.atan2(y, x) * 180 / Math.PI;
	    }
	
	    /**
	     * calculate the rotation degrees between two pointersets
	     * @param {Array} start array of pointers
	     * @param {Array} end array of pointers
	     * @return {Number} rotation
	     */
	    function getRotation(start, end) {
	        return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	    }
	
	    /**
	     * calculate the scale factor between two pointersets
	     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	     * @param {Array} start array of pointers
	     * @param {Array} end array of pointers
	     * @return {Number} scale
	     */
	    function getScale(start, end) {
	        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	    }
	
	    var MOUSE_INPUT_MAP = {
	        mousedown: INPUT_START,
	        mousemove: INPUT_MOVE,
	        mouseup: INPUT_END
	    };
	
	    var MOUSE_ELEMENT_EVENTS = 'mousedown';
	    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
	
	    /**
	     * Mouse events input
	     * @constructor
	     * @extends Input
	     */
	    function MouseInput() {
	        this.evEl = MOUSE_ELEMENT_EVENTS;
	        this.evWin = MOUSE_WINDOW_EVENTS;
	
	        this.pressed = false; // mousedown state
	
	        Input.apply(this, arguments);
	    }
	
	    inherit(MouseInput, Input, {
	        /**
	         * handle mouse events
	         * @param {Object} ev
	         */
	        handler: function MEhandler(ev) {
	            var eventType = MOUSE_INPUT_MAP[ev.type];
	
	            // on start we want to have the left mouse button down
	            if (eventType & INPUT_START && ev.button === 0) {
	                this.pressed = true;
	            }
	
	            if (eventType & INPUT_MOVE && ev.which !== 1) {
	                eventType = INPUT_END;
	            }
	
	            // mouse must be down
	            if (!this.pressed) {
	                return;
	            }
	
	            if (eventType & INPUT_END) {
	                this.pressed = false;
	            }
	
	            this.callback(this.manager, eventType, {
	                pointers: [ev],
	                changedPointers: [ev],
	                pointerType: INPUT_TYPE_MOUSE,
	                srcEvent: ev
	            });
	        }
	    });
	
	    var POINTER_INPUT_MAP = {
	        pointerdown: INPUT_START,
	        pointermove: INPUT_MOVE,
	        pointerup: INPUT_END,
	        pointercancel: INPUT_CANCEL,
	        pointerout: INPUT_CANCEL
	    };
	
	    // in IE10 the pointer types is defined as an enum
	    var IE10_POINTER_TYPE_ENUM = {
	        2: INPUT_TYPE_TOUCH,
	        3: INPUT_TYPE_PEN,
	        4: INPUT_TYPE_MOUSE,
	        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	    };
	
	    var POINTER_ELEMENT_EVENTS = 'pointerdown';
	    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';
	
	    // IE10 has prefixed support, and case-sensitive
	    if (window.MSPointerEvent && !window.PointerEvent) {
	        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	    }
	
	    /**
	     * Pointer events input
	     * @constructor
	     * @extends Input
	     */
	    function PointerEventInput() {
	        this.evEl = POINTER_ELEMENT_EVENTS;
	        this.evWin = POINTER_WINDOW_EVENTS;
	
	        Input.apply(this, arguments);
	
	        this.store = this.manager.session.pointerEvents = [];
	    }
	
	    inherit(PointerEventInput, Input, {
	        /**
	         * handle mouse events
	         * @param {Object} ev
	         */
	        handler: function PEhandler(ev) {
	            var store = this.store;
	            var removePointer = false;
	
	            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
	
	            var isTouch = pointerType == INPUT_TYPE_TOUCH;
	
	            // get index of the event in the store
	            var storeIndex = inArray(store, ev.pointerId, 'pointerId');
	
	            // start and mouse must be down
	            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	                if (storeIndex < 0) {
	                    store.push(ev);
	                    storeIndex = store.length - 1;
	                }
	            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	                removePointer = true;
	            }
	
	            // it not found, so the pointer hasn't been down (so it's probably a hover)
	            if (storeIndex < 0) {
	                return;
	            }
	
	            // update the event in the store
	            store[storeIndex] = ev;
	
	            this.callback(this.manager, eventType, {
	                pointers: store,
	                changedPointers: [ev],
	                pointerType: pointerType,
	                srcEvent: ev
	            });
	
	            if (removePointer) {
	                // remove from the store
	                store.splice(storeIndex, 1);
	            }
	        }
	    });
	
	    var SINGLE_TOUCH_INPUT_MAP = {
	        touchstart: INPUT_START,
	        touchmove: INPUT_MOVE,
	        touchend: INPUT_END,
	        touchcancel: INPUT_CANCEL
	    };
	
	    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	    /**
	     * Touch events input
	     * @constructor
	     * @extends Input
	     */
	    function SingleTouchInput() {
	        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	        this.started = false;
	
	        Input.apply(this, arguments);
	    }
	
	    inherit(SingleTouchInput, Input, {
	        handler: function TEhandler(ev) {
	            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
	
	            // should we handle the touch events?
	            if (type === INPUT_START) {
	                this.started = true;
	            }
	
	            if (!this.started) {
	                return;
	            }
	
	            var touches = normalizeSingleTouches.call(this, ev, type);
	
	            // when done, reset the started state
	            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	                this.started = false;
	            }
	
	            this.callback(this.manager, type, {
	                pointers: touches[0],
	                changedPointers: touches[1],
	                pointerType: INPUT_TYPE_TOUCH,
	                srcEvent: ev
	            });
	        }
	    });
	
	    /**
	     * @this {TouchInput}
	     * @param {Object} ev
	     * @param {Number} type flag
	     * @returns {undefined|Array} [all, changed]
	     */
	    function normalizeSingleTouches(ev, type) {
	        var all = toArray(ev.touches);
	        var changed = toArray(ev.changedTouches);
	
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            all = uniqueArray(all.concat(changed), 'identifier', true);
	        }
	
	        return [all, changed];
	    }
	
	    var TOUCH_INPUT_MAP = {
	        touchstart: INPUT_START,
	        touchmove: INPUT_MOVE,
	        touchend: INPUT_END,
	        touchcancel: INPUT_CANCEL
	    };
	
	    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
	
	    /**
	     * Multi-user touch events input
	     * @constructor
	     * @extends Input
	     */
	    function TouchInput() {
	        this.evTarget = TOUCH_TARGET_EVENTS;
	        this.targetIds = {};
	
	        Input.apply(this, arguments);
	    }
	
	    inherit(TouchInput, Input, {
	        handler: function MTEhandler(ev) {
	            var type = TOUCH_INPUT_MAP[ev.type];
	            var touches = getTouches.call(this, ev, type);
	            if (!touches) {
	                return;
	            }
	
	            this.callback(this.manager, type, {
	                pointers: touches[0],
	                changedPointers: touches[1],
	                pointerType: INPUT_TYPE_TOUCH,
	                srcEvent: ev
	            });
	        }
	    });
	
	    /**
	     * @this {TouchInput}
	     * @param {Object} ev
	     * @param {Number} type flag
	     * @returns {undefined|Array} [all, changed]
	     */
	    function getTouches(ev, type) {
	        var allTouches = toArray(ev.touches);
	        var targetIds = this.targetIds;
	
	        // when there is only one touch, the process can be simplified
	        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	            targetIds[allTouches[0].identifier] = true;
	            return [allTouches, allTouches];
	        }
	
	        var i,
	            targetTouches,
	            changedTouches = toArray(ev.changedTouches),
	            changedTargetTouches = [],
	            target = this.target;
	
	        // get target touches from touches
	        targetTouches = allTouches.filter(function (touch) {
	            return hasParent(touch.target, target);
	        });
	
	        // collect touches
	        if (type === INPUT_START) {
	            i = 0;
	            while (i < targetTouches.length) {
	                targetIds[targetTouches[i].identifier] = true;
	                i++;
	            }
	        }
	
	        // filter changed touches to only contain touches that exist in the collected target ids
	        i = 0;
	        while (i < changedTouches.length) {
	            if (targetIds[changedTouches[i].identifier]) {
	                changedTargetTouches.push(changedTouches[i]);
	            }
	
	            // cleanup removed touches
	            if (type & (INPUT_END | INPUT_CANCEL)) {
	                delete targetIds[changedTouches[i].identifier];
	            }
	            i++;
	        }
	
	        if (!changedTargetTouches.length) {
	            return;
	        }
	
	        return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
	    }
	
	    /**
	     * Combined touch and mouse input
	     *
	     * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	     * This because touch devices also emit mouse events while doing a touch.
	     *
	     * @constructor
	     * @extends Input
	     */
	
	    var DEDUP_TIMEOUT = 2500;
	    var DEDUP_DISTANCE = 25;
	
	    function TouchMouseInput() {
	        Input.apply(this, arguments);
	
	        var handler = bindFn(this.handler, this);
	        this.touch = new TouchInput(this.manager, handler);
	        this.mouse = new MouseInput(this.manager, handler);
	
	        this.primaryTouch = null;
	        this.lastTouches = [];
	    }
	
	    inherit(TouchMouseInput, Input, {
	        /**
	         * handle mouse and touch events
	         * @param {Hammer} manager
	         * @param {String} inputEvent
	         * @param {Object} inputData
	         */
	        handler: function TMEhandler(manager, inputEvent, inputData) {
	            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
	                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;
	
	            if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	                return;
	            }
	
	            // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	            if (isTouch) {
	                recordTouches.call(this, inputEvent, inputData);
	            } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	                return;
	            }
	
	            this.callback(manager, inputEvent, inputData);
	        },
	
	        /**
	         * remove the event listeners
	         */
	        destroy: function destroy() {
	            this.touch.destroy();
	            this.mouse.destroy();
	        }
	    });
	
	    function recordTouches(eventType, eventData) {
	        if (eventType & INPUT_START) {
	            this.primaryTouch = eventData.changedPointers[0].identifier;
	            setLastTouch.call(this, eventData);
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            setLastTouch.call(this, eventData);
	        }
	    }
	
	    function setLastTouch(eventData) {
	        var touch = eventData.changedPointers[0];
	
	        if (touch.identifier === this.primaryTouch) {
	            var lastTouch = { x: touch.clientX, y: touch.clientY };
	            this.lastTouches.push(lastTouch);
	            var lts = this.lastTouches;
	            var removeLastTouch = function removeLastTouch() {
	                var i = lts.indexOf(lastTouch);
	                if (i > -1) {
	                    lts.splice(i, 1);
	                }
	            };
	            setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	        }
	    }
	
	    function isSyntheticEvent(eventData) {
	        var x = eventData.srcEvent.clientX,
	            y = eventData.srcEvent.clientY;
	        for (var i = 0; i < this.lastTouches.length; i++) {
	            var t = this.lastTouches[i];
	            var dx = Math.abs(x - t.x),
	                dy = Math.abs(y - t.y);
	            if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	                return true;
	            }
	        }
	        return false;
	    }
	
	    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
	
	    // magical touchAction value
	    var TOUCH_ACTION_COMPUTE = 'compute';
	    var TOUCH_ACTION_AUTO = 'auto';
	    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	    var TOUCH_ACTION_NONE = 'none';
	    var TOUCH_ACTION_PAN_X = 'pan-x';
	    var TOUCH_ACTION_PAN_Y = 'pan-y';
	    var TOUCH_ACTION_MAP = getTouchActionProps();
	
	    /**
	     * Touch Action
	     * sets the touchAction property or uses the js alternative
	     * @param {Manager} manager
	     * @param {String} value
	     * @constructor
	     */
	    function TouchAction(manager, value) {
	        this.manager = manager;
	        this.set(value);
	    }
	
	    TouchAction.prototype = {
	        /**
	         * set the touchAction value on the element or enable the polyfill
	         * @param {String} value
	         */
	        set: function set(value) {
	            // find out the touch-action by the event handlers
	            if (value == TOUCH_ACTION_COMPUTE) {
	                value = this.compute();
	            }
	
	            if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	            }
	            this.actions = value.toLowerCase().trim();
	        },
	
	        /**
	         * just re-set the touchAction value
	         */
	        update: function update() {
	            this.set(this.manager.options.touchAction);
	        },
	
	        /**
	         * compute the value for the touchAction property based on the recognizer's settings
	         * @returns {String} value
	         */
	        compute: function compute() {
	            var actions = [];
	            each(this.manager.recognizers, function (recognizer) {
	                if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                    actions = actions.concat(recognizer.getTouchAction());
	                }
	            });
	            return cleanTouchActions(actions.join(' '));
	        },
	
	        /**
	         * this method is called on each input cycle and provides the preventing of the browser behavior
	         * @param {Object} input
	         */
	        preventDefaults: function preventDefaults(input) {
	            var srcEvent = input.srcEvent;
	            var direction = input.offsetDirection;
	
	            // if the touch action did prevented once this session
	            if (this.manager.session.prevented) {
	                srcEvent.preventDefault();
	                return;
	            }
	
	            var actions = this.actions;
	            var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
	
	            if (hasNone) {
	                //do not prevent defaults if this is a tap gesture
	
	                var isTapPointer = input.pointers.length === 1;
	                var isTapMovement = input.distance < 2;
	                var isTapTouchTime = input.deltaTime < 250;
	
	                if (isTapPointer && isTapMovement && isTapTouchTime) {
	                    return;
	                }
	            }
	
	            if (hasPanX && hasPanY) {
	                // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	                return;
	            }
	
	            if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
	                return this.preventSrc(srcEvent);
	            }
	        },
	
	        /**
	         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	         * @param {Object} srcEvent
	         */
	        preventSrc: function preventSrc(srcEvent) {
	            this.manager.session.prevented = true;
	            srcEvent.preventDefault();
	        }
	    };
	
	    /**
	     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	     * @param {String} actions
	     * @returns {*}
	     */
	    function cleanTouchActions(actions) {
	        // none
	        if (inStr(actions, TOUCH_ACTION_NONE)) {
	            return TOUCH_ACTION_NONE;
	        }
	
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	
	        // if both pan-x and pan-y are set (different recognizers
	        // for different directions, e.g. horizontal pan but vertical swipe?)
	        // we need none (as otherwise with pan-x pan-y combined none of these
	        // recognizers will work, since the browser would handle all panning
	        if (hasPanX && hasPanY) {
	            return TOUCH_ACTION_NONE;
	        }
	
	        // pan-x OR pan-y
	        if (hasPanX || hasPanY) {
	            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	        }
	
	        // manipulation
	        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	            return TOUCH_ACTION_MANIPULATION;
	        }
	
	        return TOUCH_ACTION_AUTO;
	    }
	
	    function getTouchActionProps() {
	        if (!NATIVE_TOUCH_ACTION) {
	            return false;
	        }
	        var touchMap = {};
	        var cssSupports = window.CSS && window.CSS.supports;
	        ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
	
	            // If css.supports is not supported but there is native touch-action assume it supports
	            // all values. This is the case for IE 10 and 11.
	            touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	        });
	        return touchMap;
	    }
	
	    /**
	     * Recognizer flow explained; *
	     * All recognizers have the initial state of POSSIBLE when a input session starts.
	     * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	     * Example session for mouse-input: mousedown -> mousemove -> mouseup
	     *
	     * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	     * which determines with state it should be.
	     *
	     * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	     * POSSIBLE to give it another change on the next cycle.
	     *
	     *               Possible
	     *                  |
	     *            +-----+---------------+
	     *            |                     |
	     *      +-----+-----+               |
	     *      |           |               |
	     *   Failed      Cancelled          |
	     *                          +-------+------+
	     *                          |              |
	     *                      Recognized       Began
	     *                                         |
	     *                                      Changed
	     *                                         |
	     *                                  Ended/Recognized
	     */
	    var STATE_POSSIBLE = 1;
	    var STATE_BEGAN = 2;
	    var STATE_CHANGED = 4;
	    var STATE_ENDED = 8;
	    var STATE_RECOGNIZED = STATE_ENDED;
	    var STATE_CANCELLED = 16;
	    var STATE_FAILED = 32;
	
	    /**
	     * Recognizer
	     * Every recognizer needs to extend from this class.
	     * @constructor
	     * @param {Object} options
	     */
	    function Recognizer(options) {
	        this.options = assign({}, this.defaults, options || {});
	
	        this.id = uniqueId();
	
	        this.manager = null;
	
	        // default is enable true
	        this.options.enable = ifUndefined(this.options.enable, true);
	
	        this.state = STATE_POSSIBLE;
	
	        this.simultaneous = {};
	        this.requireFail = [];
	    }
	
	    Recognizer.prototype = {
	        /**
	         * @virtual
	         * @type {Object}
	         */
	        defaults: {},
	
	        /**
	         * set options
	         * @param {Object} options
	         * @return {Recognizer}
	         */
	        set: function set(options) {
	            assign(this.options, options);
	
	            // also update the touchAction, in case something changed about the directions/enabled state
	            this.manager && this.manager.touchAction.update();
	            return this;
	        },
	
	        /**
	         * recognize simultaneous with an other recognizer.
	         * @param {Recognizer} otherRecognizer
	         * @returns {Recognizer} this
	         */
	        recognizeWith: function recognizeWith(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	                return this;
	            }
	
	            var simultaneous = this.simultaneous;
	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            if (!simultaneous[otherRecognizer.id]) {
	                simultaneous[otherRecognizer.id] = otherRecognizer;
	                otherRecognizer.recognizeWith(this);
	            }
	            return this;
	        },
	
	        /**
	         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	         * @param {Recognizer} otherRecognizer
	         * @returns {Recognizer} this
	         */
	        dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	                return this;
	            }
	
	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            delete this.simultaneous[otherRecognizer.id];
	            return this;
	        },
	
	        /**
	         * recognizer can only run when an other is failing
	         * @param {Recognizer} otherRecognizer
	         * @returns {Recognizer} this
	         */
	        requireFailure: function requireFailure(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	                return this;
	            }
	
	            var requireFail = this.requireFail;
	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            if (inArray(requireFail, otherRecognizer) === -1) {
	                requireFail.push(otherRecognizer);
	                otherRecognizer.requireFailure(this);
	            }
	            return this;
	        },
	
	        /**
	         * drop the requireFailure link. it does not remove the link on the other recognizer.
	         * @param {Recognizer} otherRecognizer
	         * @returns {Recognizer} this
	         */
	        dropRequireFailure: function dropRequireFailure(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	                return this;
	            }
	
	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            var index = inArray(this.requireFail, otherRecognizer);
	            if (index > -1) {
	                this.requireFail.splice(index, 1);
	            }
	            return this;
	        },
	
	        /**
	         * has require failures boolean
	         * @returns {boolean}
	         */
	        hasRequireFailures: function hasRequireFailures() {
	            return this.requireFail.length > 0;
	        },
	
	        /**
	         * if the recognizer can recognize simultaneous with an other recognizer
	         * @param {Recognizer} otherRecognizer
	         * @returns {Boolean}
	         */
	        canRecognizeWith: function canRecognizeWith(otherRecognizer) {
	            return !!this.simultaneous[otherRecognizer.id];
	        },
	
	        /**
	         * You should use `tryEmit` instead of `emit` directly to check
	         * that all the needed recognizers has failed before emitting.
	         * @param {Object} input
	         */
	        emit: function emit(input) {
	            var self = this;
	            var state = this.state;
	
	            function emit(event) {
	                self.manager.emit(event, input);
	            }
	
	            // 'panstart' and 'panmove'
	            if (state < STATE_ENDED) {
	                emit(self.options.event + stateStr(state));
	            }
	
	            emit(self.options.event); // simple 'eventName' events
	
	            if (input.additionalEvent) {
	                // additional event(panleft, panright, pinchin, pinchout...)
	                emit(input.additionalEvent);
	            }
	
	            // panend and pancancel
	            if (state >= STATE_ENDED) {
	                emit(self.options.event + stateStr(state));
	            }
	        },
	
	        /**
	         * Check that all the require failure recognizers has failed,
	         * if true, it emits a gesture event,
	         * otherwise, setup the state to FAILED.
	         * @param {Object} input
	         */
	        tryEmit: function tryEmit(input) {
	            if (this.canEmit()) {
	                return this.emit(input);
	            }
	            // it's failing anyway
	            this.state = STATE_FAILED;
	        },
	
	        /**
	         * can we emit?
	         * @returns {boolean}
	         */
	        canEmit: function canEmit() {
	            var i = 0;
	            while (i < this.requireFail.length) {
	                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                    return false;
	                }
	                i++;
	            }
	            return true;
	        },
	
	        /**
	         * update the recognizer
	         * @param {Object} inputData
	         */
	        recognize: function recognize(inputData) {
	            // make a new copy of the inputData
	            // so we can change the inputData without messing up the other recognizers
	            var inputDataClone = assign({}, inputData);
	
	            // is is enabled and allow recognizing?
	            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	                this.reset();
	                this.state = STATE_FAILED;
	                return;
	            }
	
	            // reset when we've reached the end
	            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	                this.state = STATE_POSSIBLE;
	            }
	
	            this.state = this.process(inputDataClone);
	
	            // the recognizer has recognized a gesture
	            // so trigger an event
	            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	                this.tryEmit(inputDataClone);
	            }
	        },
	
	        /**
	         * return the state of the recognizer
	         * the actual recognizing happens in this method
	         * @virtual
	         * @param {Object} inputData
	         * @returns {Const} STATE
	         */
	        process: function process(inputData) {}, // jshint ignore:line
	
	        /**
	         * return the preferred touch-action
	         * @virtual
	         * @returns {Array}
	         */
	        getTouchAction: function getTouchAction() {},
	
	        /**
	         * called when the gesture isn't allowed to recognize
	         * like when another is being recognized or it is disabled
	         * @virtual
	         */
	        reset: function reset() {}
	    };
	
	    /**
	     * get a usable string, used as event postfix
	     * @param {Const} state
	     * @returns {String} state
	     */
	    function stateStr(state) {
	        if (state & STATE_CANCELLED) {
	            return 'cancel';
	        } else if (state & STATE_ENDED) {
	            return 'end';
	        } else if (state & STATE_CHANGED) {
	            return 'move';
	        } else if (state & STATE_BEGAN) {
	            return 'start';
	        }
	        return '';
	    }
	
	    /**
	     * direction cons to string
	     * @param {Const} direction
	     * @returns {String}
	     */
	    function directionStr(direction) {
	        if (direction == DIRECTION_DOWN) {
	            return 'down';
	        } else if (direction == DIRECTION_UP) {
	            return 'up';
	        } else if (direction == DIRECTION_LEFT) {
	            return 'left';
	        } else if (direction == DIRECTION_RIGHT) {
	            return 'right';
	        }
	        return '';
	    }
	
	    /**
	     * get a recognizer by name if it is bound to a manager
	     * @param {Recognizer|String} otherRecognizer
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer}
	     */
	    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	        var manager = recognizer.manager;
	        if (manager) {
	            return manager.get(otherRecognizer);
	        }
	        return otherRecognizer;
	    }
	
	    /**
	     * This recognizer is just used as a base for the simple attribute recognizers.
	     * @constructor
	     * @extends Recognizer
	     */
	    function AttrRecognizer() {
	        Recognizer.apply(this, arguments);
	    }
	
	    inherit(AttrRecognizer, Recognizer, {
	        /**
	         * @namespace
	         * @memberof AttrRecognizer
	         */
	        defaults: {
	            /**
	             * @type {Number}
	             * @default 1
	             */
	            pointers: 1
	        },
	
	        /**
	         * Used to check if it the recognizer receives valid input, like input.distance > 10.
	         * @memberof AttrRecognizer
	         * @param {Object} input
	         * @returns {Boolean} recognized
	         */
	        attrTest: function attrTest(input) {
	            var optionPointers = this.options.pointers;
	            return optionPointers === 0 || input.pointers.length === optionPointers;
	        },
	
	        /**
	         * Process the input and return the state for the recognizer
	         * @memberof AttrRecognizer
	         * @param {Object} input
	         * @returns {*} State
	         */
	        process: function process(input) {
	            var state = this.state;
	            var eventType = input.eventType;
	
	            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	            var isValid = this.attrTest(input);
	
	            // on cancel input and we've recognized before, return STATE_CANCELLED
	            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	                return state | STATE_CANCELLED;
	            } else if (isRecognized || isValid) {
	                if (eventType & INPUT_END) {
	                    return state | STATE_ENDED;
	                } else if (!(state & STATE_BEGAN)) {
	                    return STATE_BEGAN;
	                }
	                return state | STATE_CHANGED;
	            }
	            return STATE_FAILED;
	        }
	    });
	
	    /**
	     * Pan
	     * Recognized when the pointer is down and moved in the allowed direction.
	     * @constructor
	     * @extends AttrRecognizer
	     */
	    function PanRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	
	        this.pX = null;
	        this.pY = null;
	    }
	
	    inherit(PanRecognizer, AttrRecognizer, {
	        /**
	         * @namespace
	         * @memberof PanRecognizer
	         */
	        defaults: {
	            event: 'pan',
	            threshold: 10,
	            pointers: 1,
	            direction: DIRECTION_ALL
	        },
	
	        getTouchAction: function getTouchAction() {
	            var direction = this.options.direction;
	            var actions = [];
	            if (direction & DIRECTION_HORIZONTAL) {
	                actions.push(TOUCH_ACTION_PAN_Y);
	            }
	            if (direction & DIRECTION_VERTICAL) {
	                actions.push(TOUCH_ACTION_PAN_X);
	            }
	            return actions;
	        },
	
	        directionTest: function directionTest(input) {
	            var options = this.options;
	            var hasMoved = true;
	            var distance = input.distance;
	            var direction = input.direction;
	            var x = input.deltaX;
	            var y = input.deltaY;
	
	            // lock to axis?
	            if (!(direction & options.direction)) {
	                if (options.direction & DIRECTION_HORIZONTAL) {
	                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                    hasMoved = x != this.pX;
	                    distance = Math.abs(input.deltaX);
	                } else {
	                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	                    hasMoved = y != this.pY;
	                    distance = Math.abs(input.deltaY);
	                }
	            }
	            input.direction = direction;
	            return hasMoved && distance > options.threshold && direction & options.direction;
	        },
	
	        attrTest: function attrTest(input) {
	            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
	        },
	
	        emit: function emit(input) {
	
	            this.pX = input.deltaX;
	            this.pY = input.deltaY;
	
	            var direction = directionStr(input.direction);
	
	            if (direction) {
	                input.additionalEvent = this.options.event + direction;
	            }
	            this._super.emit.call(this, input);
	        }
	    });
	
	    /**
	     * Pinch
	     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	     * @constructor
	     * @extends AttrRecognizer
	     */
	    function PinchRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }
	
	    inherit(PinchRecognizer, AttrRecognizer, {
	        /**
	         * @namespace
	         * @memberof PinchRecognizer
	         */
	        defaults: {
	            event: 'pinch',
	            threshold: 0,
	            pointers: 2
	        },
	
	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_NONE];
	        },
	
	        attrTest: function attrTest(input) {
	            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	        },
	
	        emit: function emit(input) {
	            if (input.scale !== 1) {
	                var inOut = input.scale < 1 ? 'in' : 'out';
	                input.additionalEvent = this.options.event + inOut;
	            }
	            this._super.emit.call(this, input);
	        }
	    });
	
	    /**
	     * Press
	     * Recognized when the pointer is down for x ms without any movement.
	     * @constructor
	     * @extends Recognizer
	     */
	    function PressRecognizer() {
	        Recognizer.apply(this, arguments);
	
	        this._timer = null;
	        this._input = null;
	    }
	
	    inherit(PressRecognizer, Recognizer, {
	        /**
	         * @namespace
	         * @memberof PressRecognizer
	         */
	        defaults: {
	            event: 'press',
	            pointers: 1,
	            time: 251, // minimal time of the pointer to be pressed
	            threshold: 9 // a minimal movement is ok, but keep it low
	        },
	
	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_AUTO];
	        },
	
	        process: function process(input) {
	            var options = this.options;
	            var validPointers = input.pointers.length === options.pointers;
	            var validMovement = input.distance < options.threshold;
	            var validTime = input.deltaTime > options.time;
	
	            this._input = input;
	
	            // we only allow little movement
	            // and we've reached an end event, so a tap is possible
	            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
	                this.reset();
	            } else if (input.eventType & INPUT_START) {
	                this.reset();
	                this._timer = setTimeoutContext(function () {
	                    this.state = STATE_RECOGNIZED;
	                    this.tryEmit();
	                }, options.time, this);
	            } else if (input.eventType & INPUT_END) {
	                return STATE_RECOGNIZED;
	            }
	            return STATE_FAILED;
	        },
	
	        reset: function reset() {
	            clearTimeout(this._timer);
	        },
	
	        emit: function emit(input) {
	            if (this.state !== STATE_RECOGNIZED) {
	                return;
	            }
	
	            if (input && input.eventType & INPUT_END) {
	                this.manager.emit(this.options.event + 'up', input);
	            } else {
	                this._input.timeStamp = now();
	                this.manager.emit(this.options.event, this._input);
	            }
	        }
	    });
	
	    /**
	     * Rotate
	     * Recognized when two or more pointer are moving in a circular motion.
	     * @constructor
	     * @extends AttrRecognizer
	     */
	    function RotateRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }
	
	    inherit(RotateRecognizer, AttrRecognizer, {
	        /**
	         * @namespace
	         * @memberof RotateRecognizer
	         */
	        defaults: {
	            event: 'rotate',
	            threshold: 0,
	            pointers: 2
	        },
	
	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_NONE];
	        },
	
	        attrTest: function attrTest(input) {
	            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	        }
	    });
	
	    /**
	     * Swipe
	     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	     * @constructor
	     * @extends AttrRecognizer
	     */
	    function SwipeRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }
	
	    inherit(SwipeRecognizer, AttrRecognizer, {
	        /**
	         * @namespace
	         * @memberof SwipeRecognizer
	         */
	        defaults: {
	            event: 'swipe',
	            threshold: 10,
	            velocity: 0.3,
	            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	            pointers: 1
	        },
	
	        getTouchAction: function getTouchAction() {
	            return PanRecognizer.prototype.getTouchAction.call(this);
	        },
	
	        attrTest: function attrTest(input) {
	            var direction = this.options.direction;
	            var velocity;
	
	            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	                velocity = input.overallVelocity;
	            } else if (direction & DIRECTION_HORIZONTAL) {
	                velocity = input.overallVelocityX;
	            } else if (direction & DIRECTION_VERTICAL) {
	                velocity = input.overallVelocityY;
	            }
	
	            return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	        },
	
	        emit: function emit(input) {
	            var direction = directionStr(input.offsetDirection);
	            if (direction) {
	                this.manager.emit(this.options.event + direction, input);
	            }
	
	            this.manager.emit(this.options.event, input);
	        }
	    });
	
	    /**
	     * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	     * a single tap.
	     *
	     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	     * multi-taps being recognized.
	     * @constructor
	     * @extends Recognizer
	     */
	    function TapRecognizer() {
	        Recognizer.apply(this, arguments);
	
	        // previous time and center,
	        // used for tap counting
	        this.pTime = false;
	        this.pCenter = false;
	
	        this._timer = null;
	        this._input = null;
	        this.count = 0;
	    }
	
	    inherit(TapRecognizer, Recognizer, {
	        /**
	         * @namespace
	         * @memberof PinchRecognizer
	         */
	        defaults: {
	            event: 'tap',
	            pointers: 1,
	            taps: 1,
	            interval: 300, // max time between the multi-tap taps
	            time: 250, // max time of the pointer to be down (like finger on the screen)
	            threshold: 9, // a minimal movement is ok, but keep it low
	            posThreshold: 10 // a multi-tap can be a bit off the initial position
	        },
	
	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_MANIPULATION];
	        },
	
	        process: function process(input) {
	            var options = this.options;
	
	            var validPointers = input.pointers.length === options.pointers;
	            var validMovement = input.distance < options.threshold;
	            var validTouchTime = input.deltaTime < options.time;
	
	            this.reset();
	
	            if (input.eventType & INPUT_START && this.count === 0) {
	                return this.failTimeout();
	            }
	
	            // we only allow little movement
	            // and we've reached an end event, so a tap is possible
	            if (validMovement && validTouchTime && validPointers) {
	                if (input.eventType != INPUT_END) {
	                    return this.failTimeout();
	                }
	
	                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
	                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
	
	                this.pTime = input.timeStamp;
	                this.pCenter = input.center;
	
	                if (!validMultiTap || !validInterval) {
	                    this.count = 1;
	                } else {
	                    this.count += 1;
	                }
	
	                this._input = input;
	
	                // if tap count matches we have recognized it,
	                // else it has began recognizing...
	                var tapCount = this.count % options.taps;
	                if (tapCount === 0) {
	                    // no failing requirements, immediately trigger the tap event
	                    // or wait as long as the multitap interval to trigger
	                    if (!this.hasRequireFailures()) {
	                        return STATE_RECOGNIZED;
	                    } else {
	                        this._timer = setTimeoutContext(function () {
	                            this.state = STATE_RECOGNIZED;
	                            this.tryEmit();
	                        }, options.interval, this);
	                        return STATE_BEGAN;
	                    }
	                }
	            }
	            return STATE_FAILED;
	        },
	
	        failTimeout: function failTimeout() {
	            this._timer = setTimeoutContext(function () {
	                this.state = STATE_FAILED;
	            }, this.options.interval, this);
	            return STATE_FAILED;
	        },
	
	        reset: function reset() {
	            clearTimeout(this._timer);
	        },
	
	        emit: function emit() {
	            if (this.state == STATE_RECOGNIZED) {
	                this._input.tapCount = this.count;
	                this.manager.emit(this.options.event, this._input);
	            }
	        }
	    });
	
	    /**
	     * Simple way to create a manager with a default set of recognizers.
	     * @param {HTMLElement} element
	     * @param {Object} [options]
	     * @constructor
	     */
	    function Hammer(element, options) {
	        options = options || {};
	        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	        return new Manager(element, options);
	    }
	
	    /**
	     * @const {string}
	     */
	    Hammer.VERSION = '2.0.7';
	
	    /**
	     * default settings
	     * @namespace
	     */
	    Hammer.defaults = {
	        /**
	         * set if DOM events are being triggered.
	         * But this is slower and unused by simple implementations, so disabled by default.
	         * @type {Boolean}
	         * @default false
	         */
	        domEvents: false,
	
	        /**
	         * The value for the touchAction property/fallback.
	         * When set to `compute` it will magically set the correct value based on the added recognizers.
	         * @type {String}
	         * @default compute
	         */
	        touchAction: TOUCH_ACTION_COMPUTE,
	
	        /**
	         * @type {Boolean}
	         * @default true
	         */
	        enable: true,
	
	        /**
	         * EXPERIMENTAL FEATURE -- can be removed/changed
	         * Change the parent input target element.
	         * If Null, then it is being set the to main element.
	         * @type {Null|EventTarget}
	         * @default null
	         */
	        inputTarget: null,
	
	        /**
	         * force an input class
	         * @type {Null|Function}
	         * @default null
	         */
	        inputClass: null,
	
	        /**
	         * Default recognizer setup when calling `Hammer()`
	         * When creating a new Manager these will be skipped.
	         * @type {Array}
	         */
	        preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],
	
	        /**
	         * Some CSS properties can be used to improve the working of Hammer.
	         * Add them to this method and they will be set when creating a new Manager.
	         * @namespace
	         */
	        cssProps: {
	            /**
	             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	             * @type {String}
	             * @default 'none'
	             */
	            userSelect: 'none',
	
	            /**
	             * Disable the Windows Phone grippers when pressing an element.
	             * @type {String}
	             * @default 'none'
	             */
	            touchSelect: 'none',
	
	            /**
	             * Disables the default callout shown when you touch and hold a touch target.
	             * On iOS, when you touch and hold a touch target such as a link, Safari displays
	             * a callout containing information about the link. This property allows you to disable that callout.
	             * @type {String}
	             * @default 'none'
	             */
	            touchCallout: 'none',
	
	            /**
	             * Specifies whether zooming is enabled. Used by IE10>
	             * @type {String}
	             * @default 'none'
	             */
	            contentZooming: 'none',
	
	            /**
	             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	             * @type {String}
	             * @default 'none'
	             */
	            userDrag: 'none',
	
	            /**
	             * Overrides the highlight color shown when the user taps a link or a JavaScript
	             * clickable element in iOS. This property obeys the alpha value, if specified.
	             * @type {String}
	             * @default 'rgba(0,0,0,0)'
	             */
	            tapHighlightColor: 'rgba(0,0,0,0)'
	        }
	    };
	
	    var STOP = 1;
	    var FORCED_STOP = 2;
	
	    /**
	     * Manager
	     * @param {HTMLElement} element
	     * @param {Object} [options]
	     * @constructor
	     */
	    function Manager(element, options) {
	        this.options = assign({}, Hammer.defaults, options || {});
	
	        this.options.inputTarget = this.options.inputTarget || element;
	
	        this.handlers = {};
	        this.session = {};
	        this.recognizers = [];
	        this.oldCssProps = {};
	
	        this.element = element;
	        this.input = createInputInstance(this);
	        this.touchAction = new TouchAction(this, this.options.touchAction);
	
	        toggleCssProps(this, true);
	
	        each(this.options.recognizers, function (item) {
	            var recognizer = this.add(new item[0](item[1]));
	            item[2] && recognizer.recognizeWith(item[2]);
	            item[3] && recognizer.requireFailure(item[3]);
	        }, this);
	    }
	
	    Manager.prototype = {
	        /**
	         * set options
	         * @param {Object} options
	         * @returns {Manager}
	         */
	        set: function set(options) {
	            assign(this.options, options);
	
	            // Options that need a little more setup
	            if (options.touchAction) {
	                this.touchAction.update();
	            }
	            if (options.inputTarget) {
	                // Clean up existing event listeners and reinitialize
	                this.input.destroy();
	                this.input.target = options.inputTarget;
	                this.input.init();
	            }
	            return this;
	        },
	
	        /**
	         * stop recognizing for this session.
	         * This session will be discarded, when a new [input]start event is fired.
	         * When forced, the recognizer cycle is stopped immediately.
	         * @param {Boolean} [force]
	         */
	        stop: function stop(force) {
	            this.session.stopped = force ? FORCED_STOP : STOP;
	        },
	
	        /**
	         * run the recognizers!
	         * called by the inputHandler function on every movement of the pointers (touches)
	         * it walks through all the recognizers and tries to detect the gesture that is being made
	         * @param {Object} inputData
	         */
	        recognize: function recognize(inputData) {
	            var session = this.session;
	            if (session.stopped) {
	                return;
	            }
	
	            // run the touch-action polyfill
	            this.touchAction.preventDefaults(inputData);
	
	            var recognizer;
	            var recognizers = this.recognizers;
	
	            // this holds the recognizer that is being recognized.
	            // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	            // if no recognizer is detecting a thing, it is set to `null`
	            var curRecognizer = session.curRecognizer;
	
	            // reset when the last recognizer is recognized
	            // or when we're in a new session
	            if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
	                curRecognizer = session.curRecognizer = null;
	            }
	
	            var i = 0;
	            while (i < recognizers.length) {
	                recognizer = recognizers[i];
	
	                // find out if we are allowed try to recognize the input for this one.
	                // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	                // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	                //      that is being recognized.
	                // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	                //      this can be setup with the `recognizeWith()` method on the recognizer.
	                if (session.stopped !== FORCED_STOP && ( // 1
	                !curRecognizer || recognizer == curRecognizer || // 2
	                recognizer.canRecognizeWith(curRecognizer))) {
	                    // 3
	                    recognizer.recognize(inputData);
	                } else {
	                    recognizer.reset();
	                }
	
	                // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	                // current active recognizer. but only if we don't already have an active recognizer
	                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                    curRecognizer = session.curRecognizer = recognizer;
	                }
	                i++;
	            }
	        },
	
	        /**
	         * get a recognizer by its event name.
	         * @param {Recognizer|String} recognizer
	         * @returns {Recognizer|Null}
	         */
	        get: function get(recognizer) {
	            if (recognizer instanceof Recognizer) {
	                return recognizer;
	            }
	
	            var recognizers = this.recognizers;
	            for (var i = 0; i < recognizers.length; i++) {
	                if (recognizers[i].options.event == recognizer) {
	                    return recognizers[i];
	                }
	            }
	            return null;
	        },
	
	        /**
	         * add a recognizer to the manager
	         * existing recognizers with the same event name will be removed
	         * @param {Recognizer} recognizer
	         * @returns {Recognizer|Manager}
	         */
	        add: function add(recognizer) {
	            if (invokeArrayArg(recognizer, 'add', this)) {
	                return this;
	            }
	
	            // remove existing
	            var existing = this.get(recognizer.options.event);
	            if (existing) {
	                this.remove(existing);
	            }
	
	            this.recognizers.push(recognizer);
	            recognizer.manager = this;
	
	            this.touchAction.update();
	            return recognizer;
	        },
	
	        /**
	         * remove a recognizer by name or instance
	         * @param {Recognizer|String} recognizer
	         * @returns {Manager}
	         */
	        remove: function remove(recognizer) {
	            if (invokeArrayArg(recognizer, 'remove', this)) {
	                return this;
	            }
	
	            recognizer = this.get(recognizer);
	
	            // let's make sure this recognizer exists
	            if (recognizer) {
	                var recognizers = this.recognizers;
	                var index = inArray(recognizers, recognizer);
	
	                if (index !== -1) {
	                    recognizers.splice(index, 1);
	                    this.touchAction.update();
	                }
	            }
	
	            return this;
	        },
	
	        /**
	         * bind event
	         * @param {String} events
	         * @param {Function} handler
	         * @returns {EventEmitter} this
	         */
	        on: function on(events, handler) {
	            if (events === undefined) {
	                return;
	            }
	            if (handler === undefined) {
	                return;
	            }
	
	            var handlers = this.handlers;
	            each(splitStr(events), function (event) {
	                handlers[event] = handlers[event] || [];
	                handlers[event].push(handler);
	            });
	            return this;
	        },
	
	        /**
	         * unbind event, leave emit blank to remove all handlers
	         * @param {String} events
	         * @param {Function} [handler]
	         * @returns {EventEmitter} this
	         */
	        off: function off(events, handler) {
	            if (events === undefined) {
	                return;
	            }
	
	            var handlers = this.handlers;
	            each(splitStr(events), function (event) {
	                if (!handler) {
	                    delete handlers[event];
	                } else {
	                    handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	                }
	            });
	            return this;
	        },
	
	        /**
	         * emit event to the listeners
	         * @param {String} event
	         * @param {Object} data
	         */
	        emit: function emit(event, data) {
	            // we also want to trigger dom events
	            if (this.options.domEvents) {
	                triggerDomEvent(event, data);
	            }
	
	            // no handlers, so skip it all
	            var handlers = this.handlers[event] && this.handlers[event].slice();
	            if (!handlers || !handlers.length) {
	                return;
	            }
	
	            data.type = event;
	            data.preventDefault = function () {
	                data.srcEvent.preventDefault();
	            };
	
	            var i = 0;
	            while (i < handlers.length) {
	                handlers[i](data);
	                i++;
	            }
	        },
	
	        /**
	         * destroy the manager and unbinds all events
	         * it doesn't unbind dom events, that is the user own responsibility
	         */
	        destroy: function destroy() {
	            this.element && toggleCssProps(this, false);
	
	            this.handlers = {};
	            this.session = {};
	            this.input.destroy();
	            this.element = null;
	        }
	    };
	
	    /**
	     * add/remove the css properties as defined in manager.options.cssProps
	     * @param {Manager} manager
	     * @param {Boolean} add
	     */
	    function toggleCssProps(manager, add) {
	        var element = manager.element;
	        if (!element.style) {
	            return;
	        }
	        var prop;
	        each(manager.options.cssProps, function (value, name) {
	            prop = prefixed(element.style, name);
	            if (add) {
	                manager.oldCssProps[prop] = element.style[prop];
	                element.style[prop] = value;
	            } else {
	                element.style[prop] = manager.oldCssProps[prop] || '';
	            }
	        });
	        if (!add) {
	            manager.oldCssProps = {};
	        }
	    }
	
	    /**
	     * trigger dom event
	     * @param {String} event
	     * @param {Object} data
	     */
	    function triggerDomEvent(event, data) {
	        var gestureEvent = document.createEvent('Event');
	        gestureEvent.initEvent(event, true, true);
	        gestureEvent.gesture = data;
	        data.target.dispatchEvent(gestureEvent);
	    }
	
	    assign(Hammer, {
	        INPUT_START: INPUT_START,
	        INPUT_MOVE: INPUT_MOVE,
	        INPUT_END: INPUT_END,
	        INPUT_CANCEL: INPUT_CANCEL,
	
	        STATE_POSSIBLE: STATE_POSSIBLE,
	        STATE_BEGAN: STATE_BEGAN,
	        STATE_CHANGED: STATE_CHANGED,
	        STATE_ENDED: STATE_ENDED,
	        STATE_RECOGNIZED: STATE_RECOGNIZED,
	        STATE_CANCELLED: STATE_CANCELLED,
	        STATE_FAILED: STATE_FAILED,
	
	        DIRECTION_NONE: DIRECTION_NONE,
	        DIRECTION_LEFT: DIRECTION_LEFT,
	        DIRECTION_RIGHT: DIRECTION_RIGHT,
	        DIRECTION_UP: DIRECTION_UP,
	        DIRECTION_DOWN: DIRECTION_DOWN,
	        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	        DIRECTION_ALL: DIRECTION_ALL,
	
	        Manager: Manager,
	        Input: Input,
	        TouchAction: TouchAction,
	
	        TouchInput: TouchInput,
	        MouseInput: MouseInput,
	        PointerEventInput: PointerEventInput,
	        TouchMouseInput: TouchMouseInput,
	        SingleTouchInput: SingleTouchInput,
	
	        Recognizer: Recognizer,
	        AttrRecognizer: AttrRecognizer,
	        Tap: TapRecognizer,
	        Pan: PanRecognizer,
	        Swipe: SwipeRecognizer,
	        Pinch: PinchRecognizer,
	        Rotate: RotateRecognizer,
	        Press: PressRecognizer,
	
	        on: addEventListeners,
	        off: removeEventListeners,
	        each: each,
	        merge: merge,
	        extend: extend,
	        assign: assign,
	        inherit: inherit,
	        bindFn: bindFn,
	        prefixed: prefixed
	    });
	
	    // this prevents errors when Hammer is loaded in the presence of an AMD
	    //  style loader but by script tag, not by the loader.
	    var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line
	    freeGlobal.Hammer = Hammer;
	
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return Hammer;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module != 'undefined' && module.exports) {
	        module.exports = Hammer;
	    } else {
	        window[exportName] = Hammer;
	    }
	})(window, document, 'Hammer');

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./Gallery.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/less-loader/index.js!./Gallery.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, ".gallery {\n  height: 250px;\n  background-color: black;\n  position: relative;\n  overflow: hidden;\n}\n.gallery.fullscreen {\n  position: fixed;\n  z-index: 100;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n  height: auto;\n}\n.gallery .forward-nav-icon,\n.gallery .back-nav-icon {\n  position: absolute;\n  top: 0px;\n  bottom: 22px;\n  margin: auto;\n  width: 30px;\n  height: 30px;\n  opacity: .5;\n  z-index: 3;\n}\n.gallery .forward-nav-icon:hover,\n.gallery .back-nav-icon:hover {\n  opacity: .75;\n}\n.gallery .forward-nav-icon {\n  right: 15px;\n}\n.gallery .back-nav-icon {\n  left: 15px;\n}\n.gallery .status-bar {\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n  height: 22px;\n  text-align: center;\n  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#45484d+0,000000+100;Black+3D+%231 */\n  background: #45484d;\n  /* Old browsers */\n  background: -moz-linear-gradient(top, #45484d 0%, #000000 100%);\n  /* FF3.6-15 */\n  background: -webkit-linear-gradient(top, #45484d 0%, #000000 100%);\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(to bottom, #45484d 0%, #000000 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#45484d', endColorstr='#000000', GradientType=0);\n  /* IE6-9 */\n  -webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);\n  -moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);\n  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);\n  z-index: 2;\n  color: white;\n  padding: 5px;\n  font-size: 12px;\n  box-sizing: border-box;\n}\n.gallery .status-bar .fullscreen-icon {\n  position: absolute;\n  right: 5px;\n  top: 5px;\n  height: 12px;\n}\n.gallery .status-bar .navigation-status {\n  position: absolute;\n  left: 5px;\n  top: 5px;\n}\n.gallery .gallery-content {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 22px;\n  width: 100%;\n  overflow: hidden;\n  transition: left .5s;\n  white-space: nowrap;\n  z-index: 1;\n  overflow: visible;\n}\n.gallery .gallery-content > * {\n  width: 100%;\n  height: 100%;\n  display: inline-block;\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center center;\n  vertical-align: top;\n  position: relative;\n  overflow: hidden;\n}\n.gallery .gallery-content > * iframe {\n  width: 100%;\n  height: 100%;\n}\n.gallery .gallery-content > * img {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  transform: translate3d(0, 0, 0);\n}\n", ""]);
	
	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AsaAwAF4Mh9HgAABARJREFUeNrt3Uly00AAheEnLUnOkCr2cIMMBwCuQ7FgUOBKJFmRiTPANhRXIGH72DhVxuXYbbu71a3+3z6K5f+DAg+SPO4+qfHZHsYMIOK3jWAsAB/JXgYCEb9tBCJ+2whyAvhA3vIQiPhtI8gB4D05y0Ug4reNQMRvG0Fn2wke852kl13XPZAvCoB9ST8kHcQ+dp/oMT+XdGZ7j3xR4l+kiJ8SgCSdgCBa/MNUv6NPfA4gKDh+DgAgKDh+LgAgKDR+TgCPCM5BUE783AAk6RgE5cQfAwAICoo/FgAQFBJ/TAAgKCD+pgB+gaCa+HexAXyQ9ELSLQiKj385a3Ua+mCC39WzvWf7JtEbUzctILC9b/t7oufwm+1nc79r2PXt4PdLTiAlgtspI8gZPxSBtvkYFwjqiB+CQNt+hg8EdcRfh0C7fHQbBHXEX4VAu35uHwSjxb/cJP5TCBTjSxszBLcgKDv+MgSK9UXNDAj2ib97/EUEivktXRDUEX8eQYonoFkENcVP/UQ0h4D4DSMg/uonZtIIEse/qjZ+JgTnBZzfBfHHQfDH9mEB53Y0eyzEz4igiPiJEEwvfmQERcWPjGC68SMhKDL+AoJ74qf5l3PR8XdE0E78LRFUEX9LBNfNxd8QQVXx587tOABBu/EDEVQZPxAB8dcgqDr+GgTEX4NgEvHnzu1kDgHx1yC4mFL8BQRnxGeMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxljVa+QCEdw1fUX8Vi4RA4IV8ecvEnU0sfgGQVj8SSB4Ij4IAuNXjWBNfBBscanYo4nFbxfBlheLvq8BwYbx20Ow4z12ikawZfx2EES6wdK97eOJxZ8+gsh31yoKQaT400WQ6NZqRSCIHH96CBLfV+9rAed3lujc6keQOH4RV92e3SH1GgQNxgcB8UFA/MoR2B6I3yYC24NmBx4Kj1/VffVqQGB7sG3NHXggfhsIbJ8+HkgLBx6IP20E8/GXAdgIAfHrQrAY/ykAQQiIXxcC25+X/bBWHHgg/jQQPBV/HYClCIhfFwLbX1b9kAIOPGSKf9nCTRVzIlgXPxSAZ/9nJH5FCELi23Zn24GP+7ekgwTPx5Wk113X/VVDm/1JPZN0kuDwwa02ASDiV4UgaD3xx1vXdQ+SXkm6aQ1A8/FLQdATv20EuQFcEr8sBH3m+G+IXxaCnvhtI+iJ3zaCnvhtI+iJ3zaCVK8E3kl6Qfw4m71i+FMJXopP9TfAc0lvSRdt75TmfRjJaTfQbuc+X1IGSg0ABAXHzwUABNvF/5wjTC4AICgwfm4AIAiLf5ozSG4AICgo/lgAQFBI/DEBgOD/+MNYEcYEAIKR49v2P+3gnsQIuDnGAAAAAElFTkSuQmCC"

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AsaAxgoJwy5MgAABuZJREFUeNrtnVtsFFUcxn/TbYHS1opGVGgqFaUIEfFCBIEioIBCvLxgNBp9wki8ocaYoE8YEqMGjYYHA0YJMaK+aALyYg1qFpE2EQhKUauCKHIRCuUmlPHhnDUtdPYyO7sz55z/l3zpA1l2Z37fnOucczzslgdcBjRrjwaagHqgTrtW/60BTgFHgW79N+M/gI5e/hU4Y8sNskn1QAswA5isgdeV4HtOA78AbUCr9u8SgPKrEpgG3Kah3wRUxPRbOnuFYR3Qhahkug54HdgL+An0SWANMBeoElzRaCjwLLAlodCDvA94AxgvCMOpEXgLOGEY+P68HpgqSPPT1cBK3eDyLfNXwGwLG+GRaDiwGuixEPy53qx7LSLdWHpG97t9x/w+cKnL8KcAWx0E39uHgYVAyiXwtcAKx8Gf6zZgjAvwx+lhVYF+vo8Bj9gK3gMWWNKtK0fboMYm+HXABwK2IP8IXGsD/GHS0AvtbmCWyfBHoaZQBWZ4nwYeMBH+jXo8XCBG46dMgj/T0YGdUntpVMPIpRx0aNGTH4NlkDNyTdUjp61J7uMflie15H4yifCbgL8ETtl8f5LgDwV+Eihl9b9J6SIOBDYJkNjGCcbGHYA3BUSs/iHOYeN7BUAi/F4c3cAm4HNgkPTOYtd41PqE78v1hQOA7+TJS5SPF9IeKHYRxQvABHnwEqVq1DRyXqV7MVXASOBD1OocUbI0DLVopq1UX+ABa6W4Tfw7hiV70VRa/ea8URS5aoBdDt3EJUDa4N8f+bqDxQ7Bf9HXMjgEm4lwBVINcMA1+BaEILK5gkWuwjc8BBuimuzZ4zJ8w0NQ9KrkRwW+0SFYXwz8CuBngW98CEJvUtEi8ANDYNKDsSxsAFYI/H7hP27Ytf5NiD2LqlE7Xgl8s+FnPLfQANwn8K2B7+sJvIK0VuBbAz+zhd2F+cKvw75NmlyGX/Cr5HcIfOvg+8A7+QbgVYFvHfxM1zUvtQt86+Bn3JgL/hDgrMC3dvzj4VwBuEfgWz36uSpXAF4W+FZ7e64AfCzwrfapXG+FbxX41ntktunfEwLfet8ZFIARAt8JLwpaGtZs2EqYl3zfXxJqhYvnPYE6kMJFNQcFoEHgO6GGoADUCnwnVFeRZRZQ4EsABL4EQOBbHYCgf1glXT03DqYIWjS4BpifsLTu8n2/McwHe3p6fqusrKzG8YOZ+tHZoCrgWAJ/bKPneRvDfDCVSo1AnS28T5j3UXdQAI4m9AdPChsC3/e3A9MlBH05mxYACUG0OhIUgO6E/3AJgcMlgISgDAHoMuQCJATFqSsoAJ0GXYSEILw6gwLQYdiFSAjCqSMoAAe1JQSOBgBgh4EXJCEoTDuyBaDD0IuSEOSnQ8AB20oACUEBTz/gZwvAN4ZfoIQgu3LyrcKOUz/TRUwhj0Htq2PjVPCcfFJiy+4gEoLzD6KuhdwnhrRaUtxJddBXm9DzPbkC8KVFFy0hCME1Bey3rPiT6gCmFZKWty1sALkcgt30WhWcz6lhq7BPLlcHq4GeQj7g6VFBX0oCK0qCMb3h5lMC+JaWAi6WBO2oM4YLCkCm2EBCcJ7qUXspm6KiHuR12L1IIl1gFTAJOGLQ9R0DLi4mAFOwf6VM2lL4PvBaFEXIBtdDYCj8k8DlUQTgdtxYM5e2CL4PLI+qEeHhznHxaUvgn0bt+RSZ5jkSgP9DYDB8H3XcT6Ry7eTwdoPhH6JEK6KvxMx9BF3zY/nM9oXRIf3Z6YiSqjYdAD9XcR5Wg4BtwFVyrxMnH7gZdXJ4VlUU8SUngYVyrxOp5fnAL6YKyKgT9W7ZLXLPE6NtqO19zpTrC6uAjdLgSoS7gdFxpO4K4B8BELsfjLPouVsAxOqVYaClIgxABzAAmCrVcCxdvvl62DdWecC78jSW1TuBS5KUxkrgMwFTFv9JxBM9UWkwavGhQCqdDwPjklwvDQG2CKiS+DjQYkLjZIiUBJH7IDDRpBZqNfCpgIvEu4BrTOymVOp+qkAs7qTPBgyWBywRkKG8AbjIlkGLeboeE7D5eakuQa1SI5AWuFm9H5ht8/BlFfCKgA4s8oe7Mo49E3tXH4eZzn3OxiI/lwYCi3H7RdOPTG/lR6EmB+cRdgKzZEKzr+Y40EjcAzytSz9RwLjBdOALy8B3AgsEfGGaqKuGs4aP5D3kYgMvSjUAz+ubaQL0A6ijaidQ3BoMUT/Vww3AMmBvwqCfAD4B7kK9Ipf4G2lDGMaiTgadAdyK2runXDqD2nq1Vftb1KIZY26ebUoB1wOTUe/IN2sPi+D/PqIHrTJuB74m+ecsOhWAIF0AjEKtbK5HHZ3e27X6yT3aj3dr4Jl9AUUikUgkEolEInP1H63zhLCQhPDCAAAAAElFTkSuQmCC"

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AsaAxg61LXIegAABr9JREFUeNrtnX1oVlUcxz93m3PqphYZ5ltTrGlpZaaSaw4HaiRUf/VChH9EkkZvDPpDmYJkURSKZP+46EUCK4KUTIMypexlLugdLbQUzdRqzm2aS3f6456Jc899Xu5z7/Pcc87vC19E4fHh3s/33nPO75znHA/7NRKoASbpP8cDw4Cqi1wJDAHOAp1AxyU+AuwF9mn/Bpy34eZ4lsEeCtQDc4FaDX1oDN/TDewHWoFPgU+AQxKAwqtUA58HNADT9b8VQweAHToMHwKnEMWmG4CXgKOASqDPAG8DC4EywRWNRgCNwHcJhR7kY8Ba4EZBGE5jgXXAacPAp/I24DZBmp0mAs26w6Us8y5gviBOrVHARuCcheAvdQtQJ8h9lQFP6d6zcsxvAFe6DL/WwM5d1G4DlgIlLoEfAmwAehyHf7H3AJNdgD9Vl1cFen93Aotshv+wJcO6uP06MNgm8JXAWwI2J/8MTLEB/lXS0QvtDj3fYayuwZ8sEZjh3Q3cbyL8m3U9XCDm7x7gcZPgNzha2Inbz0YFKM658zpgux7ri6K/t+X46w8SO8Zvkyc1dj+WRPjVwB8Cp2B9gvuSBH8E8IuAKajPJmWIWA58JUCKVie4vtgBWCsgiuqfilk2vlsAJMKvFWMYWI2/1q1CRmdF103A77rkXhANAL6WJy9R7gKuK1QAmuSGJ3ZRSUncTcAEYBPyw4ckapSef2mN80s+kCct8WsMY1toKr1+c1YURa7BwEFDb8hJYIkunLhSKo78dwfLDIY/QymlgNkOhaAl6qf/hMnwe+VYCCKbK3jSwItvB2aqFHIoBLuimuw5bAt8B0OQ96+SF9sG37EQbMsHvgf8ahj8WSoHORKC0JtUzDHsQutVCDkQgjVhA9Bs2IVuVyFleQj+DFO6r9DDKCUhsMJ35BqAew2+WAlBf2/KNQBbDb9gCUH/LeyGZQu/Ejs2aZIQ9PWFpeSZFg3U6VU/pmuB53kfhfmgUmo3sAB/0wZb1JBtABosumgJQQiurRZ2gqQ58D02E/zh+FuiKwmBlSFYlKkJqMfeLcukOdDNQDrAt2C3XA/B9EwBqMF+uRyCiUCJ6wFwOQQDgeqgAHj4GzshIbA6BDVBARgHDMItuRiCwADU4KZcC0FgAMbgrlwKwZigAFThtlwJQVVQACoRuRCCKnkDuB0CCYDjIZAAOB6CwACUC/OUIbgrjxC8l8BrqggKQJfw7qdHlVKbw3zQ87zVJPMImM6gAHQI737w1+cBf3lCr6sjKACdwtx6+GkDIG8A++EDnJIAuAs/7RugXeBbDx+gPSgABwS+9fDTcr4cN7dVW5rHauFnDLzeh9Kl44TAtxp+xm1jPhf4VsNX+Ce8BKpZ4FsN/29Ivyx8r3T4rOrw5cz3VnnyrXzye/1CpgCUYe+pn67DV8Dt2bwmtgp8K+F3k+WJro0C3zr4So/wstI0gW8dfAWsyjYAJcBxgW9dMzgnl+HCywLfKh8ix30fZgp8q/xc2KKBwLfDk8MEYLnAt8KtqTp52Wij/g9MUajj0iwo72bSm/l82LSi0Ep58vu4U6/zCK1aAy96pcC/4BejeIXsNPDCVwh8zgAjowjAPENvwAqH4StgfZQdCVOPi29yFH43cHWUAVho8M1ocgy+AjbEMZww+eTwXQ7B/4eYThAfD5x2bNWwiV6SCWRpyACc1EWkuYiSqlbgkUwFPC+PLxgI/IBbO4qaoh5gVqrSb9hScCqdBZYaViJ2Ra9kAz+fJqBXB/C3lJst9zwx+h64BzhXqC8sA76QDlci3EGRtvkdh/9LE4FQXD9QzFfPnQKgqG4OA600wgDswz9jcI40wwXXnkK3++n0qjyNBfU+4IokpbEU2CxgCuIjRDzRE5UGAZ8JoFjdBkxNcrs0HPhWQMXiLvxznROv4fImiNx/6TKvMaoA3hdwkfggMMnEYUop7mw5E5d/BEabPl5dpWeqBGhu3glcZkvRYqFuxwRsZvcAqyMu2CVCY4HdAjitjwPzbS5flgHPS5MQ+Mof5UoduwEzf30c13Ruo42v/EwqB5bh9kLTd2zo5eeramCLg5M582RCs68WONBJPAw8gZzQllZzgY8tA78fWCzgc9Ms/Cnm84ZX8h50sYMXpUYDT+ubaQL0E8A6YIagi17TgDXA0YRBPw28i79GckDSb6JnSRim6HpCA1CPPw1dKP0HtAA7tL/E/9GMEfIsfDOU6LdDLf7UaY12FGPsdj1s6/U3+OsdjD1q18YABKkKuBaYAAzTf7/YlcC/uhp3qQ/rauUxaXlFIpFIJBKJRMbrfzFZrDhUvXf8AAAAAElFTkSuQmCC"

/***/ }
/******/ ]);
//# sourceMappingURL=easy-gallery.js.map