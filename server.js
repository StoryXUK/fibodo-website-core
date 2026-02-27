const http=require('http'),fs=require('fs'),path=require('path');
const d=__dirname;
const m={'.html':'text/html','.css':'text/css','.js':'application/javascript','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'};
http.createServer((q,r)=>{let p=q.url==='/'?'/index.html':q.url;fs.readFile(path.join(d,decodeURIComponent(p)),(e,b)=>{if(e){r.writeHead(404);r.end('Not found');return;}r.writeHead(200,{'Content-Type':m[path.extname(p).toLowerCase()]||'application/octet-stream'});r.end(b);});}).listen(3000,'0.0.0.0',()=>console.log('ready'));
