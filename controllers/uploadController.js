const path = require('path');
const fs = require('fs');

exports.uploadFile = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const uploadPath = path.join(__dirname, '../uploads/', file.name);

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded!');
    });
};