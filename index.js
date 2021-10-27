const express = require('express');
const app = express()
const port = 4000;

app.get('/', (req, res) => {
    res.send("volunteer server open");
});

app.listen(port, () => {
    console.log("volunteer server port", port)
});
