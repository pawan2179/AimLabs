const express = require ("express");
const path = require ("path");

const port = 5000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
const server = app.listen(port, () => {
    console.log(`Listening to ${port}`);
});