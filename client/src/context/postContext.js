import React from "react";
import { useState, createContext, useContext } from "react";
import {
  getPostsRequest,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/post";
import { useEffect } from "react";

//Creamos el contexto de las publicaciones
const postContext = createContext();

//Exportamos el contexto que vamos a usar en el componente PostContainer
export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  //Traemos los datos desde el backend
  const getPosts = async () => {
    const res = await getPostsRequest();

    setPosts(res.data);
  };

  const createPost = async (post) => {
    const res = await createPostRequest(post);
    setPosts([...posts, res.data]);
  };

  const deletePost = async (id) => {
    await deletePostRequest(id);
    setPosts(posts.filter((post) => post._id !== id));
  };

  const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data;
  };

  const updatePost = async (id, post) => {
    const res = await updatePostRequest(id, post);
    setPosts(posts.map((p) => (p._id === id ? res.data : p)));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
