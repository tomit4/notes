const iterable = [10, 20, 30]
const iterableTwo = { one: 10, two: 'hi', three: [10, 20, 30]}

const iterateOverArr = (arr) => {
    for (const [key, value] of Object.entries(arr)) {
        console.log(`key of Arr: ${key}`, `value of Arr: ${value}`)
    }
}

const iterateOverObj = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        console.log(`key of Obj: ${key}`, `value of obj: ${value}`)
    }
}

const callIterable = (data) => {
    if (Array.isArray(data)) {
        iterateOverArr(data)
    } else if (typeof data === 'object'){
        iterateOverObj(data)
    } else {
        const type = typeof data
        console.log(`${data} is not an array or object`)
        console.log(`${data} is a ${type}`)
    }
}

callIterable(iterable)
callIterable(iterableTwo)
callIterable('test')
callIterable(5)
