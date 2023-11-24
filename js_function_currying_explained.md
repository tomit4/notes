## My Best Attempts to Understand Function Currying in JavaScript

Recently while working on a React project, I saw an interesting use case where
a useRef({}) needed to be updated upon user interaction with a checkbox. Upon
consulting with ChatGPT, it spat out this as one small part of it's solution:

```
const toggleLinks = useRef({})

const saveToggleRef = id => elementRef => {
    toggleLinks.current[id] = elementRef
}
```

When asking why the second arrow function was being done here, I was
reintroduced to the concept of function currying and how it worked. As a
beginner, I thought I knew what function currying was, but this proved the point
that (as always), when I think I know something, I don't. So let's dive in a bit
into what function currying is.

I decided to investigate more just what function currying is within the context of Vanilla JS, and came across [this stackoverflow query](https://stackoverflow.com/questions/51567907/how-does-a-reference-in-closure-and-currying-work-in-js).

The questioner simply posed their confusion at the following code:

```
function add(a) {
    console.log("1");
    var total = a;
    console.log("2");
    var _fn = function (b) {
        console.log("3");
        total += b;
        console.log("4");
        return _fn;
    };
    console.log("5");
    _fn.toString = _fn.valueOf = function () {
        console.log("6");
        return total;
    };
    console.log("7");
    console.log("_fn: " + _fn);
    return _fn;
}
```

Which upon running add(1)(2) outputs:

```
1
2
5
7
6
_fn: 1
3
4
6
ƒ 3
```

The questioner posits that technically the inner function \_fn, should create an
infinite loop due to its reference to itself, but as the person who has the
highest voted answer points out, \_fn is never called, but rather is simply
returned out of itself, and then also returned from the original function after
it is given an additional property, toString. If \_fn were called/invoked within itself,
then yes this creates an infinite loop, but this never happens.

This points to an interesting aspect of JavaScript which is that everything is
an Object. Consider the definition of \_fn:

```
var _fn = function (b) {
    console.log("3");
    total += b;
    console.log("4");
    return _fn;
};
```

Consider this as being like an Object with a variable b that is associated with
it, and assigned to the [args] array (keep in mind, beginner here, terms could
be incorrect). Taking away the console logs, let's look at the total (initially assigned
to our first outer functions first argument, a), which takes its original value
and adds it to our inner functions first argument, to b. It then RETURNS ITSELF.
Given what we know thus far, it means that the value of total should now be 3
when \_fn is called, which is done when the original function is called in its
invocation add(1)(2). The second call (2), is what invokes \_fn as far as I know.

Notice, however, that we have a third function curried up to \_fn:

```
_fn.toString = _fn.valueOf = function () {
    console.log("6");
    return total;
};
```

We're now overwriting Object primitives, \_fn.toString is reassigned to
\_fn.valueOf (in this case \_fn), which is then reassigned to returning the total.

The print values are there to show the order of operations, take a look again
and notice that they are not in order:

```
1
2
5
7
6
_fn: 1
3
4
6
ƒ 3
```

An interesting piece of confusing magic is happening here due to the way the JS
runtime runs synchronously. The reassigning of \_fn.toString to the value
returned of \_fn.valueOf, which itself is reassigned to simply return the total
returns 1, but this is our original value in add(1)(2)??? This is because this
statement:

```
return total;
```

Within the \_fn.toString... function has yet to read the adjusted:

```
total += b;
```

Within the original declaration of \_fn. However, then the last line finally
returns the \_fn function, which has a valueOf within it. At this point the
entire runtime of the JavaScript function is complete and total HAS BEEN
reassigned to:

```
total += b;
```

And thusly add(1)(2) will indeed return 3, producing our final line in the
output:

```
ƒ 3
```

The cursive style 'ƒ' character indicates the return of a function instead of a
value, but it also shows its return value (as it returns itself I suppose). I'll
admit this aspect of the output still confuses me, but we'll get there...
