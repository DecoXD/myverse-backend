const express = require('express');
const multer = require('multer');
const path = require('path')

const storage =  multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,'public/images')
    },
    
  
    filename:(req,file,cb) => {
        
        const uniqueSuffix = Date.now() + Math.round(Math.random()* 1000)
        cb(null,path.join(file.fieldname + '-' + uniqueSuffix) + path.extname(file.originalname))
    }
   

   })
 

const upload = multer({
    storage:storage,

    fileFilter:(req,file,cb) => {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('são aceitos apenas arquivos png e jpg'))
        }
        cb(null,true)
    }
})



module.exports = upload