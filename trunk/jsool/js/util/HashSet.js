js.util.HashSet = $extends(js.util.Collection,{
	constructor: function(){
		js.core.Object.apply(this, arguments);
		this.set = {};
	},
	set: null,
	_size: 0,
	add: function(obj){
		var type = typeof obj;
		
		var hash;
		
		if((type == 'object' && obj.hashCode)){
			hash = obj.hashCode();
		}else if(type == 'number' || type == 'string'){
			hash = obj.toString();
		}else{
			throw new js.core.Exception("Invalid argument type: "+obj.toString(), this, arguments);
		}
		
		if(!this.set[hash])
			this._size++;
		
		this.set[hash] = obj;
	},
	mapCode: function(obj){
		if(typeof obj == 'object' && obj.hashCode)
			return obj.hashCode();
		else
			return obj.toString();
	},
	addAll: function(collection){
		if(collection.instanceOf(js.util.Collection)){
			var i = collection.iterator();
			while(i.hasNext()){
				this.add(i.next());
			}
		}else if(Array.isArray(collection)){
			for(var j = 0; j < collection.length; j++)
				this.add(collection[j]);
		}
	},
	contains: function(obj){
		if(obj == 'toString') return null;
		var hash = this.mapCode(obj);
		return this.set[hash] != null;
	},
	clear: function(){
		this._size = 0;
		this.set = {};
	},
	remove: function(obj){		
		if(delete this.set[this.mapCode(obj)])
			this._size--;
	},
	size: function(){
		return this._size;
	},
	toArray: function(){
		var arr = new Array();
		for(var p in this.set) arr.push(this.set[p]);
		return arr;
	},
	iterator: function(){		 
		return new js.util.HashSet.Iterator(this.set);
	}
},'js.util.HashSet');

js.util.HashSet.Iterator = $extends(js.core.Object,{
	constructor: function(set){
		js.core.Object.apply(this,arguments);
		this.data = new Array();
		
		for(var item in set){
			this.data.push(item);
			this.size++;
		}
	},
	data: null,
	index: 0,
	size: 0,
	hasNext: function(){
		return this.index < this.size;
	},
	next: function(){
		if(!this.hasNext())
			throw new js.core.Exception('Array Index Out of Bounds: '+this.index, this, arguments);
		
		var val = this.data[this.index];
		this.index++;
		return val;
	},
	nextIndex: function(){
		if(this.hasNext())
			return this.index + 1;
		else
			return -1;
	}
},'js.util.HashSet.Iterator');