<h1>Classe <font color='#1E4E8F'>Array</font></h1>
<p><strong>pacote: </strong>js.core</p>
<p><strong>arquivo: </strong><a href='http://code.google.com/p/jsool/source/browse/trunk/jsool/js/core/Array.js'><font color='#1E4E8F'>Array.js</font></a></p>
<p><strong>extende: </strong><font color='#1E4E8F'><a href='JsCoreObject.md'>js.core.Object</a></font></p>

---

Um Array é utilizado para guardar de maneira indexada varios valores em apenas uma variavel.

---


<h2>Atributos:</h2>

---

<p><font color='#1E4E8F'><a href='JsCoreNumber.md'>js.core.Number</a> MAX_LENGTH</font></p>
<p>Maior comprimento possivel para um array.</p>

---


<h2>Métodos Estáticos</h2>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>boolean</font></strong> isArray(<a href='JsCoreObject.md'>js.core.Object</a> objeto)</font></p><p>Verifica se o objeto passado como parametro é um Array</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> iterate(<a href='JsCoreArray.md'>js.core.Array</a> array, <strong><font color='#7F0055' face='monospace' size='3'>function</font></strong> func)</font></p><p>Executa a função <i>func(index, el)</i> para cada elemento do array onde <i>index</i> é o indice do elemento no array e <i>el</i> é o elemento no atual indice do array.</p>

---


<h2>Métodos</h2>

---

<p><font color='#1E4E8F'><a href='JsCoreArray.md'>js.core.Array</a> clone()</font></p><p>Cria uma cópia do array</p>

---

<p><font color='#1E4E8F'><a href='JsCoreArray.md'>js.core.Array</a> concat(<a href='JsCoreArray.md'>js.core.Array</a> array)</font></p><p>Retorna um novo array com a concatenação do array atual mais o <i>array</i>.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>boolean</font></strong> contains(<a href='JsCoreObject.md'>js.core.Object</a> objeto)</font></p><p>Retorna <strong><font color='#7F0055' face='monospace' size='3'>true</font></strong> se o <i>objeto</i> esta presente no array.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreArray.md'>js.core.Array</a> filter(<strong><font color='#7F0055' face='monospace' size='3'>function</font></strong> action)</font></p><p>Retorna um array apenas com os elementos que retornam <strong><font color='#7F0055' face='monospace' size='3'>true</font></strong> ao executar a função <i>action</i>.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreNumber.md'>js.core.Number</a> indexOf(<a href='JsCoreObject.md'>js.core.Object</a> objeto)</font></p><p>Retorna o indice do objeto no array.</p>

---

<p><font color='#1E4E8F'><a href='JsCoreArray.md'>js.core.Array</a> map(<strong><font color='#7F0055' face='monospace' size='3'>function</font></strong> action)</font></p><p>Retorna um novo array com o resultado da execução da função <i>action</i> em cada elemento do array.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> remove(<a href='JsCoreObject.md'>js.core.Object</a> objeto)</font></p><p>Remove o <i>objeto</i> do array.</p>

---

<p><font color='#1E4E8F'><strong><font color='#7F0055' face='monospace' size='3'>void</font></strong> shuffle()</font></p><p>Embaralha os elementos do array;</p>

---
