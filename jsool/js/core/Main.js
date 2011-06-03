/*  JSOOL - JavaScript Object Oriented Library 
 *
 *  Copyright (c) 2009, Mikhail Domanoski.
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification,
 *  are permitted provided that the following conditions are met:
 *
 *      * Redistributions of source code must retain the above copyright notice,
 *        this list of conditions and the following disclaimer.
 *
 *      * Redistributions in binary form must reproduce the above copyright notice,
 *        and/or other materials provided with the distribution.
 *
 *      * Neither the name of Mikhail Domanoski nor the names of its
 *        contributors may be used to endorse or promote products derived from this
 *        software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 *  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 *  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 *  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var jsool = (function create_jsool(){
	/**
	 * Operations that will be fired after the page is ready but before the application start
	 */
	var systemOperations = [];
	/**
	 * Operations that will be fired after the system is ready
	 */
	var onReadyActions = [];
	/**
	 * flags if the document is ready
	 */
	var documentReady = false;
	/**
	 * flags if framework is ready
	 */
	var systemReady = false;
	
	var base = {};
	
	var idCount = 0;
	
	base.namespace = function(name){
		var names = name.split(/\./);
		var cur, lst = window;
		for(var i=0,n;n=names[i++];){
			cur = lst[n];
			if(typeof cur === "undefined"){
				lst[n] = {};
			}
			lst = lst[n];
		}
	};
	
	base.doReady = function(){
		for(var i = 0; i< onReadyActions.length; i++){
			try{
				onReadyActions[i]();
			}catch(e){
				if(typeof console != 'undefined'){
					console.error(e.message || e.toString());
					console.info(e);
				}else{
					alert(e.description || e.toString());
					throw e;
				}
			}
		}
		if(jsool.isIE)
			Array.iterate(Raze.query(".no-select"),function(i, el){
				el.unselectable="on";
				el.onselectstart="return false;";
			});
	};
	
	base.prepareSystem = function(){
		for(var i = 0; i< systemOperations.length; i++){
			systemOperations[i]();
		}
	};
	
	if(window.addEventListener){
		window.addEventListener("load",function startup(){
			
			documentReady = true;
			base.prepareSystem();
			systemReady = true;
			base.doReady();
			
			window.removeEventListener("load",arguments.callee,false);
		},false);
	}else{
		window.onload = function startup(){

			documentReady = true;
			base.prepareSystem();
			systemReady = true;
			base.doReady();
			
			window.onload = null;
			try{delete window.onload;}catch(e){}
		};
	}
	
	return {
		/**
		 * Adds a function that will be fired just after the framework
		 */
		onReady: function(fn){
			onReadyActions.push(fn);
			if(this.isReady()){
				fn.call(jsool,[]);
			}
		},
		/**
		 * Adds a function that wil be fired just after the page is ready
		 */
		onSystemReady: function(fn){
			systemOperations.push(fn);
			if(this.isReady()){
				fn.call(jsool,[]);
			}
		},
		/**
		 * returns tha system time in milli-seconds
		 */
		time: function(){return+new Date;},
		/**
		 * Checks if the page and framework is ready
		 */
		isReady: function(){
			return systemReady && documentReady;
		},
		/**
		 * An empty function
		 */
		emptyFn: function(){return undefined;},
		/**
		 * Copy all attributos from source object to object
		 */
		apply: function(object, source, defaults){
			if(defaults){
				jsool.apply(object, defaults);
			}
			if(object && source && typeof source == 'object'){
				for(var p in source){
					object[p] = source[p];
				}
			}
			return object;
		},
		/**
		 * Copy from source all attributes that object does not have
		 */
		applyIf: function(object, source){
			if(object){
				for(var p in source){
					if(!jsool.isDefined(object[p])){
						object[p] = source[p];
					}
				}
			}
			return object;
		},
		/**
		 * Create a copy of a object
		 */
		copy: function(object){
			if(typeof object === 'object'){
				var copy;
				if(object.cls){
					copy = new object.cls();
				}else{
					copy = {};
				}
				jsool.apply(copy,object);
			}
			return copy;
		},
		/**
		 * Iterate an object attributes
		 */
		iterate: function(it,fn){
			for(var at in it){
				typeof it[at] !== 'function' && fn(at,it[at]);
			}
		},
		/**
		 * Gets or generate an id to an element
		 */
		id: function(el){
			if(el){
				el.id = el.id || ("jsool-" + (idCount++));
				return el.id;
			}else{
				return("jsool-" + (idCount++));
			}
		},
		/**
		 * Checks if the object is undefined
		 */
		isDefined: function(o){
			return typeof o !== 'undefined';
		},
		isArray: function(o){
			return o.constructor == Array;
		},
		isObject: function(o){
			return typeof o === "object";
		},
		isNumber: function(o){
			return typeof o === "number";
		},
		isBoolean: function(o){
			return typeof o === "boolean";
		},
		isDate: function(o){
			return o.constructor == Date;
		},
		isFunction: function(o){
			return typeof o === "function";
		},
		namespace:base.namespace,
		windowSize: function(){
			var height,width,D = document,DE,DB;
			
			if( typeof( window.innerWidth ) == 'number' ) {
				width = window.innerWidth;
				height = window.innerHeight;
			} else if( (DE = D.documentElement) && ( DE.clientWidth || DE.clientHeight ) ) {
				width = DE.clientWidth;
				height = DE.clientHeight;
			} else if( (DB =D.body) && ( DB.clientWidth || DB.clientHeight ) ) {
				width = DB.clientWidth;
				height = DB.clientHeight;
			}
			
			return {
				"height":height,
				"width":width
			};
		}
	};
})();

