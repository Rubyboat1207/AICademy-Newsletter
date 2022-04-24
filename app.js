const http = require("http");
const fs = require('fs').promises;


const hostname = '192.168.254.129';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  //get url without parameters
  var url = req.url.split("?")[0].replace(/%20/g, ' ');
  if(url == "/"){
    url = "/index.html";
  }
  if(url.substring(url.length - 5) == ".info")
  {
    if(url == "/articles.info")
    {
      //get list of all files in the articles directory
      fs.readdir("./articles").then(function(files){
        var fileList = "";
        for(var i = 0; i < files.length; i++)
        {
          fileList += files[i] + ",";
        }
        res.end(fileList);
      }).catch(function(err){
        console.log("big boy error");
      });
    }
  }else{
    fs.readFile(__dirname + url)
    .then(function(contents) {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
    }).catch(function(err) {
        res.writeHead(500);
        res.end(err);
    });
  }
  console.log(url);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});