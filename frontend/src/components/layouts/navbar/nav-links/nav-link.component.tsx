import { Link } from "react-router-dom";
import { NavLink } from "../../../../domain/entities/nav-link.entity";
import classNames from "classnames";

type NavLinkProps = {
  link: NavLink;
  isActive: boolean;
  setActive: () => void;
};

const NavLinkComponent = ({ link, isActive, setActive }: NavLinkProps) => {
  const { Icon, name, route } = link;

  return (
    <Link
      onClick={setActive}
      to={route}
      className={classNames(
        "text-2xl flex items-center space-x-4",
        isActive ? "text-white-500" : "text-platinum-300"
      )}
    >
      <Icon />
      <span>{name}</span>
    </Link>
  );
};

export default NavLinkComponent;
