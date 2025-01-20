const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

const uploadRouter = require('./routers/uploadRouter');
const deleteRouter = require('./routers/deleteRouter');

app.use(fileUpload());
app.use(express.static('public'));

app.use(uploadRouter);
app.use(deleteRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});