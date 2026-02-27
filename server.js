const http = require('http');
const fs = require('fs');
const path = require('path');
const types = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let p = req.url.split('?')[0];
  if(p==='/') p='/index.html';
  const fp = path.join(__dirname, p);
  const ext = path.extname(fp).toLowerCase();
  fs.readFile(fp,(err,data)=>{
    if(err){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(data);
  });
}).listen(8000);
