import { useParams } from "react-router-dom";
import CommentsSection from "../components/post/comments-section/comments-section.component";
import { useEffect } from "react";
import { fetchPostById } from "../store/thunks/posts.thunk";
import { useAppDispatch } from "../store/hooks";
import PostHeader from "../components/post/post-header/post-header.component";

const PostPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params && params.id) {
      dispatch(fetchPostById(params.id));
    }
  }, [params]);

  return (
    <div className="w-full max-h-screen p-10 overflow-scroll">
      <article className="space-y-16 p-6 text-gray-50">
        <div className="space-y-6">
          <PostHeader />
          <CommentsSection />
        </div>
      </article>
    </div>
  );
};

export default PostPage;
