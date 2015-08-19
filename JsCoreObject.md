# Class Object #
**Package:** js.core<br />
**File:** [Object.js](http://code.google.com/p/jsool/source/browse/trunk/jsool/js/core/Object.js)<br />
**Extends:** Object<br />

---

Class Object is the root of the class hierarchy. Every class has Object as a superclass. All objects, including arrays, implement the methods of this class.
### Public Attributes ###
| **Name** | **Type** | **Description** |
|:---------|:---------|:----------------|
|cls       |class     |An object that represents the class of the object|

### Public Methods ###
| **Name** | **Parameters** | **Description** |
|:---------|:---------------|:----------------|
|toString  |_void_          |Returns an String representation of the current object|
|hashCode  |_void_          |Returns a number that identifies the object|
|equals    |Object object   |Checks if _object_ is equals the current object|
|instanceOf|Class class     |Checks if the current object if of _class_ type|