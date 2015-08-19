<h1>Classe <font color='#1E4E8F'>Element</font></h1>
<p><strong>pacote: </strong>js.dom</p>
<p><strong>arquivo: </strong><a href='http://code.google.com/p/jsool/source/browse/trunk/jsool/js/dom/Element.js'><font color='#1E4E8F'>Element.js</font></a></p>
<p><strong>extende: </strong><font color='#1E4E8F'><a href='JsCoreObject.md'>js.core.Object</a></font></p>

---

Representa um elemento HTML e encapsula metodos e funções utilitarias para facilitar a manipulação do elemento.

---


<h2>Atributos:</h2>

---

<p><font color='#1E4E8F'><a href='JsDomElement.md'>js.dom.Element</a> BODY</font></p>
<p><a href='JsDomElement.md'>js.dom.Element</a>  que contem o body do documento.</p>

---


<h2>Métodos Estáticos</h2>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>boolean</font></strong> cache(<a href='JsDomElement.md'>js.dom.Element</a> element)</font></p><p>Adiciona um elemento ao cache. Retorna <strong><font color='#7F0055' face='monospace' size='3'>true</font></strong> se o elemento foi adicionado com sucesso.</p>

---

<p><font color='#1E4E8F'><a href='JsDomElement.md'>js.dom.Element</a> get(<a href='JsCoreString.md'>js.core.String</a> id)</font></p><p>Procura no documento atual por um elemento de ID = id e retorna um <a href='JsDomElement.md'>js.dom.Element</a>  que o representa.</p>

---

<p><font color='#1E4E8F'><a href='JsDomElement.md'>js.dom.Element</a> get(HTMLElement element)</font></p><p>Encapsula o elemento  em um objeto <a href='JsDomElement.md'>js.dom.Element</a>.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreArray.md'>js.core.Array</a> query(<a href='JsCoreString.md'>js.core.String</a> selector)</font></p><p>Executa a query CSS e retorna um array dos elementos resultantes</p>

---

<p><font color='#1E4E8F'>HTMLElement queryNode(<a href='JsCoreString.md'>js.core.String</a> selector)</font></p><p>Executa a query CSS e retorna um elemento resultante</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>boolean</font></strong> unCache(<a href='JsDomElement.md'>js.dom.Element</a> element)</font></p><p>Retira o elemento do cache</p>

---


<h2>Métodos</h2>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> addClass(<a href='JsCoreString.md'>js.core.String</a> className)</font></p><p>Adiciona a classe <i>className</i> a lista de classes do elemento atual</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> append(<a href='JsCoreString.md'>js.core.String</a> html)</font></p><p>Adiciona o codigo html ao existente dentro do elemento.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> append(HTMLElement element)</font></p><p>Adiciona o elemento HTML ao elemento atual.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> append(<a href='JsDomElement.md'>js.dom.Element</a> element)</font></p><p>Adiciona o Element ao elemento atual.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> applyStyle(<a href='JsCoreObject.md'>js.core.Object</a> cssDefinition)</font></p><p>Aplica as propiedades CSS do objeto <i>cssDefinition</i> ao objeto</p>

---

<p><font color='#1E4E8F'><a href='JsCoreArray.md'>js.core.Array</a> children()</font></p><p>Retona todos os elementos dentro do elemento atual</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> destroy()</font></p><p>Executa uma serie de ações para "matar" o elemento da memoria.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> destroyListeners()</font></p><p>Destroi todos os event listeners do elemento</p>

---

<p><font color='#1E4E8F'><a href='JsCoreObject.md'>js.core.Object</a> get(<a href='JsCoreString.md'>js.core.String</a> atributo)</font></p><p>Retorna o valor do <i>atributo</i>.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreObject.md'>js.core.Object</a> getBox()</font></p><p>Retorna um objeto que contem <b>x</b> e <b>y</b> como posição do elemento e <b>w</b> e <b>h</b> como largura e altura do elemento.</p>

---

<p><font color='#1E4E8F'>HTMLElement getDom()</font></p><p>Retorna o elemento HTML encapsulado pelo objeto</p>

---

<p><font color='#1E4E8F'><a href='JsCoreNumber.md'>js.core.Number</a> getHeight()</font></p><p>Retorna a altura do objeto.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreString.md'>js.core.String</a> getHtml()</font></p><p>Retorna o conteudo html do elemento.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreString.md'>js.core.String</a> getId()</font></p><p>Retorna o Id do elemento.</p>

---

<p><font color='#1E4E8F'><a href='JsDomElement.md'>js.dom.Element</a> getParent()</font></p><p>Retorna o elemento pai do objeto.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreObject.md'>js.core.Object</a> getPosition()</font></p><p>Retorna um objeto que possui os attributos <b>x</b> e <b>y</b>  como posição do elemento atual na tela.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreString.md'>js.core.String</a> getText()</font></p><p>Retorna o texto dentro do element.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreNumber.md'>js.core.Number</a> getWidth()</font></p><p>Retorna a largura do objeto.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> on(<a href='JsCoreString.md'>js.core.String</a> event, <strong><font color='#7F0055' face='monospace' size='3'>function</font></strong> handler, Object scope(Optional))</font></p><p>Adiciona a função handler como event listener para o evento event.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> remove(<a href='JsDomElement.md'>js.dom.Element</a> element)</font></p><p>Remove o filho <a href='JsDomElement.md'>js.dom.Element</a>  do elemento atual.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> removeClass(<a href='JsCoreString.md'>js.core.String</a> className)</font></p><p>Remove a classe <i>className</i> do elemento</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> set(<a href='JsCoreString.md'>js.core.String</a> atributo, <a href='JsCoreObject.md'>js.core.Object</a> valor)</font></p><p>Altera o valor do atributo <i>atributo</i> como <i>valor</i>.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> setClass(<a href='JsCoreString.md'>js.core.String</a> className)</font></p><p>Altera a classe do elemento para <i>className</i>.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> setHtml(<a href='JsCoreString.md'>js.core.String</a> code)</font></p><p>Define o codigo HTML dentro do elemento.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> setOpacity(<a href='JsCoreNumber.md'>js.core.Number</a> undefined)</font></p><p>Define a opacidade do elemento. O valor de opacity  deve ser entre 0 e 1.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> setText(<a href='JsCoreString.md'>js.core.String</a> string)</font></p><p>Define o texto dentro do elemento.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreString.md'>js.core.String</a> tag()</font></p><p>Retorna o nome da tag HTML.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> un(<a href='JsCoreString.md'>js.core.String</a> event, <strong><font color='#7F0055' face='monospace' size='3'>function</font></strong> handler(Optional))</font></p><p>Remove a função handler como event listener para o evento event.</p>

---
