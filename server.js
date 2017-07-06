const express = require('express');
const path = require('path');
const app = express();
const httpProxy = require('http-proxy')

const apiProxy = httpProxy.createProxyServer()

app.use(express.static('./build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.all("/api/*", function(req, res) {
  apiProxy.web(req, res, { changeOrigin: true, target: 'http://django:8080' });
});

app.all("/local-media/*", function(req, res) {
  apiProxy.web(req, res, { changeOrigin: true, target: 'http://minio:9000' });
});

console.log("Skyeye is now rocking on 3000!")
app.listen(3000);
