/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||function(doc,undefined){var bool,docElem=doc.documentElement,refNode=docElem.firstElementChild||docElem.firstChild,fakeBody=doc.createElement("body"),div=doc.createElement("div");div.id="mq-test-1";div.style.cssText="position:absolute;top:-100em";fakeBody.style.background="none";fakeBody.appendChild(div);return function(q){div.innerHTML='&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';docElem.insertBefore(fakeBody,refNode);bool=div.offsetWidth==
42;docElem.removeChild(fakeBody);return{matches:bool,media:q}}}(document);

/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){if(!window.matchMedia("").addListener){var oldMM=window.matchMedia;window.matchMedia=function(q){var ret=oldMM(q),listeners=[],last=false,timer,check=function(){var list=oldMM(q),unmatchToMatch=list.matches&&!last,matchToUnmatch=!list.matches&&last;if(unmatchToMatch||matchToUnmatch)for(var i=0,il=listeners.length;i<il;i++)listeners[i].call(ret,list);last=list.matches};ret.addListener=function(cb){listeners.push(cb);if(!timer)timer=setInterval(check,1E3)};ret.removeListener=function(cb){for(var i=
0,il=listeners.length;i<il;i++)if(listeners[i]===cb)listeners.splice(i,1);if(!listeners.length&&timer)clearInterval(timer)};return ret}}})();

/*
	mob.js is Post Image Loader for reducing traffic on the Responsive Web.

	Author : iMaZiNe
	CopyRight : 2012~ GPL v2 & MIT dual License.

	Release Note

		v0.61
			- fix some bugs.

		v0.6
			- add register API for AJAX workflow.

		v0.51
			- Include alternative base64 encoded GIF Image (16 : 10)

		v0.5
			- Improve Lazyload Performance
		
		v0.4.01
			- add polyfills for old Bowser(andriod & IE)

		v0.4 (Mile Stone)
			- support LazyLoad
			- rebuild construct
			- retinaSupport defends on device pixelRatio

		v.0.3.2b
			- fix minor bugs

		v0.3b
			- support Retina Display

		v0.2b
			- support IE

		v0.1b
			- adding mob.config to be configure.
			- image request expression.
			- autoReload function.

		v0.01 alpha
			- Intergrate Image Post-Loader.
*/

if(window.console === undefined){console = {log:function(){}};} //Prevent IE console.log Error

