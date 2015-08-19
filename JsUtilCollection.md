# js.util.Collection #
**pacote:** js.util<br />
**arquivo:** [Collection.js](http://code.google.com/p/jsool/source/browse/trunk/jsool/js/util/Collection.js)<br />
**extende:** [js.core.Object](JsCoreObject.md)<br />

---

Interface que define métodos para lidar com coleções de objetos.

---

### Métodos ###
| **Função** | **Descrição** |
|:-----------|:--------------|
|void add(Object object)|Adiciona o objeto _object_ a coleção|
|void addAll([Collection](JsUtilCollection.md) collection)|Adiciona todos os elementos da coleção _collection_ a coleção atual|
|boolean contains(Object object)|Verifica se a coleção atual possui o objeto _object_|
|boolean isEmpty()|Retorna `true` se a coleção estiver vazia|
|Number size()|Retorna a quantidade de elementos na coleção atual|
|js.util.Iterator iterator()|Retorna um objeto que auxilia a iterar com a coleção atual|
|void remove(Number index)|Remove o elemento que reside na posição _index_ da coleção.|
|[Array](JsCoreArray.md) toArray()|Retorna um array com todos os elementos da coleção.|