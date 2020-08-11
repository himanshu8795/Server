const http = require('http');
const fs= require('fs');
const path =require('path');
const hostname ="localhost";
const port= 3000;
const server = http.createServer((req,res)=>{
    console.log(req.headers);

    console.log('requesdt for '+req.url+'by method'+req.method);
if(req.method=='GET'){
var fileURL;
if(req.url=='/'){
    fileURL="/index.html";
}
else{
    fileURL= req.url;
}

var filePath= path.resolve('./public'+fileURL);
const fileExt= path.extname(filePath);
if(fileExt=='.html')
{
    fs.exists(filePath,(exists)=>{
        if(!exists){

            res.statusCode=404;
            res.setHeader('Content-type','text/html');
            res.end(`<html><body><h1>error 404 :  ${fileURL}</h1></body></html>`);
            
        }else{
        res.statusCode=200;
        res.setHeader('Content-type','text/html');
        fs.createReadStream(filePath).pipe(res);
        }
    })
} 
}
});
server.listen(port,hostname,()=>{
 console.log(`server is at http:${hostname}:${port}`);
});