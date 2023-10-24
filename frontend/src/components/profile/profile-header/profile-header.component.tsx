import { Link } from "react-router-dom";
import { User } from "../../../domain/entities/user.entity";
import ipfsPreviewGenerator from "../../../utils/ipftPreviewGenerator";
import { SiOpslevel } from "react-icons/si";
import { SiOpensea } from "react-icons/si";

type Props = {
  user: User;
};

const ProfileHeader = ({ user }: Props) => {
  const { address, image, description, level } = user;

  return (
    <div className="p-6 sm:p-12 w-full bg-gray-900 text-gray-100">
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
        <img
          src={
            image ? ipfsPreviewGenerator(image) : "/assets/user_placeholder.png"
          }
          alt={address}
          className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start bg-gray-500 border-gray-700"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-center md:text-left">
            {address}
          </h4>

          <div className="space-x-4 flex items-center">
            <div className="flex items-center space-x-2 text-sm">
              <SiOpslevel className="text-white w-3 h-3" />
              <span>{`level ${level}`}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <SiOpensea className="text-white w-3 h-3" />
              <Link
                to={`https://testnets.opensea.io/${address}`}
                target="_blank"
                rel="noreffer"
                className="hover:underline"
              >
                OpenSea
              </Link>
            </div>
          </div>

          <p className="text-gray-400">
            {user ? description || "No description provided" : "loading..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
