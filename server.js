const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Multer konfiguratsiyasi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Public papkasini statik qilib sozlash
app.use(express.static('public'));

// Fayl yuklash endpointi
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.send('File uploaded successfully.');
    } catch (error) {
        res.status(400).send('Error uploading file.');
    }
});

// Serverni ishga tushirish
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});