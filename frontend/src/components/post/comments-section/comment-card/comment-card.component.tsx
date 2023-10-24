import { Tweet } from "../../../../domain/entities/tweet.entity";
import addressShortner from "../../../../utils/addressShortner";
import moment from "moment";
import bigIntToSeconds from "../../../../utils/bigIntToSeconds";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { User } from "../../../../domain/entities/user.entity";
import ipfsPreviewGenerator from "../../../../utils/ipftPreviewGenerator";

type Props = {
  comment: Tweet;
};

const CommentCard = ({ comment }: Props) => {
  const { content, createdAt, createdBy, id } = comment;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", createdBy), (userDoc) => {
      if (userDoc.exists()) {
        setUser(userDoc.data() as User);
      } else {
        // Handle case where user document doesn't exist
        // For example, set default values or handle error
      }
    });

    return () => {
      // Unsubscribe from the snapshot listener when component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <article className="p-6 text-base border-t border-gray-700 bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={
                user?.image
                  ? ipfsPreviewGenerator(user.image)
                  : "/assets/user_placeholder.png"
              }
              alt={createdBy}
            />
            {addressShortner(createdBy)}
          </p>
          <p className="text-sm text-gray-400">
            {moment(bigIntToSeconds(createdAt)).fromNow()}
          </p>
        </div>
      </footer>

      <p className="text-gray-400">{content}</p>
      <div className="flex items-center mt-4 space-x-4">
        <Link
          to={`/post/${id}`}
          className="flex items-center text-sm text-gray-400 font-medium"
        >
          <svg
            className="mr-1.5 w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Reply
        </Link>
      </div>
    </article>
  );
};

export default CommentCard;
