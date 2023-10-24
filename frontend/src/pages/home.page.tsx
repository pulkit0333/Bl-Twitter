import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { fetchAllPosts } from "../store/thunks/posts.thunk";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/slices/posts.slice";
import TweetsGrid from "../components/home/tweets-grid/tweets-grid.component";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const posts = useSelector(selectAllPosts);

  return (
    <div className="w-full max-h-screen p-10 overflow-scroll scrollbar-none">
      <TweetsGrid tweets={posts} />
    </div>
  );
};

export default Home;
