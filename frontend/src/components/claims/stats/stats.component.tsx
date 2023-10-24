import StatsGrid from "./stats-grid/stats-grid.component";
import { AiFillLike } from "react-icons/ai";
import { SiOpslevel } from "react-icons/si";
import { FaComment } from "react-icons/fa";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { useSelector } from "react-redux";
import {
  selectUser,
  selectUserStatus,
} from "../../../store/slices/user.sllice";
import { fetchUserStatus } from "../../../store/thunks/user.thunk";
import UserProgress from "../user-progress/user-progress.component";

const UserStats = () => {
  const dispatch = useAppDispatch();
  const userStatus = useSelector(selectUserStatus);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserStatus());
    }
  }, [user]);

  return (
    <div className="space-y-4">
      <StatsGrid
        stats={[
          {
            name: "Likes Count",
            value: Number(userStatus.data.totalLikesReceived),
            Icon: AiFillLike,
          },
          {
            name: "Current Level",
            value: user ? user.level : 0,
            Icon: SiOpslevel,
          },
          {
            name: "Comments Count",
            value: Number(userStatus.data.totalCommentsReceived),
            Icon: FaComment,
          },
        ]}
      />

      <UserProgress />
    </div>
  );
};

export default UserStats;
