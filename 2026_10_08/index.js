let http = require('http');
const fs = require('fs');
const mime = require("mime-types");
http.createServer(function (req, res) {
    const {method, url} = req;
    const parseUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parseUrl.pathname;
    var mime = require('mime-types');

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
            fs.readFile("assets/marylarodowicz.html", 'utf8', (err, data) => {
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
    else if(pathname === "/get_params")
    {
        const fs = require('fs');
        res.writeHead(200, {'Content-Type': 'text/html'});
        response = {
            ok: "ok"
        };
        let data = JSON.stringify(response);
        fs.writeFileSync('./params_' + Date.now() + ".json", data);
        res.end(data);
    }
    //2 wersje bo polecen nie umiem czytac xd
    /*if(mime.lookup(pathname) !== false)
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(mime.lookup(pathname));
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("nie dziala")
    }*/
    if(fs.existsSync("./assets" + pathname) === true)
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(mime.lookup("./assets" + pathname));
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("ni ma")
    }

}).listen(6767);