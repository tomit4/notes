const arr = [0, 1, 2 ,3]
const arr2 = [1, 2, 3 ,4]

Object.keys(arr).forEach(key => console.log(`key >>: ${key}`))
Object.keys(arr2).forEach(key => console.log(`arr2[key] >>: ${arr2[key]}`))
Object.values(arr2).forEach(val => console.log(`val >>: ${val}`))
