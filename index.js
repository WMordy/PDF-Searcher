const PdfParse = require("pdf-parse")
const express = require("express")
const fs = require("fs")


var app = express()
const FILES_DIR = "/home/wmordy/Projects/Web Dev/PDF browser/files"


/* var discoverFile = (dataBuffer,file,keyword)=>{
    return new Promise((resolve,reject)=>{
        PdfParse(dataBuffer).then((data)=>{
            let occurences = {file : file , occurances : (data.text.split(keyword).length -1) }
            console.log(occurences)
            resolve(occurences)
    
        }).catch(err=>reject(err))
    })
} */
var discoverFile2 = (dataBuffer,file,keyword)=>{
      return new Promise((resolve,reject)=>{
        PdfParse(dataBuffer).then((data)=>{
            let occurences = {file : file , occurances : (data.text.split(keyword).length -1) }
            console.log(occurences)
            resolve(occurences)
    
        }).catch(err=>(reject(err)))
      })

}
app.get("/occ/:keyword",async (req,res)=>{
    var keyword = req.params.keyword
    selectedFiles = []
    files =  fs.readdirSync(FILES_DIR)
    Promise.all(files.map(async (file)=>{
        let dataBuffer = fs.readFileSync(`${FILES_DIR}/${file}`);
        let result =  discoverFile2(dataBuffer,file,keyword)
       return result
    })).then(values=>res.json(values))
})
/* app.get("/:keyword",async (req,res)=>{
    var keyword = req.params.keyword
    selectedFiles = []
    files =  fs.readdirSync(FILES_DIR)
    selectedFiles = await files.map(async (file)=>{
        let dataBuffer = fs.readFileSync(`${FILES_DIR}/${file}`);
        let result = await discoverFile2(dataBuffer,file,keyword)
       return result
       
       
    })
    console.log(keyword)
    console.log(selectedFiles)
   
    
    res.json(selectedFiles) 
    
}) */





const PORT = 5000
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})