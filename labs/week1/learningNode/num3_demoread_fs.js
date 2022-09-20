var fs = require('fs')

datajson = require('./data.json') // data to be read

console.log(datajson.name) //two objects in the JSON file
console.log(datajson.age)


fs.readFile("./data.json","utf-8", (err,data)=>{ // three parameters filename, encoding, a callback function

    if   (data)  // the callback function is called after reading the file. it take two parameters 1. error, 2. content of the file
    {
         var data_json =JSON.parse(data) //returns the content of the files
         console.log(data_json.name)
    }
    else
    {
          console.log('Error') // else the error
    }
})