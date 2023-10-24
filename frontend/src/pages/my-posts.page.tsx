import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUserPosts } from "../store/thunks/posts.thunk";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../store/slices/posts.slice";
import { selectUser } from "../store/slices/user.sllice";
import TweetsGrid from "../components/home/tweets-grid/tweets-grid.component";

const MyPostsPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPosts());
    }
  }, [user, dispatch]);

  const posts = useSelector(selectAllPosts);

  return (
    <div className="w-full max-h-screen p-10 overflow-scroll scrollbar-none">
      <TweetsGrid tweets={posts} />
    </div>
  );
};

export default MyPostsPage;
