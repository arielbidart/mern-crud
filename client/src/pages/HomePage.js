import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { PostCard } from "../components/PostCard";

//utilizando LInk para navegar no se refresca la pagina y no pierdo el estado, lo mantengo.
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { getPosts, posts } = usePosts();

  const renderMain = () => {
    if (posts.length === 0)
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="text-white">No hay posts</h1>
        </div>
      );

    return (
      <div className="grid gap-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div className="text-white">
      <header className="flex justify-between py-4">
        <h1 className="text-2xl text-gray-300 font-bold ">
          Post ({posts.length})
        </h1>
        <Link
          to="/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded "
        >
          Crear Nuevo Post
        </Link>
      </header>
      {renderMain()}
    </div>
  );
};
