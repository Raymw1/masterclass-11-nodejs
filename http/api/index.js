const fs = require("fs");
const path = require("path");
const http = require("http");
const URL = require("url");
const data = require("./urls.json");

function writeFile(message, cb) {
  fs.writeFile(
    path.join(__dirname, "urls.json"),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err;
      cb(JSON.stringify({ message, ...data }));
    }
  );
}

http
  .createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query;

    res.writeHead(200, { "Access-Control-Allow-Origin": "*" });

    if (!name || !url) {
      return res.end(JSON.stringify(data));
    }

    if (del) {
      data.urls = data.urls.filter((item) => String(item.url) !== String(url));
      return writeFile("Deleted", (result) => res.end(result));
    }

    data.urls.push({ name, url });

    return writeFile("Created", (result) => res.end(result));
  })
  .listen(3000, () => {
    console.log(`Go to http://127.0.0.1:3000`);
  });