/**
 * Defines the framework object-oriented paradigm implementation
 */
jsool.$extends = function(superclass, prototype, type){
	var cls;
	if(typeof superclass != 'function'){
		return null;
	}
	
	//ImplicitySuperConstructor
	if(prototype['cons'] && typeof prototype['cons'] == 'function'){
		cls = (function implicity_constructor_class(constructor, parent){
			
			var construc = prototype['cons'];
			var parent = superclass;
			
			//Parent constructor executes just before the class constructor
			return function implicity_constructor(){
				parent.apply(this, arguments);
				construc.apply(this, arguments);
			};
		})();
		
		delete prototype['cons'];
	//ClassConstructor	
	}else if(prototype['ccons'] && typeof prototype['ccons'] == 'function'){
		cls = (function self_constructor_class(){
			var construc = prototype['ccons'];
			
			//Executes only the class constructor
			return function class_constructor(){
				construc.apply(this, arguments);
			};
		})();
		
		delete prototype['ccons'];
	}else{
		cls = (function no_constructor_class(){
			var construc = superclass;
			
			//Executes only the parent constructor
			return function super_constructor(){
				construc.apply(this, arguments);
			};
		})();
	}
	
	for(var sp in superclass.prototype){
		cls.prototype[sp] = superclass.prototype[sp];
	}
	
	if(jsool.isIE)
		cls.prototype['toString'] = superclass.prototype['toString'];
	
	for(var p in prototype){
		cls.prototype[p] = prototype[p];
	}
	
	if(jsool.isIE && prototype['toString']){
		cls.prototype['toString'] = prototype['toString'];
	}
	
	var SUPER = (function super_class(){
		var sup = superclass;
		return function Super(){
			sup.apply(this, arguments);
		};
	})();
	
	for(var f in superclass.prototype){
		if(typeof superclass.prototype[f] == "function"){
			SUPER[f] = (function create_super_method(){
				var fn = superclass.prototype[f];
				return function super_method(){
					return fn.apply(this, arguments);
				};
			})();
		}
	}
	
	cls.prototype.supercls = superclass;
	cls.prototype.$super = SUPER;
	cls.prototype.type = type;
	cls.prototype.cls = cls;
	return cls;
};

var $extends = jsool.$extends;

Boolean.prototype.instanceOf = function(clazz){
	return clazz === Boolean;
};

Function.prototype.instanceOf = function(clazz){
	return clazz === Function;
};