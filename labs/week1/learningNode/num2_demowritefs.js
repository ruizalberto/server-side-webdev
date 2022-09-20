var fs = require('fs')

//var data1={
 //   name:'bobby'
//}

const content = 'Some content heree!' //data to be written

fs.writeFile('learningNode/dataWrite.txt', content, err => { //writes data to file (bydefault it replaces if the files exists). 4 parameters file, data, options, and a callback function that is called when the method is executed
  if (err) {
    console.error(err+'There was a write error') // error is there's some issues
    return
  }
  //file written successfully
})