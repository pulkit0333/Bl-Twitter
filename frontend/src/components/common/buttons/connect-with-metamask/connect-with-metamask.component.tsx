import { useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import addressShortner from "../../../../utils/addressShortner";
import toast from "react-hot-toast";
import { MetamaskNotFoundError } from "../../../../errors";
import { selectUser } from "../../../../store/slices/user.sllice";
import { fetchUser } from "../../../../store/thunks/user.thunk";
import { useAppDispatch } from "../../../../store/hooks";

const ConnectWithMetaMask = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector(selectUser);

  const onPressConnect = async () => {
    setLoading(true);

    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account: `0x${string}` = Web3.utils.toChecksumAddress(
          accounts[0]
        ) as `0x${string}`;

        dispatch(fetchUser(account));
      } else {
        throw new MetamaskNotFoundError();
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={onPressConnect}
      className="w-full space-x-2 justify-center items-center border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex focus:ring-gray-600 bg-gray-800 border-gray-700 text-white hover:bg-gray-700 mb-2"
    >
      <img className="w-6 h-5" src="/assets/metamask.svg" />
      <span>
        {user ? addressShortner(user.address) : "Connect with MetaMask"}
      </span>
    </button>
  );
};

export default ConnectWithMetaMask;
