import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/hooks";
import ipfsPreviewGenerator from "../../../utils/ipftPreviewGenerator";
import {
  selectOthersNftModalOpen,
  toggleOthersNFTModalOpen,
} from "../../../store/slices/profile.silce";

const OthersNFTModal = () => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(toggleOthersNFTModalOpen(null));
  };

  const othersNftModalOpen = useSelector(selectOthersNftModalOpen);

  return (
    <Transition appear show={othersNftModalOpen !== null} as={Fragment}>
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
                      othersNftModalOpen && othersNftModalOpen.image
                        ? ipfsPreviewGenerator(othersNftModalOpen.image)
                        : ""
                    }
                    className="h-full w-full"
                  />

                  <div className="space-y-1 py-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {othersNftModalOpen?.name}
                    </Dialog.Title>
                    <p className="text-sm text-gray-500">
                      {othersNftModalOpen?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  {/* <button
                    type="button"
                    className="inline-flex disabled:animate-pulse justify-center rounded-md border border-transparent bg-platinum-100 px-4 py-2 text-sm font-medium text-platinum-900 hover:bg-oxford_blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-platinum-500 focus-visible:ring-offset-2"
                    onClick={setProfile}
                  >
                    Set Profile
                  </button> */}

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

export default OthersNFTModal;
