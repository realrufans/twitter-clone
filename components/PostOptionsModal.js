import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { deleteModal, subdeleteModal } from "../atoms/atoms";
import { TrashIcon } from "@heroicons/react/outline";

export default function PostOptions() {
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
            <div className="fixed inset-0  bg-blue-200/5 bg-opacity-25" />
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
                  {deleteMod && (
                    <div className="  text-red-500 cursor-default   bg-black border-2 border-blue-200 h-[255px] sm:h-[200px] w-64  sm:w-72 bottom-0 bg  space-x-2   ">
                      <div
                        className="flex items-center cursor-pointer  hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('brng up delete modal')
                          setsubDeleteMod(true)

                        }}
                      >
                        <div className="">
                          {" "}
                          <TrashIcon className="icon h-9  text-red-500 ml-2 " />
                        </div>{" "}
                        <p>Delete</p>
                      </div>
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