(function(root) {
	var doc = document,
		sheet = doc.styleSheets,
		mob = mob || {};
	// -----------------
	// define mob object
	// -----------------
	mob = {
		name : 'mob.js',
		version : '0.61',
		defaults : {
			requestType : "%fx%w.%e",
			autoStart : true,
			autoReload : true,
			retinaSupport : false,
			offsetHeight : 100,
			offsetWidth : 100,
			minHeight : 200,
			minWidth : 200,
			lazyLoad : true,
			alterImg : 'data:image/gif;base64,R0lGODlhEAAKAIAAAAAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA0OEUxMDc5QTQ1OTExRTJCRTlEOTI4OUI5NzlDNjhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA0OEUxMDdBQTQ1OTExRTJCRTlEOTI4OUI5NzlDNjhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQ4RTEwNzdBNDU5MTFFMkJFOUQ5Mjg5Qjk3OUM2OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDQ4RTEwNzhBNDU5MTFFMkJFOUQ5Mjg5Qjk3OUM2OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQAAAAAACwAAAAAEAAKAAACC4SPqcvtD6OctK4CADs='
		},
		scrollTimer : false,
		__preventEvent : true,
		__viewportHeight : 0,
		__viewportWidth : 0,
		__basket : [],
		__book : [],


		setConfig : function(defaults){
			var	custom = this.config;
			for (var name in defaults){
				custom[name] = custom[name] === undefined ? defaults[name] : custom[name];
			}
			custom.DPR = custom.retinaSupport && window.devicePixelRatio > 1 ? window.devicePixelRatio : 1;
			return custom;
		},


		// ---------------------------------
		// First touch for auto start init()
		// ---------------------------------
		touch : function(){
			this.config = this.setConfig(this.defaults);
			if(this.config.autoStart)this.init();
		},

		init : function(){
			var config = this.config;
			if (config.lazyLoad){
				window.addEventListener('scroll',function(){mob.setShowBooks();});
			}
			if (config.autoReload){
				this.addMQListener();
			}
			this.refresh();
		},


		// Refresh and register All image Elements
		// You can call mob.refresh() anywhere.
		refresh : function () {
			this.__basket = [];		// Clear Basket Container
			this.register(doc);
		},

		// Adding new image elements works with mob.js
		// @obj = Container Elements has images. 
		register : function(obj) {
			var temp = obj.getElementsByTagName('img');
			for (var i = temp.length;  i--;){
				var file = temp[i].getAttribute('data-src'),
					alterImg = temp[i].src;
				if (file !== null){
					temp[i]._file = file.split(/(?:\.([^.]+))?$/);
					var minHeight = getComputed(temp[i], 'minHeight'),
						minWidth = getComputed(temp[i], 'minWidth');
					temp[i].style.minHeight = parseFloat(minHeight) < 1 ? this.config.minHeight + 'px': minHeight;
					temp[i].style.minWidth = parseFloat(minWidth) < 1 ? this.config.minWidth + 'px' : minWidth;
					temp[i].src = alterImg === '' ? this.config.alterImg : alterImg;
					temp[i].style.opacity = 0.2;
					this.__basket.push(temp[i]);
				}
			}
			this.addBooks(true);
		},

		resetBooks : function() {
			this.__book = [];			// Clear booked Container
			this.__preventEvent = toggle(this.__preventEvent);
			this.addBooks(this.__preventEvent);
		},

		addBooks : function(prevent) {
			if(prevent){
				for (var i = this.__basket.length; i--;){
					var elem = this.__basket[i];
					var temp = {};
						temp._width = getComputed(elem,'width',true),
						temp._height = getComputed(elem,'height',true),
						temp._display = getComputed(elem,'display');
					if((elem._width === undefined || elem._height === undefined || temp._width > elem._width || temp._height > elem._height) && temp._display !== 'none'){
						elem.position = elem.getBoundingClientRect();
						elem._width = temp._width,
						elem._height = temp._height;
						this.__book.push(elem);
					}
				}
				this.showBooks();
			}
		},

		showBooks : function(){
			var redirection = 'showElement';
			if(this.config.lazyLoad){
				this.__viewportHeight = getViewport('clientHeight');
				this.__viewportWidth = getViewport('clientWidth');
				redirection = 'checkPosition';
				this.bodyRect = document.body.getBoundingClientRect();
			}
			// console.time('lazyload performance');
			for (var i = 0; i <= this.__book.length-1; i++) {
				if(this.__book[i] !== undefined){
					this[redirection](this.__book[i]);
				}
			}
			// console.timeEnd('lazyload performance');
			function getViewport(prop){
				return Math.min(document.body[prop],document.documentElement[prop]);
			}
		},

		checkPosition : function(elem){
			var position = elem.position,
				bodyRect = this.bodyRect;
			setTransition(elem, 'opacity ease 0.6s');
			if(position.top + bodyRect.top <= this.__viewportHeight && position.left + bodyRect.left <= this.__viewportWidth){
				this.showElement(elem);
			}
		},

		showElement : function(elem){
			var request = this.config.requestType,
				file = elem._file,
				width = Math.ceil(this.config.DPR * elem._width),
				height = Math.ceil(this.config.DPR * elem._height),
				src = request.replace('%f',file[0]).replace('%w',width).replace('%h',height).replace('%e',file[1]);
			if(elem.src!==src){
				elem.src = src;
				elem.addEventListener('load',function(){mob.setAttribute(this);});
				elem.addEventListener('error',function(e){
					console.log(e.status + "Can't load - " + this._file[0]+'.'+this._file[1]);
					var bookIndex = mob.__book.indexOf(elem);
					if(bookIndex >= 0)mob.__book.splice(bookIndex , 1);
				});
			}

		},

		setAttribute : function(elem){
			elem.style.opacity = 1;
			var basketIndex = this.__basket.indexOf(elem);
			var bookIndex = this.__book.indexOf(elem);
			if(bookIndex >= 0)this.__book.splice(bookIndex , 1);
		},

		addMQListener : function(){
			var sheet = document.styleSheets;
			for (var i = sheet.length; i--;) {
				var rules = sheet[i].cssRules,
					rLength = rules.length;
				for (var j = rLength; j--;) {
					if(rules[j].media !== undefined){
						var mText = rules[j].media.mediaText;
						eventObject = this["mediaQuery" + j] = window.matchMedia(mText);
								eventObject.addListener(function(){
								mob.resetBooks();
							});
					}
				}
			}
		},

		// -------------------------------
		// Add Event Handler End of scroll
		// -------------------------------
		setShowBooks : function(){
			if(this.__book.length){
				clearTimeout(this.scrollTimer);
				this.scrollTimer = setTimeout(function(){mob.showBooks();},150);
			}
		}

	};

	// --------------------------------------------------------
	// getComputed (@elem, @prop, @isNumber)
	// returning computedStyle function
	// @elem = target element object 
	// @prop = property string
	// @isNumber = boolean for Number format
	// --------------------------------------------------------
	function getComputed(elem, prop, isNumber) {
		var returnValue = window.getComputedStyle(elem)[prop];
		return returnValue = isNumber === true ? + parseFloat(returnValue) || 0 : returnValue;
	}

	function bindResetBooks(){
		mob.resetBooks();
	}

	function toggle (bool) {
		return bool ? false : true;
	}

	function setTransition(elem,prop){
		elem.style.webkitTransition = prop;
		elem.style.MozTransition = prop;
		elem.style.msTransition = prop;
		elem.style.OTransition = prop;
		elem.style.transition = prop;
	}

	root.mob = mob;

	window.addEventListener('load', function(){mob.touch();});

})(this);
