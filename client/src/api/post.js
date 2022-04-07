import axios from "axios";
//con axios nos conectamos al backend y traemos los datos
export const getPostsRequest = async () => await axios.get("/posts");

//Aqui enviamos datos al backend
export const createPostRequest = async (post) => {
  const form = new FormData();

  //transformo el objeto en un formulario y se lo envio al backend
  for (const key in post) {
    form.append(key, post[key]);
  }
  return await axios.post("/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
}
//Aqui eliminamos datos del backend
export const deletePostRequest = async (id) =>
  await axios.delete(`/posts/${id}`);

export const getPostRequest = async (id) => await axios.get(`/posts/${id}`);

//Aqui enviamos nuevos datos al backend para el update
export const updatePostRequest = async (id, newFields) =>
  await axios.put(`/posts/${id}`, newFields);