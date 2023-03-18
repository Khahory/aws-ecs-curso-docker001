const http = require('http');
const os = require('os');
const interfaces = os.networkInterfaces();

const ips = Object.keys(interfaces)
    .map(i => interfaces[i]
        .filter(details => details.family === "IPv4")
        .map(details => details.address)
    ).reduce((prev, curr) => [...prev, ...curr], []);

const server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Khahory is the best! XD');
    res.write('Hello World from:');
    res.write(`${JSON.stringify(ips, "", 2)}`);
    res.end();
});

const port = 8001;
const host = "0.0.0.0";

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});