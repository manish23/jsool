# jsool #
**pacote:**<br />
**arquivo:** [Main.js](http://code.google.com/p/jsool/source/browse/trunk/jsool/js/core/Main.js)<br />
**extende:** Object<br />

---

"jsool" é um objeto que possui funções utilitarias e é a base da biblioteca.

---


### Atributos estáticos ###

| **Atributo** | **Descrição** |
|:-------------|:--------------|
|boolean isIE  |`true` se o browser do cliente é o Microsoft Internet Explorer|
|boolean isFF  |`true` se o browser do cliente é o Mozilla Firefox|
|boolean isOpera|`true` se o browser do cliente é o Opera|
|boolean isSafari|`true` se o browser do cliente é o Apple Safari|
|boolean isChrome|`true` se o browser do cliente é o Google Chrome|
|boolean isWebKit|`true` se o browser do cliente é baseado no WebKit|


---


### Metodos estáticos ###

| **Função** | **Descrição** |
|:-----------|:--------------|
|_void_ onReady(Function action)|Adiciona a função _action_ à lista de funções que devem ser executadas quando a pagina e o framework estiverem prontos|
|_void_ onSystemReady(Function action)|Adiciona a função _action_ à lista de funções que devem ser executadas quando a pagina estiver pronta. _onSystemReady_ é executado antes de _onReady_ .|
|Number time()|Retorna o tempo do sistema em milissegundos.|
|Object apply(Object object, Object source, Object default(Optional))|copia as propriedades do objeto _source_ para o objeto _object_.|
|Object applyIf(Object object, Object source)|Copia do objeto _source_ apenas as propriedades que o objeto _object_ não possui.|
|boolean isReady()|Verifica se a aplicação esta carregada e pronta.|
|Function emptyFn()|Uma função vazia|
|Object copy(Object object)|Cria uma cópia do objeto _object_|
|_void_ iterate(Object object, Function fn)|Executa a função _fn_ em cada atributo do objeto _object_. A função _fn_ receberá como parametros o nome e o valor do atributo|
|Number id(HTMLElement el)|Retorna um id unico para o elemento HTML|
|boolean isDefine(Object object)|Verifica se o objeto _object_ existe/é definido|
|boolean isArray(Object object)|Verifica se o objeto _object_ é um array|
|boolean isObject(Object object)|Verifica se o objeto _object_ é um Objeto|
|boolean isNumber(Object object)|Verifica se o objeto _object_ é um numero|
|boolean isBoolean(Object object)|Verifica se o objeto _object_ é um booleano|
|boolean isDate(Object object)|Verifica se o objeto _object_ é uma data|
|boolean isFunction(Object object)|Verifica se o objeto _object_ é uma função|
|Function $extends(Class parent, Object prototype, String className)|Cria uma nova classe|
|[js.dom.Element](JsDomElement.md) get(String id)|Procura no documento atual por um elemento de ID = _id_ e retorna um [js.dom.Element](JsDomElement.md) que o representa|
|[js.dom.Element](JsDomElement.md) get(HTMLElement element)|Encapsula o elemento _element_ em um objeto [js.dom.Element](JsDomElement.md)|
|Array`<HTMLElement>` query(String selector)|Executa a query CSS e retorna um array dos elementos resultantes|
|HTMLElement queryNode(String selector)|Executa a query CSS e retorna um elemento resultante|
|js.dom.CompositeElement select(String selector)|Executa a query CSS e retorna um _CompositeElement_|