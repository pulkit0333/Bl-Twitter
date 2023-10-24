import { useSelector } from "react-redux";
import ConnectWithMetaMask from "../components/common/buttons/connect-with-metamask/connect-with-metamask.component";
import { selectUser } from "../store/slices/user.sllice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConnectPage = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user !== null) {
      let ref = location.state;
      const navigationPath = ref ? ref.redirectPath : "/";
      navigate(navigationPath);
    }
  }, [user, navigate, location.state]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-fit">
        <ConnectWithMetaMask />
      </div>
    </div>
  );
};

export default ConnectPage;
