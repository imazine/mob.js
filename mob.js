/*
	mob.js is Post Image Loader for reducing traffic on the Responsive Web.

	Author : iMaZiNe
	CopyRight : 2012. GPL v2 & MIT dual License.

	Release Note
		
		v0.1b
			- adding mob.config to be configure.
			- image request expression.
			- autoReload function.

		v0.01 alpha
			- Intergrate Image Post-Loader.
*/


if(window.console === undefined){console = {log:function(){}};} //console.log disable for IE

(function(){
	var d = document,
		s = d.styleSheets,
		sLength = s.length;
	
	mob = {
		version : '0.1b',
		objArr : document.getElementsByTagName('img'),

		init : function(){
			this.imgLength = this.objArr.length;
			this.config.requestType = typeof this.config.requestType == 'string' ? this.config.requestType : '%fx%w.%e';
			if(typeof mob.config.autoReload == 'undefined' || mob.config.autoReload === true)this.addLisn();
			this.getAttr();
			this.mob(true);
		},

		addLisn : function(){
			for (var i = sLength - 1; i >= 0; i--) {
				var r = s[i].cssRules,
					rLength = r.length;
				for (var j = rLength - 1; j >= 0; j--) {
					if(r[j].constructor == CSSMediaRule){
						var a = r[j].media.mediaText,
						b = this["mediaQuery" + j] = window.matchMedia(a);
						b.addListener(mob.mob);
					}
				}
			}
		},

		getAttr : function(){
			for (var i = this.imgLength -1; i >= 0; i--){
				var a = this.objArr[i],
					b = a.getAttribute('data-src'),
					exec = /(?:\.([^.]+))?$/;
					a.dataset.fileName = b.split(exec);
					a.dataset.width = 0;
				if(typeof b != 'string'){
					alert('data-src attributes are NOT FOUND \n Check out manual');
					return ;
				}
			}
		},

		mob : function(arg){
			var a = {},
				w = window;
			for (var i = mob.imgLength - 1; i >= 0; i--) {
				var o = mob.objArr[i],
					d = mob.objArr[i].dataset;
				a.width = parseFloat(w.getComputedStyle(o).width);
				a.display = w.getComputedStyle(o).display;
				a.visibility = w.getComputedStyle(o).visibility;
				if((d.width < a.width || arg === true) && a.display != 'none' && a.visibility != 'hidden'){
					d.width = a.width;
					var f = mob.config.requestType,
						s = d.fileName.split(',');
					f = f.replace('%f',s[0]).replace('%w',a.width).replace('%e',s[1]);
					o.setAttribute('src',f);
					o.addEventListener('onerror',o.setAttribute('src',o.dataset.src));
					console.log(f + ' -- loaded');
				}
					
			}
		}
	};
})();