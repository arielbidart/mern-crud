import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      //elimina la imagen temporal
      await fs.remove(req.files.image.tempFilePath);
      //guarda la url de la imagen en la base de datos
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newpost = new Post({ title, description, image });

    //guarda el dato en la DB
    await newpost.save();

    return res.json(newpost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.send(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postRemove = await Post.findByIdAndDelete(req.params.id);

    if (!postRemove) return res.status(404).send("Post no encontrado");

    //elimino la imagen de cloudinary
    if (postRemove.image.public_id) {
      await deleteImage(postRemove.image.public_id);
    }

    return res.send("Post eliminado");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post no encontrado");
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
