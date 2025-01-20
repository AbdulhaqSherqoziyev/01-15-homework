const path = require('path');
const fs = require('fs');

exports.deleteFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads/', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send('File not found or unable to delete.');
        }

        res.send('File deleted!');
    });
};