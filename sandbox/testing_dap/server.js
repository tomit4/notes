// simple file for testing out nvim-dap
// see: https://github.com/mfussenegger/nvim-dap
// https://github.com/mfussenegger/nvim-dap/wiki/Debug-Adapter-installation#Javascript

const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
