const fs = require("fs");
const http = require("http");
const path = require("path");

http
  .createServer((req, res) => {
    const file = req.url === "/" ? "index.html" : req.url;
    const filePath = path.join(__dirname, "public", file);
    const extname = path.extname(filePath);
    const allowedFileTypes = [".html", ".css", ".js"];
    const allowed = allowedFileTypes.find((item) => item === extname);
    if (!allowed) return;
    // if (req.url === "/") {
    fs.readFile(filePath, (err, content) => {
      if (err) throw err;
      res.end(content);
    });
    // }
    // if (req.url === "/contact") return res.end("<h1>Contact</h1>");
  })
  .listen(5000, () => {
    console.log(`Go to http://127.0.0.1:5000`);
  });
