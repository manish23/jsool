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
 *        this list of conditions and the following disclaimer in the documentation
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

jsool.namespace("js.core");

js.core.EventManager = (function create_event_manager(){		
	var elsMap = {},
	
	
	safari = {
		3 : 13, // enter
        63234 : 37, // left
        63235 : 39, // right
        63232 : 38, // up
        63233 : 40, // down
        63276 : 33, // page up
        63277 : 34, // page down
        63272 : 46, // delete
        63273 : 36, // home
        63275 : 35  // end
	},
	
	buttons = jsool.isOpera ? {1:0,4:1,2:2} : //Opera
				jsool.isFF ? {0:0,1:1,2:2} : //Firefox
				jsool.isSafari? {1:0,2:1,3:2} : //Safari
				{0:0,1:1,2:2},
	ieBody;
	
	if(jsool.isIE)ieBody = document.body;
	window.events = elsMap;
	// Adds an event listener to a DOM element
	function addListener(el, ev, fn, scope){
		var id = jsool.id(el), //The id of the element
			elEvs = elsMap[id] = elsMap[id] || {}, //All the registered events of the element
			hs = elEvs[ev] = elEvs[ev] || []; //All handlers registered for the event			
		
		scope = scope || el;
		
		var handler = function(event){
			var ret;
			event = event || window.event;
			//
			//Hardcore event normalization
			var ev = {
				original: event,
				x: jsool.isIE ? (event.x || event.clientX+ieBody.scrollLeft) : event.pageX,
				y: jsool.isIE ? (event.y || event.clientY+ieBody.scrollTop) : event.pageY,
				source: event.target || event.source || event.srcElement,
				type: event.type,
				key: jsool.isSafari ? safari[event.charCode || event.keyCode] : event.charCode || event.keyCode,
				button: buttons[typeof event.button=='undefined' ? event.which : event.button]
			};
	
			//Call handler			
			ret = fn.call(scope, ev);
			
			if(typeof ret == "boolean"){
				if(!ret && event.preventDefault){
					event.preventDefault();
				}else{
					event.returnValue = ret;
					return ret;
				}
			}
		};
		
		hs.push({
			EVENT: ev,
			FUNCTION: fn,
			HANDLER: handler,
			ELEMENT: el,
			SCOPE: scope
		});
		
		jsool.isIE ? el.attachEvent('on'+ev, handler) : el.addEventListener(ev, handler, false);
		
		return true;
	}
	
	// Do removes an event listener to a DOM element
	function doRemoveListener(el, ev, handler){
		jsool.isIE ? el.detachEvent('on'+ev, handler) : el.removeEventListener(ev, handler, false);
	}
	
	// Find and request a event listener to be removed from a DOM element
	function removeListener(el,ev, fn){
		var m = elsMap[jsool.id(el)],
			evs = m[ev],i=0,e;
		//REMOVE SPECIFC HANDLER
		if(fn){
			while(e=evs[i]){
				if(e.FUNCTION===fn){
					doRemoveListener(el, ev, e.HANDLER);
					m[ev].remove(i);
				}
				i++;
			}
		}else{
			//REMOVE ALL HANDLERS FOR THE EVENT
			while(e=evs[i]){
				doRemoveListener(el, ev, e.HANDLER);
				delete m[ev][i++];
			}
			delete m[ev];
		}
	}
	
	//Removes all listeners from an element
	function detroyListeners(el){
		var id = jsool.id(el);
		var evs = elsMap[id];
		
		jsool.iterate(evs,function(at, vl){
			Array.iterate(vl, function(i, val){
				doRemoveListener(el, at, val.HANDLER);
				delete elsMap[id][at][i];
			});
			delete elsMap[id][at];
		});
	}
	
	//Show to world your skills
	return {
		on: addListener,
		addListener: addListener,
		un: removeListener,
		removeListener: removeListener,
		destroy: detroyListeners,
		detroyListeners: detroyListeners
	};
})();