import { useSelector } from "react-redux";
import { selectUser, selectUserStatus } from "../../../store/slices";
import { useEffect, useState } from "react";

type Props = {};

const UserProgress = (props: Props) => {
  const userStatus = useSelector(selectUserStatus);
  const user = useSelector(selectUser);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (userStatus && user) {
      const currentLevel = user.level;
      const currentLikes = Number(userStatus.data.totalLikesReceived);
      const likesRequired = currentLevel * 5;
      const progress = (currentLikes / likesRequired) * 100;
      setProgress(progress);
    }
  }, [userStatus, user]);

  return (
    <div className="">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-white">
          {progress === 100
            ? "Congratulations 🎉 New level reached!"
            : "Next Level"}
        </span>
        <span className="text-sm font-medium text-white">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full rounded-full h-2.5 bg-gray-700">
        <div
          className="bg-violet-400 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default UserProgress;
