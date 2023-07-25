"use client";

import useAppContext from "@/hooks";
import { useUserInput } from "@/store";
import { sendUserToBackend, showSnackBar, titleCase } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MutableRefObject } from "react";
import { FaTimes } from "react-icons/fa";
import { shallow } from "zustand/shallow";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const OfflineBottomColumn = ({
  snackbar,
}: {
  snackbar: MutableRefObject<any>;
}) => {
  const [userName, setUserName] = useUserInput(
    (userInput) => [userInput.userName, userInput.updateUserName],
    shallow
  );
  const [users, eventKey, addUserToStore, restoreUsers] = useAppContext(
    (event) => [event.users, event.key, event.addUser, event.restoreUsers],
    shallow
  );

  const { mutate } = useMutation({
    mutationFn: sendUserToBackend,
    onMutate: async () => {
      const previousUsers = users;
      addUserToStore({
        bills: {},
        expenses: 0,
        key: String(users.length),
        name: titleCase(userName),
        status: 1,
      });
      setUserName("");
      return { previousUsers };
    },
    onError: (err: any, newUser: any, context: any) => {
      restoreUsers(context.previousUsers);
      return showSnackBar(snackbar, "API Error", "error");
    },
  });

  const addUser = () => {
    if (userName === "") {
      return showSnackBar(snackbar, "User Name is Empty", "error");
    }
    if (
      users.some((user) => user.name.toLowerCase() === userName.toLowerCase())
    ) {
      showSnackBar(snackbar, "User Name already exists", "error");
      return setUserName("");
    }

    mutate({
      event_key: eventKey,
      user_names: [titleCase(userName)],
    });
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      addUser();
    }
  };

  const removeMembers = (element: Element) => {
    // const member = element.nodeName === "svg" ? element.parentElement?.getAttribute('data-value') : element.parentElement?.parentElement?.getAttribute('data-value')
    // const newNames: Users = state.users.filter(item => item.name !== member)
    // if (member) {
    //     dispatch({ type: "removeMembers", payload: newNames, payload2: member })
    // }
  };

  return (
    <div className="lg:col-span-2 bg-primary shadow-custom text-stroke text-md flex flex-col gap-y-6 rounded-lg p-5 overflow-y-auto no-scrollbar md:rounded-xl lg:max-h-[250px] lg:p-7 md:p-7 md:max-h-[550px]">
      <div className="flex flex-col gap-y-4 items-start lg:flex-row lg:gap-x-4 lg:items-center">
        <p className="text-2xl font-bold">Edit Users</p>
        <div className="grid grid-cols-7 pl-2 justify-start items-stretch bg-secondary rounded-lg">
          <Image
            src="/mascotUser.svg"
            alt="mascot"
            width={30}
            height={30}
            className="ml-2 my-auto"
          />
          <input
            className="col-span-4 font-bold w-full p-3 my-1 rounded-lg caret-stroke text-stroke bg-secondary cursor-text placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
            placeholder="Enter Name"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="col-span-2 font-bold bg-stroke text-secondary rounded-r-lg cursor-pointer"
            onClick={addUser}
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        <AnimatePresence initial={false}>
          {users.map((user, index) => (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={index}
              data-value={user.name}
              className="flex bg-secondary text-stroke items-center p-2 px-3 m-1 rounded"
            >
              <span className="mr-2 font-bold cursor-default">{user.name}</span>
              <FaTimes
                onClick={(e) => removeMembers(e.target as Element)}
                className="cursor-pointer"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OfflineBottomColumn;
