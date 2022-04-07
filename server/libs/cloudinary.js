import { v2 as cloudinary } from "cloudinary";

//me conecto a cloudinary par almacenar las imagenes
cloudinary.config({ cloud_name: "damenbnq6", api_key: "883116536952173", api_secret: "BK7WBadSy7wfyDIrSHkyeeFdwb0" });

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
}
