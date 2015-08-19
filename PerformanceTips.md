_NOTE:_ Most of these performance tips are not so significant individually but on a large scale, it can make some difference.

Good Luck!

# Performance Tips #

  * [For Loops](PerformanceTips#For_Loops.md)
  * [Mathematical Operations](PerformanceTips#Mathematical_Operations.md)

## For Loops ##

**Case 1:** Simple index loop;
```
    var arr = new Array(10000);
    for(var i = arr.length; i--;){
        //... do cool stuff with array items
    }
```
Using a new variable to store the array length, makes no diference to performance.

**Case 2:** Loop and reference current item into a variable:
```
    var array = new Array(10000);
    for( var i = 0, item; item = array[i++];){
        //... do stuff with "item"
    }
```
This case is faster if you want a reference of the current item but dont have to change its value on array

## Mathematical Operations ##
**Tip:**

Operators like -=, +=, /=, `*`= ... are faster than reading the variable and "operating" it:
```
var a = 0;
//Slower
for(var i = 10000;i--;){
    a = a + i;
}



//Faster
for(var j = 10000;j--;){
    a += j;
}
```