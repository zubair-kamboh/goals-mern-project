var fs = require('fs')
const path = require('path')

// fs.mkdir(path.join(__dirname, 'folderr'), (err) => {
//   if (err) throw err
//   console.log('folder created successfully')
// })

// fs.link(
//   path.join(__dirname, 'txt.txt'),
//   path.join(__dirname, '2.txt'),
//   (err) => {
//     if (err) throw err
//     console.log('linked')
//   }
// )

// fs.readdir(__dirname, { withFileTypes: false }, (err, files) => {
//   console.log('\nCurrent directory files:')
//   if (err) console.log(err)
//   else {
//     files.forEach((file, i) => {
//       console.log(file, i)
//     })
//   }
// })

// fs.readFile(__dirname + '/hello.txt', 'utf-8', (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// fs.exists(__dirname + '/hello.txt', (exists) => {
//   console.log(exists)
// })

// fs.truncate(__dirname + '/hello.txt', 2, (err) => console.log('done'))

const url = require('url')

const newUrl = new URL(
  'https://www.geeksforgeeks.org/p/a/t/h?query=string#hash'
)

// url array in JSON Format
console.log(newUrl)

const myUR = url.parse(
  'https://www.geeksforgeeks.org/:3000/p/a/t/h?query=string#hash'
)
console.log(myUR)
// console.log(URL === require('url').URL)

// const myURL1 = new URL({ toString: () => 'https://geeksforgeeks.org/' })

// console.log(myURL1.href)
