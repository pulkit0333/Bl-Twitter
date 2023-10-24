import { NavLink } from "../../../../domain/entities/nav-link.entity";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectActiveTab,
  setActiveTab,
} from "../../../../store/slices/navigation.slice";
import NavLinkComponent from "./nav-link.component";

type Props = {
  links: NavLink[];
};

function NavLinks({ links }: Props) {
  const activeTab = useAppSelector(selectActiveTab);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-6 flex-1">
      {links.map((link, idx) => {
        return (
          <NavLinkComponent
            isActive={activeTab === idx}
            setActive={() => dispatch(setActiveTab(idx))}
            link={link}
            key={idx}
          />
        );
      })}
    </div>
  );
}

export default NavLinks;
