jsool.namespace("js.ui");
(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper,
		DOC = window.document,
		// Offset between the mouse pointer and the 0x0 of the window
		offsetX,
		offsetY,
		// The current moving dialog
		dialog,
		// Flags if the mouse is down
		mouseDown = false,
		// Stores the browser window size
		windowWidth = jsool.windowSize().width,
		windowHeight = jsool.windowSize().height,				
		zFeed = 0;


	/*
	 * Handles when the window is resized setting the window size variable 
	 */
	var resizeHandler = EM.on.wrap(window,'resize',function(){
		var ws = jsool.windowSize();
		windowWidth = ws.width;
		windowHeight = ws.height;
	});
	
	/*
	 * When the document is ready, append the resize handler
	 */
	jsool.onReady(resizeHandler);
	
	/*
	 * Handles the mouse moviment
	 */
	function moveHandler(ev){
		//Make it simple and fast as possible
		if(dialog){
			var x = ev.x - offsetX + 2,//Calculated X position
				//Calculated Y position
				y = ev.y - offsetY + 2,
				// Max X position
				mx = windowWidth - dialog.size.width - 2,
				// Max Y position
				my = windowHeight - dialog.size.height - 2;
			// Mantain window inside browser
			x = x > mx ? mx : x < 0 ? 0 : x;
			y = y > my ? my : y < 0 ? 0 : y;
			
			// Set position
			dialog.style.top = y + 'px';
			dialog.style.left = x + 'px';
		}
	}
	
	/*
	 * Detach the event listeners from the document after the window is released
	 */
	function upHandler(ev){
		moveHandler(ev);
		offset = null;
		dialog = null;
		mouseDown=false;
		EM.un(DOC,"mousemove",moveHandler);
		EM.un(DOC,"mouseup",upHandler);
	}
	
	js.ui.Window = $extends(js.util.Observable,{
		events:['mousedown'],
		cons: function(config){
			var dom;
			//Default configuration
			config = config || {} ;
			
			jsool.applyIf(config,{
				closeable:true,
				title:"Dialog",
				width: 'auto',
				height: 'auto',
				x:"0px",
				y:"0px",
				show: false
			});
			
			// Created the window DOM
			dom = DH.createDom({
				className:"js-dialog no-select",
				children:[{
					tag:"h1",
					html: config.title
				},{
					className:"body",
					html: 'Mensagem'
				}],
				style:{
					width:config.width,
					height:config.height,
					top:config.y,
					left:config.x,
					display:config.show?'block':'none',
					'z-index': zFeed++
				},
				parent: js.dom.BODY
			});
			
			// shortcut for the style
			this.style = dom.style;
			
			// add event listener for the dragger
			EM.on(dom,'mousedown',this.fireEvent,this);
			
			// The wrapped window body
			this.body = jsool.get(dom);
			// The window box
			this.size = this.body.getSize();
		},
		onmousedown: function(ev){
			moveHandler(ev);
			if(ev.source.tagName && ev.source.tagName=="H1"){

				mouseDown=true;
				dialog = this;

				var p = this.body.getPosition();
				this.style.zIndex = zFeed++;
				
				offsetX = ev.x-p.x;
				offsetY = ev.y-p.y;
				
				EM.on(DOC,"mousemove",moveHandler);
				EM.on(DOC,"mouseup",upHandler);
				
			}
			
		},
		/**
		 * Shows the current window
		 */
		show: function(){
			this.style.display = 'block';
		},
		
		/**
		 * Hides the current window
		 */
		hide: function(){
			this.style.display = 'none';
		},
		
		/**
		 * Sets the position of the window on the screen
		 * 
		 * @param x The x coordinate of the window on the screen
		 * @param y The y coordinate of the window on the screen
		 */
		setPosition: function(x, y){
			this.style.top = y + 'px';
			this.style.left = x + 'px';
		},
		
		/**
		 * Sets the size of the window
		 * 
		 * @param w The width
		 * @param h The heigth
		 */
		setSize: function(w,h){
			this.style.width = w + 'px';
			this.style.height = h + 'px';
			this.size = this.body.getSize();
		},
		
		/**
		 * Checks it the window is visible
		 */
		isVisible: function(){
			return this.style.display != 'block';
		}
	},"js.ui.Window");
})();