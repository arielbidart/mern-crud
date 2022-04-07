import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";

export function PostCard({ post }) {

    const { deletePost } = usePosts();
    const navigate = useNavigate();

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white pl-7">Deseas eliminar el post? <strong><br/>{post.title}</strong></p>
          <div className="p-5">
            <button className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm
            text-white rounded-sm mx-2" onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
                }}>
              Eliminar
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 
          text-white py-2 px-3 rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              {" "}
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="bg-gradient-to-r from-indigo-900 bg-stone-900 text-white rounded-sm shadow-md shadow-black
    hover:bg-zinc-700 hover:cursor-pointer"
    onClick={() => navigate(`/posts/${post._id}`)}
    >
      <div className="px-4 py-4">
        <div className="flex justify-between font-bold">
          <h3>{post.title}</h3>
         
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded-xl"
            onClick={(e) => {e.stopPropagation(); handleDelete(post._id)}}
          >
            Borrar
          </button>
        </div>
        <p className="pt-2">{post.description}</p>
      </div>
        {post.image && <img src={post.image.url} alt="post" className="w-full h-96 object-cover" />}
    </div>
  );
}
