'use strict'
// flattens javascript object and returns an array of all values
const deflateObject = (obj) => {
    const result = []
    const deflate = (obj) => {
        return Object.keys(obj).forEach(key => {
            return typeof obj[key] === 'object' && obj[key]
                ? deflate(obj[key])
                : typeof obj[key] === 'function'
                ? result.push(obj[key]())
                : obj[key]
                ? result.push(obj[key])
                : ''

        })
    }
    deflate(obj)
    return result
}
