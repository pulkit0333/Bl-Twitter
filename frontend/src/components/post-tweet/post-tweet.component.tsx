import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  selectPostModalOpen,
  togglePostModalOpen,
} from "../../store/slices/posts.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { TweetBase } from "../../domain/entities/tweet.entity";
import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { postTweet } from "../../store/thunks/posts.thunk";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const PostTweet = () => {
  const dispatch = useAppDispatch();

  const toggleModal = () => {
    dispatch(togglePostModalOpen());
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TweetBase>();

  const postModalOpen = useAppSelector(selectPostModalOpen);

  const onSubmit: SubmitHandler<TweetBase> = async (data) => {
    dispatch(postTweet(data));
    reset();
    toggleModal();
  };

  return (
    <Transition appear show={postModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleModal}>
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Create Post
                </Dialog.Title>
                <div className="space-y-2 mt-2">
                  <p className="text-sm text-gray-500">
                    Share with the world what&apos;s on your mind.
                  </p>

                  <form className="space-y-2">
                    <textarea
                      rows={3}
                      {...register("content", {
                        required: "Content is required.",
                        minLength: {
                          value: 2,
                          message:
                            "Content must be atleast 2 charachters long.",
                        },
                        maxLength: {
                          value: 300,
                          message:
                            "Content cannot be greater than 300 charhters.",
                        },
                      })}
                      className={classNames(
                        "border text-sm rounded-lg block w-full p-2.5",
                        errors.content
                          ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500  focus:border-red-500"
                          : ""
                      )}
                      placeholder="What's on your mind?"
                    />

                    <ErrorMessage
                      errors={errors}
                      name="content"
                      render={({ message }) => (
                        <p className="text-sm text-red-600">{message}</p>
                      )}
                    />
                  </form>
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="inline-flex disabled:animate-pulse justify-center rounded-md border border-transparent bg-platinum-100 px-4 py-2 text-sm font-medium text-platinum-900 hover:bg-oxford_blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-platinum-500 focus-visible:ring-offset-2"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Post
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-platinum-400 px-4 py-2 text-sm font-medium text-platinum-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-platinum-500 focus-visible:ring-offset-2"
                    onClick={toggleModal}
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

export default PostTweet;
