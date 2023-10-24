import ButtonPrimary from "../../common/buttons/button-primary/button-primary.component";
import NavLinks from "./nav-links/nav-links.component";
import { togglePostModalOpen } from "../../../store/slices";
import ConnectWithMetaMask from "../../common/buttons/connect-with-metamask/connect-with-metamask.component";
import { useAppDispatch } from "../../../store/hooks";
import { navLinks } from "../../../constants";

const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="w-full space-y-10 flex flex-col h-full p-6 border-r border-r-platinum-200">
      <div className="">Twitter3</div>
      <NavLinks links={navLinks} />
      <div className="space-y-4">
        <ButtonPrimary
          text="Post"
          action={() => dispatch(togglePostModalOpen())}
        />
        <ConnectWithMetaMask />
      </div>
    </div>
  );
};

export default Navbar;
