let http = require('http');
const fs = require('fs');
http.createServer(function (req, res) {
    const {method, url} = req;
    const parseUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parseUrl.pathname;

    if(pathname === "/")
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World!');
    }
    else if(pathname === "/syf.json")
    {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ x: 5, y: 6 }));
    }
    else if(pathname === "/html")
    {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("<p>AAAAA</p>");
    }
    else if(pathname === "/plik")
    {
        try{
            fs.readFile("marylarodowicz.html", 'utf8', (err, data) => {
                if(err) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.write("dfjkhgkdfjhgldfjkghdfkjlghdfksghksdfg");
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            })
        }
        catch (error)
        {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.write("n dziala");
        }

    }

}).listen(6767);