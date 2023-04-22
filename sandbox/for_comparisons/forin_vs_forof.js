// https://stackoverflow.com/questions/29285897/what-is-the-difference-between-for-in-and-for-of-statements

// heavily mutated array to demonstrate
const arr = [3, 5, 7]
arr['foo'] = "hello"
arr.bar = 'there'
arr[0] = 'what?'

console.log('arr :=>', arr)

console.log('for in loop...')
for (const key in arr) {
    console.log(key) // returns 0 1 2 foo
}

console.log('for in with key/value...')
for (const key in arr) { // returns all key/val
    const val = arr[key]
    console.log('key :=>', key)
    console.log('val :=>', val)
}

// for of is array specific
console.log('for of loop...')
for (const val of arr) {
    console.log(val)
    // returns 3 5 7 (not hello..., no key/value values)
}

// but can go over object.entries as it is an array
console.log('for of with key/value...')
for (const [key, val] of Object.entries(arr)) { // returns all key/val
    console.log('key :=>', key)
    console.log('val :=>', val)
}

// NOTE: for of can work with async calls whereas forEach cannot:
// https://stackoverflow.com/questions/67739881/async-foreach-containing-array-pushvalue-not-working
