# Big O Cheatsheet

This is just a cheat sheet containing some observations about common for loop
patterns taken from Abdul Bari's video series on algorithms.

## For Loops

---
$$ O(n) $$

```c
for (i = 0; i < n; i++) {} // O(n)
for (i = 0; i < n; i = i + 2) {} // = n/2 = O(n)
for (i = n; i > 1; i--) {} // O(n)
```
---

$$ O(n^2) $$

```c
for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {} // O(n^2)
}
```

---
$$ O(log_2(n)log_2(p)) $$

```c
for (i = 1; i < n; i = i * 2) {
    p++; // log_2(n)
}
for (j = 1; j < p; j = j * 2) {
    // log_2(p)
}
// log_2(n) + log_2(p) = O(log_2(n)log_2(p))
```
---

$$ O(log_2(n)) $$

```c
for (i = 1; i < n; i = i * 2) {} // O(log_2(n))
for (i = n; i > 1; i = i / 2) {} // O(log_2(n))
```

---

$$ O(log_3(n)) $$

```c
for (i = 1; i < n; i = i * 3) {} // O(log_3(n)
```

## While Loops

$$ O(n) $$

```c
i = 0;
while (i < n) {
    i++;
} // O(n)
```

---

$$ O(log_2(n)) $$

```c
a = 1;
while (a < b) {
    a = a * 2;
} // O(log_2(n))

/* NOTE:
    a >= b
    a = 2^k // where k represents unknown value of b
    2^k >= b // condition where loop stops
    2^k = b // by making condition where loop stops true...
    k = log_2(b) we can determine that unknown value b stops when k is equal to log_2 of b
    which evaluates to: O(log_2(n))
*/
```

```c
i = n;
while (i > 1) {
    i = i / 2;
}
```

---

$$ O(\sqrt n) $$

```c
i = 1;
k = 1;
while (k < n) {
    k = k + i;
    i++;
}
```

Analyzing the above with some dummy data:

| i  | k             |
| :- | :------------ |
| 1  | 1             |
| 2  | 1 + 1         |
| 3  | 2 + 2         |
| 4  | 2 + 2 + 3     |
| 5  | 2 + 2 + 3 + 4 |
| m  | ...m          |

Which in mathematical notation would be:

$$ \frac{m(m + 1)}{2} $$

We can further analyze this like so:

$$ k \geq n $$

$$ \frac{m(m + 1)}{2} \geq n $$

$$ m^2 \geq n $$

$$ m = \sqrt n $$

Thusly the big O notation of this is:

$$ O(\sqrt n) $$

Note that this is <em>not</em> the same as log_2(n). For an explanation of this,
please see
[this stack overflow answer](https://stackoverflow.com/questions/42038294/is-complexity-ologn-equivalent-to-osqrtn).
According to other sources (GPT), the time complexity of $$ O(\sqrt n) $$

is often unavoidable when a matrix of values is unsorted.

## While loops with If Statements

$$ O(n) $$

The following demonstrates evaluating the GCD(Greatest Common Divisor) between
two numbers:

```c
while (m != n)
{
    if (m > n)
        m = m - n;
    else
        n = n - m;
}
```

Let's take a look at an example where both `m` and `n` start off as equal:

| m | n |
| - | - |
| 5 | 5 |

Since they are equal the condition:

```c
while (m != n)
```

Will never execute, thus the amount of execution steps is 0. Let's look at
another example:

| m  | n |
| -- | - |
| 14 | 2 |

In this case, the condition:

```c
if (m > n)
    m = m - n;
```

Evaluates to `true` and the value of `m` is equal to `m - n`, replaced with `14

- 2`, and thusly`m`is equal to`12`. This continually evaluates down the line
  like so:

| m  | n |
| -- | - |
| 14 | 2 |
| 12 | 2 |
| 10 | 2 |
| 8  | 2 |
| 6  | 2 |
| 4  | 2 |
| 2  | 2 |

At which point the loop stops because the condition:

```c
while (m != n)
```

Evaluates to `false`, and the loop ends, resulting in the loop having executed 7
times. We add 1 to the amount of times it is executed by nature of the initial
loop, and it is 8. This evaluates to

$$ \frac{16}{2} $$

or:

$$ \frac{n}{2} $$

Which, in big O notation, evaluates to:

$$ O(n) $$

The <em>minimum</em> time to execute is at least one time, thusly the minimum
time complexity is:

$$ O(1) $$

## Best Case vs. Worst Case

```c
void some_algo_test(int n)
{
    if (n < 5)
        printf("%d\n", n); // 1
    else
        for (int i = 0; i < n; i++)
            printf("%d\n", i); // n
}
```

This evaluates in best case to:

$$ O(1) $$

This happens when the condition `n < 5` evaluates to `true`, because all it does
is print the value of `n` to the console.

Otherwise, if `n < 5` evaluates to false (i.e. n is a value greater than or
equal to 5), then the worst case time complexity occurs, which is:

$$ O(n) $$

In essence:

**BEST CASE**:

$$ O(1) $$

**WORST CASE**:

$$ O(n) $$

---

Now let's adjust our function a bit:

```c
void some_algo_test(int n)
{
    if (n < 5)
        printf("%d\n", n); // 1
    for (int i = 0; i < n; i++)
        printf("%d\n", i); // n
}
```

Note here, that now, the `for` loop executes regardless of the `if (n < 5)`
condition. Thusly the best and worst case scenario become the same:

$$ O(n) $$

## Types of Time Functions

**Constant:**

$$ O(1) $$

**Logirithmic:**

$$ O(log(n)) $$

**Linear:**

$$ O(n) $$

**Quadratic:**

$$ O(n^2) $$

**Cubic:**

$$ O(n^3) $$

**Exponential:**

$$ O(2^n) $$

## Order of Types of Time Function

$$ 1 < log(n) < \sqrt n < n < n(log(n)) < n^2 < n^3 < ...  2^n < 3^n .... < n^n $$
