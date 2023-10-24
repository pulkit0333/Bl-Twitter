import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  selectNFTModalOpen,
  toggleNFTModalOpen,
} from "../../../store/slices/claims.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/hooks";
import ipfsPreviewGenerator from "../../../utils/ipftPreviewGenerator";
import { mintNFT } from "../../../store/thunks/nfts.thunk";
import {
  incrementUserLevel,
  selectUser,
  selectUserStatus,
} from "../../../store/slices/user.sllice";
import toast from "react-hot-toast";

const NFTModal = () => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(toggleNFTModalOpen(null));
  };

  const nftModalOpen = useSelector(selectNFTModalOpen);

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

  const mintNft = () => {
    if (nftModalOpen && nftModalOpen.id) {
      if (userStatus && userStatus.data && progress === 100) {
        dispatch(mintNFT(nftModalOpen.id));
        dispatch(incrementUserLevel());
        closeModal();
      } else {
        if (user) {
          const currentLevel = user.level;
          const currentLikes = Number(userStatus.data.totalLikesReceived);
          const likesRequired = currentLevel * 5;
          toast.error(
            `Reach next level to claim NFT. Next level unlocks after ${
              likesRequired - currentLikes
            } likes.`
          );
        }
      }
    }
  };

  return (
    <Transition appear show={nftModalOpen !== null} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transhtmlForm overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="space-y-2">
                  <img
                    src={
                      nftModalOpen?.image
                        ? ipfsPreviewGenerator(nftModalOpen?.image)
                        : ""
                    }
                    className="h-full w-full"
                  />

                  <div className="space-y-1 py-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {nftModalOpen?.name}
                    </Dialog.Title>
                    <p className="text-sm text-gray-500">
                      {nftModalOpen?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-platinum-100 px-4 py-2 text-sm font-medium text-platinum-900 hover:bg-oxford_blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-platinum-500 focus-visible:ring-offset-2"
                    onClick={mintNft}
                  >
                    Mint
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-platinum-400 px-4 py-2 text-sm font-medium text-platinum-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-platinum-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NFTModal;
