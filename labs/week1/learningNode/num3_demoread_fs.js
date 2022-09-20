var fs = require('fs')

datajson = require('./data2.json') // data to be read

//console.log(datajson.name) //two objects in the JSON file
//console.log(datajson.age)

fs.readFile("./learningNode/data2.json","utf-8", (err,datajson)=>{ // three parameters filename, encoding, a callback function

    if   (datajson)  // the callback function is called after reading the file. it take two parameters 1. error, 2. content of the file
    {
         var data_json =JSON.parse(datajson) //returns the content of the files
         console.log(data_json.name)
         console.log(data_json.age)
    }
    else
    {
          console.log('Error') // else the error
    }
})