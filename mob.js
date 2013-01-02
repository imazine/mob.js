/*
	mob.js is Post Image Loader for reducing traffic on the Responsive Web.

	Author : iMaZiNe
	CopyRight : 2012. GPL v2 & MIT dual License.

	Release Note

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

if(window.console === undefined){alert('we have no console');console = {log:function(){}};} //console.log disable for IE

(function(){
	var d = document,
		s = d.styleSheets,
		retina = window.devicePixelRatio > 1 ? 2: 1;
		sLength = s.length;
	
	mob = {
		version : '0.3b',
		objArr : d.getElementsByTagName('img'),

		init : function(){
			this.imgLength = this.objArr.length;
			this.config.requestType = typeof this.config.requestType == 'string' ? this.config.requestType : '%fx%w.%e';
			if(typeof mob.config.autoReload == 'undefined' || mob.config.autoReload === true)this.addLisn();
			this.config.retina = this.config.retinaDisplay === true ? retina : 1;
			this.getAttr();
			this.bindmob(true);
		},

		addLisn : function(){
			for (var i = sLength; i--;) {
				var r = s[i].cssRules ,
					rLength = r.length;
				for (var j = rLength; j--;) {
					if(r[j].constructor == CSSMediaRule){
						var a = r[j].media.mediaText,
						b = this["mediaQuery" + j] = window.matchMedia(a);
						b.addListener(mob.bindmob);
					}
				}
			}
		},

		bindmob : function(arguement){
			mob.mob.call(mob,arguement);
		},

		getAttr : function(){
			for (var i = this.imgLength; i--;){
				var a = this.objArr[i],
					b = a.getAttribute('data-src'),
					newObj = [],
					ext = /(?:\.([^.]+))?$/;
				a.dataset = a.dataset ? a.dataset : newObj;
				var c = a.dataset;
					c.fileName = b.split(ext);
					c.src = b;
					c.width = 0;
				if(typeof b != 'string'){
					alert('data-src attributes are NOT FOUND \n Check out manual');
					return ;
				}
			}
		},

		mob : function(arg){
			console.log('mobmobmob');
			var a = {},
				w = window;
			for (var i = this.imgLength; i--;) {
				var o = this.objArr[i],
					d = this.objArr[i].dataset;
				a.width = parseFloat(w.getComputedStyle(o).width);
				a.display = w.getComputedStyle(o).display;
				a.visibility = w.getComputedStyle(o).visibility;
				if((d.width < a.width || arg === true) && a.display != 'none' && a.visibility != 'hidden'){
					d.width = a.width;
					var f = this.config.requestType,
						s = typeof d.fileName == 'object' ? d.fileName : d.fileName.split(',');
					f = f.replace('%f',s[0]).replace('%w',a.width * this.config.retina).replace('%e',s[1]);
					o.setAttribute('src',f);
					o.addEventListener('onerror',o.setAttribute('src',d.src));
					console.log(f + ' -- loaded');
				}
			}
		}
	};
})();