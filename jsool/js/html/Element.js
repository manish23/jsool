/**
 * @class js.html.Element
 * @extends js.util.Observable
 * 
 * Base class for any html element
 */
js.html.Element = $extends(js.core.Object,{
	/**
	 * @constructor
	 * Creates a new html element.
	 * 
	 * @param {HTMLElement} element
	 * creates an element based on a existing HTMLElement
	 * @param {string} tag
	 * creates a new element and its dom with a valid html tag
	 * 
	 * @throws {js.core.Exception} if the html tag is invalid or the providen object is not a valid dom
	 */
	cons: function(obj){
		var type = typeof obj;
		var tags = /\b(a|button|div|object|label|option|p|script|select|span|td|tr|th|tbody|thead|tfoot|svg|iframe|canvas)\b/;
		
		this.id = 'jsool-'+this.global.count;
		this.global.count++;
		
		if(type == 'string' && tags.test(obj)){
			this.dom = document.createElement(obj);
		}else if(type == 'object' && obj.tagName){
			this.dom = obj;
			this.tag = obj.tagName;
			
			if(this.dom.id){
				this.id = this.dom.id;
			}else{
				this.dom.id = this.id;
			}
			
		}else{
			throw new js.core.Exception('Invalid tag: ' + obj, this);
		}
		
		this.events = {
			focus:[],blur:[],
			mousedown:[],mouseup:[],click:[],dblclick:[],
			mousein:[],mouseout:[],mousemove:[],
			keydown:[],keyup:[],keypress:[],
			load:[],unload:[],abort:[],error:[],resize:[],scroll:[]
		};
	},
	tag: null,
	/**
	 * @property {Object} commom variables for all elements 
	 */
	global: {
		count:0
	},
	/**
	 * @property {js.util.List} the children elements of this Element
	 */
	children: null,
	/**
	 * @property {HTMLElement} the dom of the Element
	 */
	dom: null,
	/**
	 * @property {js.html.Element} parent element
	 */
	parent: null,	
	/**
	 * @function Returns the dom of the Element
	 * @return {HTMLElement} Element's dom
	 */
	getDom: function(){
		return this.dom;
	},
	/**
	 * @function Set the attributes to the dom element
	 * 
	 * @param {string} name
	 * the name of the attribute
	 * @param {string} value
	 * the value of the attribute
	 * @param {object} attributes
	 * a map of attributes
	 */
	setAttribute: function(){
		if(arguments.length == 2 && typeof arguments[0] == 'string'){
			var name = arguments[0];
			var value = arguments[1];
			this.dom.setAttribute(name, value);
		}else if(arguments.length == 1 && typeof arguments[0] == 'object'){
			var options = arguments[0];
			for(var p in options){
				this.dom.setAttribute(p, options[p]);
			}
		}
	},
	/**
	 * @function
	 * 
	 * @param {string} name
	 * the name of the attribute
	 * 
	 * @return {string} value of the attribute
	 */
	getAttribute: function(name){
		return this.dom.getAttribute(name);
	},
	/**
	 * @function
	 * 
	 * @return {string} the id of the dom element
	 */
	getId: function(){
		return this.id;
	},
	/**
	 * @function
	 * adds a new child into the elements dom and the children collection
	 * 
	 * @param {js.html.Element} child 
	 * 
	 * @throws {js.core.Exception} if the object is not an instance of js.html.Element
	 */
	append: function(child){
		var type = typeof child;
		if(type == 'string'){
			this.dom.innerHTML = this.dom.innerHTML + child;
		}else if(type == 'object'){
			if(child.nodeType){
				this.dom.appendChild(child.getDom());
			}else if(child.instanceOf(js.html.Element)){
				this.dom.appendChild(child.getDom());
				if(child.parent)child.parent.remove(child);
				child.parent = this;
			}
		}
	},
	/**
	 * @function
	 * Set the elements inner text.
	 * 
	 * @param {string} string
	 * 
	 * @throws {js.core.Exception} i the argument is not a string
	 */
	setText: function(value){
		if(this.cachedText != undefined){
			this.cachedText = value;
		}else{
			this.dom.appendChild(document.createTextNode(new String(value)));
		}
	},
	getText: function(){
		return this.getDom().innerHTML;
	},
	/**
	 * @function
	 * 
	 * @return {string} the elements tag name
	 */
	tag: function(){
		return this.dom.tagName;
	},
	/**
	 * @function
	 * Removes a child node from the Element
	 * 
	 * @param {js.html.Element} element
	 * The element to be removed
	 */
	remove: function(element){
		this.getDom().removeChild(element.getDom());
	},
	/**
	 * Adds an event listener to element
	 */
	addListener: function(event, handler){
		var dom = this.getDom();
		if(!(this.events[event] == undefined)){
			var that = this;
			var handlerFunction = function(event){
				event = event || window.event;
				handler.apply(that, [event]);
			};
			//Stores for removal after destroy
			this.events[event].push(handlerFunction);
			
			if(dom.addEventListener){
				dom.addEventListener(event, handlerFunction, false);
			}else{
				dom.attachEvent('on'+event, handlerFunction);
			}
		}
	},
	/**
	 * @function
	 * Removes the events listeners from element
	 * 
	 * @param {null} remove all listeners
	 * @param {string} removes the handlers from the named event
	 * 
	 */
	destroyListeners: function(){
		if(!this.dom)return;
		var w3c = this.dom.addEventListener != undefined;
		var len;
		
		if(arguments.length == 0){
			for(var ev in this.events){
				len = this.events[ev].length;
				for(var i = 0; i < len; i++){
					if(w3c){
						this.dom.removeEventListener(ev, this.events[ev][i], false);
					}else{
						this.dom.detachEvent('on'+ev, this.events[ev][i]);
					}
				}
			}
		}else if(arguments.length == 1){
			var ev = arguments[0];
			var l = this.events[ev];
			len = l.length;
			for( var j = 0; j < len; j++){
				if(w3c){
					this.dom.removeEventListener(ev, l[j], false);
				}else{
					this.dom.detachEvent('on'+ev, l[j]);
				}
			}
		}
	},
	/**
	 * @function
	 * Adds a new CSS class to the element
	 * 
	 * @param {string} name The name of the CSS class
	 */
	addClass: function(name){
		var current = this.dom.className.split(' ');
		current.push(name.trim());
		this.dom.className = current.join(' ');
	},
	/**
	 * @function
	 * Removes a CSS class from the element
	 * 
	 * @param {string} name The name of the CSS class
	 */
	removeClass: function(name){
		if(this.cachedClasses != undefined){
			this.cachedClasses = this.cachedClasses.replace(name.trim(), '');
		}else{
			this.dom.className = this.dom.className.replace(name.trim(),'');
		}
	},
	/**
	 * @function
	 * Sets an attribute of the style of the element
	 * 
	 * @param {string} name The name style attribute
	 * @param {string} value the value of the style attribute
	 * 
	 * @param {object} collection of attributes and its values
	 */
	applyStyle: function(arg1, arg2){		
		var style = this.dom.style;
		if(typeof arg1 == 'string'){
			style[arg1] = arg2;
		}else if(typeof arg1 == 'object'){
			for(var prop in arg1)
				style[prop] = arg1[prop];
		}
	},
	/**
	 * @function
	 * Returns the child elements
	 * 
	 * @param {boolean} dom
	 * if <code>true</code> to the returned values be the dom elements
	 * or <code>false|null</code> to returns a <code>js.util.List</code> of Elements 
	 * 
	 * @param {object} collection of attributes and its values
	 * 
	 * @return {collection} the element's children
	 */
	getChildren: function(el){
		var toEl = (el == null ? false : el);
		if(!toEl){
			return this.getDom().childNodes;
		}else{
			var children = this.getDom().childNodes;
			var result = [];
			for(var i = 0; i < children.length; i++){
				if(children[i].nodeType != 3){
					result.push(js.html.Element.get(children[i]));
				}
			}
			return result;
		}
	},
	/**
	 * @function
	 * Gets the absolute position of the element on the page
	 * 
	 * @return {object} the element position like {x,y}
	 */
	getPosition: function(){
		var element = this.dom;
		var y = 0, x = 0;
		while(element != null){
			y += element.offsetTop;
			x += element.offsetLeft;
			element = element.offsetParent;
		}
		return {y:y,x:x};
	},
	getBox: function(){
		var pos = this.getPosition();
		pos.w = this.getDom().clientWidth;
		pos.h = this.getDom().clientHeight;
		return pos;
	},
	/**
	 * @function
	 * Return parent Element
	 * 
	 * @return {js.html.Element} The parent Element
	 */
	getParent: function(){
		return this.parent; 
	},
	/**
	 * @function
	 * Destroys this element
	 */
	destroy: function(){
		//Remove from dom
		if(this.getParent() != null){
			this.getParent().remove(this);
		}
		if(this.dom.parentNode){
			var parent = this.dom.parentNode;
			parent.removeChild(this.dom);
		}
		
		//Destroy listeners
		this.destroyListeners();
		
		//kill dom attributes
		for(var a in this.dom){
			this.dom[a] = null;
		}
		
		//Delete DOM
		delete this.dom;
	}
},'js.html.Element');


jsool.onSystemReady(function(){
	js.html.Element.BODY = new js.html.Element(document.getElementsByTagName('body')[0]);
	
	var brw = js.core.Browser;
	
	if(brw.isIE()){
		js.html.Element.BODY.addClass('ie');
	}else if(brw.isFF()){
		js.html.Element.BODY.addClass('ff');
	}else if(brw.isOpera()){
		js.html.Element.BODY.addClass('opera');
	}
});