import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectUser, setActiveTab } from "../../../store/slices";
import { useAppDispatch } from "../../../store/hooks";
import { navLinks } from "../../../constants";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setActiveTab(navLinks.findIndex((val) => val.route === location.pathname))
    );
  }, [location.pathname, dispatch]);

  if (user === null) {
    return (
      <Navigate state={{ redirectPath: location.pathname }} to="/connect" />
    );
  }
  return children;
};
