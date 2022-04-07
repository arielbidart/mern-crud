import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePosts } from "../context/postContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as Yup from "yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PostForm = () => {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  //Hace que se muestren los campos en el holder del form a editar
  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost(post);
      }
    })();
  }, [params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-5 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl font-bold">Nuevo Post</h3>
          <Link
            to="/"
            className="text-blue-700 text-sm bg-white hover:bg-blue-100 rounded py-2 px-4 "
          >
            Volver
          </Link>
        </header>

        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("El título es requerido"),
            description: Yup.string().required("La descripción es requerida"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }

            actions.setSubmitting(false);

            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="text-sm block 
              text-white"
              >
                Título:
              </label>

              <Field
                placeholder="Título"
                name="title"
                className="bg-gray-600 text-white focus:outline-none rounded py-2 px-4 block w-full"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />

              <label
                htmlFor="description"
                className="mt-2 text-sm block 
          text-white"
              >
                Descripción:
              </label>

              <Field
                component="textarea"
                rows="3"
                placeholder="Descripción"
                name="description"
                className=" bg-gray-600 text-white focus:outline-none rounded py-2 px-4 block w-full"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />

              <label
                htmlFor="file"
                className="mt-2 text-sm block 
          text-white"
              >
                Archivo:
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
                className="block w-full text-sm text-slate-300
      file:mr-4 file:py-2 file:px-4
      file:rounded file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100 pt-1"
              />

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "Guardar"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
