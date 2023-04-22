const nullVar = null
const stringified = JSON.stringify(nullVar)
const parsified = JSON.parse(stringified)

console.log(`Starting off with just a null variable...`)
console.log(`nullVar >>: ${nullVar}`)
console.log(`typeof nullVar >>: ${typeof nullVar}`)
console.log(`Testing if nullvar is null value`)
if (nullVar === null) {
    console.log(`nullVar is null`)
}
console.log(`Then we stringify it using JSON.stringify(nullVar)`)
console.log(`stringified >>: ${stringified}`)
console.log(`typeof stringified >>: ${typeof stringified}`)
console.log(`Testing if stringified is null value`)
// does not fire
if (stringified === null) {
    console.log(`stringified is null`)
}
console.log(`Lastly we take stringified and >> JSON.parse(stringified)`)
console.log(`parsified >>: ${parsified}`)
console.log(`typeof parsified >>: ${typeof parsified}`)
console.log(`Testing if parsified is null value`)
if (parsified === null) {
    console.log(`parsified is null`)
}
