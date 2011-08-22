jsool.namespace("js.ui");

(function(){
	var EM = js.core.EventManager,
		DH = js.dom.Helper;
	
	
	js.ui.DropDown = $extends(js.util.Observable,{
		
		
		cons: function(config){
			//Default configuration
			this.config = config || {} ;
			this.items = config.items || [];
			
			if(config.render)this.render(config.render);
		},
		
		
		
		events:['click','select','mousedown'],
		
		
		
		render: function(el){
			this.wrapper = el = jsool.get(el);
			var items = [],c =this.config,html;
			
			Array.iterate(this.items,function(i,el){
				items.push({
					tag:'li',
					html: c.label ? el[c.label] : el,
					index: i
				});
			});
			
			html = DH.createHTML({
				className:'js-dd',
				children:[{
					tag:'input',
					type:'text',
					disabled: 'disabled'
				},{
					tag:'input',
					type:'button',
					value:'V'
				},{
					tag:'ul',
					className:'no-select',
					children: items
				}]
			});
			
			el.append(html);
			
			var bt = Raze.queryNode('input[type=button]',el.getDom());
			jsool.get(bt).on('click',this.fireEvent,this);
			var ul = Raze.queryNode('ul',el.getDom());
			jsool.get(ul).on('click',this.fireEvent,this);
		},
		
		
		
		dropVisible:false,
		
		
		
		onclick: function(ev){
			
			if(ev.button == 0){//left click
				var src = ev.source,
					t = ev.source.tagName,
					w = this.wrapper,
					d,
					me = this,
					or = ev.original;//Temporary scope to handle the document event listener
				
				if(t == 'LI'){//selecting element
					
					this.selected = this.items[src.getAttribute('index')];
					w.query("input")[0].value=src.innerHTML;
					this.fireEvent('select',this.selected);
					
				}else if(t == 'INPUT'){ //Drop
					
					if(!this.dropVisible){						
						d = w.query("ul")[0].style;
						
						d.display = 'block';
						this.dropVisible = true;
						
						or.cancelBubble = true;
						me.hideDrop = function(ev){
							if(or==ev.original)return false;
							d.display='none';
							me.dropVisible = false;
							EM.un(document,'click',me.hideDrop);
							EM.un(document,'click',arguments.callee);
						};
						
						EM.on(document,'click',me.hideDrop);
					}
					
				}
			}
		}		
		
	},"js.ui.DropDown");
})();