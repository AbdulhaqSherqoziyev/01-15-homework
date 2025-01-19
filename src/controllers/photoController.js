const fs = require("fs");
const path = require("path");

const photos = [];

const photoController = {
  async create(req, res) {
    try {
      const { file } = req;
      if (!file) {
        return res.status(400).send({ message: "No file uploaded!" });
      }

      const newPhoto = {
        id: photos.length + 1,
        filename: file.filename,
        path: file.path,
        uploadedAt: new Date(),
      };

      photos.push(newPhoto);

      res
        .status(201)
        .send({ message: "Photo uploaded successfully!", photo: newPhoto });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error uploading photo", error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      res.status(200).send(photos);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error fetching photos", error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).send({ message: "Invalid ID format!" });
      }
      const photo = photos.find((p) => p.id === parseInt(id));

      if (!photo) {
        return res.status(404).send({ message: "Photo not found!" });
      }

      res.status(200).send(photo);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error fetching photo", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { file } = req;

      if (isNaN(id)) {
        return res.status(400).send({ message: "Invalid ID format!" });
      }

      const photoIndex = photos.findIndex((p) => p.id === parseInt(id));
      if (photoIndex === -1) {
        return res.status(404).send({ message: "Photo not found!" });
      }

      const updatedPhoto = {
        ...photos[photoIndex],
        filename: file ? file.filename : photos[photoIndex].filename,
        path: file ? file.path : photos[photoIndex].path,
        updatedAt: new Date(),
      };

      photos[photoIndex] = updatedPhoto;

      res
        .status(200)
        .send({ message: "Photo updated successfully!", photo: updatedPhoto });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error updating photo", error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id)) {
        return res.status(400).send({ message: "Invalid ID format!" });
      }

      const photoIndex = photos.findIndex((p) => p.id === parseInt(id));
      if (photoIndex === -1) {
        return res.status(404).send({ message: "Photo not found!" });
      }

      const [deletedPhoto] = photos.splice(photoIndex, 1);
      await fs.promises.unlink(path.resolve(deletedPhoto.path)); // Asynchronous unlink

      res.status(200).send({ message: "Photo deleted successfully!" });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error deleting photo", error: error.message });
    }
  },
};

module.exports = { photoController };