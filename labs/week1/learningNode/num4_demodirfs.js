var fs = require('fs')

fs.readdir('/Users/Kashif.Ahmad',(err,data)=>{ // reads the content of a directory. parameters include path, options, and a callback function
    console.log(data) //a buffer containing list of the files
    
})