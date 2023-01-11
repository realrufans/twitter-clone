import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { deleteModal, subdeleteModal } from "../atoms/atoms";
import { TrashIcon } from "@heroicons/react/outline";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function ConfirmDelete({ id }) {
  let [isOpen, setIsOpen] = useState(true);
  const [deleteMod, setDeleteMod] = useRecoilState(deleteModal);
  const [subDeleteMod, setsubDeleteMod] = useRecoilState(subdeleteModal);

  function closeModal() {
    setDeleteMod(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className=" w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle  transition-all">
                  {subDeleteMod && (
                    <div className=" text-red-700 cursor-default  bg-black border-2 border-blue-200 h-[300px] sm:h-[300px] w-64  sm:w-72 bottom-0 bg  space-x-2    ">
                      <div className="    p-3 sm:p-5 flex flex-col  space-y-2">
                        {" "}
                        <h2 className="text-white font-bold text-lg">
                          Delete Tweet?
                        </h2>
                        <p className="  text-white/80 w-fit ">
                          This can’t be undone and it will be removed from your
                          profile, the timeline of any accounts that follow you,
                          and from Twitter search results.{" "}
                        </p>
                        <p
                          className="text-white font-medium cursor-pointer hover:bg-red-700 bg-red-600 p-2 text-center rounded-2xl w-full"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await deleteDoc(doc(db, "posts", id));
                            setsubDeleteMod(false)
                            setDeleteMod(false)
                          }}
                        >
                          Delete
                        </p>
                        <p
                          className="text-white hover:bg-white/20 font-medium p-2 text-center cursor-pointer rounded-2xl w-full border-[1px] border-white "
                          onClick={(e) => {
                            e.stopPropagation();

                            setsubDeleteMod(false)


                            // setting of deleted moed

                          }}
                        >
                          Cancel
                        </p>
                      </div>{" "}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
