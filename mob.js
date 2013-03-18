/*
	mob.js is Post Image Loader for reducing traffic on the Responsive Web.

	Author : iMaZiNe
	CopyRight : 2012~ GPL v2 & MIT dual License.

	Release Note
		
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

(function() {
	var doc = document,
		sheet = doc.styleSheets;

	// -----------------
	// define mob object
	// -----------------
	mob = {
		version : '0.4',
		defaults : {
			requestType : "%fx%w.%e",
			autoStart : true,
			autoReload : true,
			retinaSupport : false,
			offsetHeight : '200px',
			offsetWidth : '200px',
			lazyLoad : true
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
			if (config.lazyLoad)window.addEventListener('scroll',function(){mob.setShowBooks();});
			if (config.autoReload)this.addMQListener();
			this.refresh();
		},

		refresh : function () {
			this.__basket = [];		// Clear Basket Container
			var temp = doc.getElementsByTagName('img');
			for (var i = temp.length;  i--;){
				var file = temp[i].getAttribute('data-src');
				if(file !== null){
					temp[i]._file = file.split(/(?:\.([^.]+))?$/);
					var offsetHeight = temp[i].style.minHeight,
						offsetWidth = temp[i].style.minWidth;
					temp[i].style.minHeight = offsetHeight === undefined ? this.config.offsetHeight : offsetHeight;
					temp[i].style.minWidth = offsetWidth === undefined ? this.config.offsetWidth : offsetWidth;
					this.__basket.push(temp[i]);
				}
			}
			this.resetBooks();
		},

		resetBooks : function() {
			this.__preventEvent = toggle(this.__preventEvent);
			if(this.__preventEvent === false){
				var count = 0;
				this.__book = [];			// Clear booked Container
				for (var i = this.__basket.length; i--;){
					var elem = this.__basket[i];
					var temp = {};
						temp._width = getComputed(elem,'width',true),
						temp._height = getComputed(elem,'height',true),
						temp._display = getComputed(elem,'display');
					if((elem._width === undefined || elem._height === undefined || temp._width > elem._width || temp._height > elem._height) && temp._display !== 'none'){
						elem._width = temp._width,
						elem._height = temp._height;
						elem._basketNumber = i;
						elem._number = count++;
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
			};
			for (var i = 0; i <= this.__book.length-1; i++) {
				if(this.__book[i] !== undefined)this[redirection](this.__book[i]);
			}

			function getViewport(prop){
				return Math.min(document.body[prop],document.documentElement[prop]);
			}
		},

		checkPosition : function(elem){
			var rect = elem.getBoundingClientRect();
			if(rect.top <= this.__viewportHeight + 200 && rect.left <= this.__viewportWidth){
				this.showElement(elem);
			}else{
			}
		},

		showElement : function(elem){
			var request = this.config.requestType,
				file = elem._file,
				width = Math.ceil(this.config.DPR * elem._width),
				height = Math.ceil(this.config.DPR * elem._height);
			elem.src = request.replace('%f',file[0]).replace('%w',width).replace('%h',height).replace('%e',file[1]);

			setTransition(elem, 'opacity ease 2s');
			elem.style.opacity = 0;
			elem.addEventListener('load',function(){mob.setAttribute(this);});
			elem.addEventListener('error',function(){
				delete window.mob.__book[this._number];
				console.log("Can't load - " + this._file[0]+'.'+this._file[1]);
			});


		},

		setAttribute : function(elem){
			setTransition(elem, 'opacity ease 1s');
			elem.style.opacity = 1;
			var basketNumber = elem._basketNumber;
			this.__basket[basketNumber]._height = getComputed(elem,'height', true);
			this.__basket[basketNumber]._width = getComputed(elem,'width', true);
			delete this.__book[elem._number];
		},

		addMQListener : function(){
			var sheet = document.styleSheets;
			for (var i = sheet.length; i--;) {
				var rules = sheet[i].cssRules ,
					rLength = rules.length;
				for (var j = rLength; j--;) {
					if(rules[j].constructor == CSSMediaRule){
						var mText = rules[j].media.mediaText,
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
			clearTimeout(this.scrollTimer);
			this.scrollTimer = setTimeout(function(){mob.showBooks();},200);
		}

	};

	// --------------------------------------------------------
	// getComputed (@elem, @prop, @isNumber)
	// returning computedStyle function
	// @elem = target element object 
	// @prop = return property string
	// @isNumber = boolean for Number format
	// --------------------------------------------------------
	function getComputed(elem, prop, isNumber) {
		var returnValue = window.getComputedStyle(elem)[prop];
		return returnValue = isNumber === true ? +parseFloat(returnValue) || 0 : returnValue;
	}

	function bindResetBooks(){
		mob.resetBooks();
	}

	function toggle (bool) {
		return bool ? false : true;
	}

	function setTransition(elem,prop){
		console.log(prop);
		elem.style.MozTransition = prop;
		elem.style.webkitTransition = prop;
		elem.style.msTransition = prop;
		elem.style.OTransition = prop;
		elem.style.transition = prop;
	}

	window.addEventListener('load', function(){mob.touch();});

<<<<<<< HEAD
})();
=======
})();
>>>>>>> f7d1b2d... mob v0,4
