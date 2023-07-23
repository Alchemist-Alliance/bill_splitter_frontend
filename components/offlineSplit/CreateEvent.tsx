"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaTimes, FaTimesCircle } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import SnackBar from "./SnackBar";
import { useRouter } from "next/navigation";
import { snackBarIconType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { BsPersonFill } from "react-icons/bs";
import Loader from "../Loader";
import { itemVariants, listVariants } from "@/data";
import Link from "next/link";
import { titleCase } from "@/utils";
import { Mascot } from "../Mascot";

const CreateEventForm = () => {
  const snackbarRef = useRef<any>(null);
  const [names, setNames] = useState<string[]>([]);
  const userRef = useRef<HTMLInputElement>(null);
  const eventRef = useRef<HTMLInputElement>(null);
  const [eventData, setEventData] = useState<
    { eventId: string; eventName: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useRouter();

  const addUsers = () => {
    if (userRef.current!.value === "") {
      return snackbarRef?.current?.show(
        "Name is Empty",
        snackBarIconType.FaTimesCircle,
        "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text"
      );
    }

    if (
      names.some(
        (name) => name.toLowerCase() === userRef.current!.value.toLowerCase()
      )
    ) {
      snackbarRef?.current?.show(
        "Member Name already exists",
        snackBarIconType.FaTimesCircle,
        "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text"
      );
      return (userRef.current!.value = "");
    }
    const newNames: string[] = [...names, titleCase(userRef.current!.value)];
    setNames(newNames);
    userRef.current!.value = "";
  };

  const removeUsers = (element: Element) => {
    const user =
      element.nodeName === "svg"
        ? element.parentElement?.getAttribute("data-value")
        : element.parentElement?.parentElement?.getAttribute("data-value");
    const newNames: string[] = names.filter((item) => item !== user);
    setNames(newNames);
  };

  async function createEvent() {
    if (names.length < 2) {
      return snackbarRef?.current?.show(
        "Less than 2 Users",
        snackBarIconType.FaTimesCircle,
        "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text"
      );
    }
    if (eventRef.current!.value == "") {
      return snackbarRef?.current?.show(
        "Enter name for Event",
        snackBarIconType.FaTimesCircle,
        "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text"
      );
    }

    const eventBody = JSON.stringify({
      name: titleCase(eventRef.current!.value),
      user_names: names,
      status: 1,
    });

    try {
      setLoading((prev) => !prev);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create_event`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: eventBody,
        }
      );

      const data = await response.json();

      const eventObj = {
        eventId: data.event.key,
        eventName: eventRef.current!.value,
      };

      const exisitingEvent = localStorage.getItem("event");
      if (exisitingEvent) {
        const exisitingEventData = JSON.parse(exisitingEvent);

        if (exisitingEventData.length <= 4) {
          exisitingEventData.push(eventObj);
          localStorage.event = JSON.stringify(exisitingEventData);
        } else {
          exisitingEventData.splice(0, 1);
          exisitingEventData.push(eventObj);
          localStorage.event = JSON.stringify(exisitingEventData);
        }
      } else {
        localStorage.event = JSON.stringify([eventObj]);
      }
      setLoading((prev) => !prev);
      const path = `/event/${data.event.key}`;
      navigate.push(path);
    } catch (err) {
      console.log(err);
      snackbarRef?.current?.show(
        "Error Occured in API",
        snackBarIconType.FaTimesCircle,
        "bg-snackbar-error-bg text-snackbar-error-text border-l-4 border-snackbar-error-text"
      );
      return setLoading((prev) => !prev);
    }
  }

  const removeEvent = (element: Element) => {
    const eventIndex =
      element.nodeName === "svg"
        ? element.parentElement?.getAttribute("data-value")
        : element.parentElement?.parentElement?.getAttribute("data-value");
    const event = localStorage.getItem("event");
    if (event) {
      const eventObj = JSON.parse(event);
      eventObj.splice(Number(eventIndex), 1);
      localStorage.event = JSON.stringify(eventObj);
      setEventData(eventObj);
    }
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      addUsers();
    }
  };

  useEffect(() => {
    const event = localStorage.getItem("event");
    if (event) {
      const eventObj = JSON.parse(event);
      setEventData(eventObj);
    }
  }, []);

  return (
    <div className="flex items-center justify-center px-3">
      <SnackBar ref={snackbarRef} />
      <div className="bg-primary text-stroke text-md flex flex-col gap-y-4 rounded-lg shadow-custom p-5 md:rounded-xl lg:p-7 md:p-7 lg:w-[450px]">
        <div className="flex">
          <Mascot />
          <p className="text-2xl font-bold mb-5 ml-2">Create Event</p>
        </div>
        <motion.div className="relative flex flex-col items-center rounded-lg">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-secondary p-3 w-full flex items-center justify-between font-bold rounded-lg"
          >
            {"Recent Events"}
            <motion.div
              variants={{
                open: { rotate: 180, transition: { duration: 0.2 } },
                closed: { rotate: 0, transition: { duration: 0.2 } },
              }}
              animate={isOpen ? "open" : "closed"}
              initial="closed"
            >
              <FaChevronDown className="h-8" />
            </motion.div>
          </motion.button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                variants={listVariants}
                animate="open"
                initial="closed"
                exit="closed"
                className="bg-stroke text-secondary z-10 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full no-scrollbar"
              >
                {eventData.length === 0 ? (
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center w-full font-bold p-4"
                  >
                    <FaTimesCircle className="mr-4" />
                    No Recent Events
                  </motion.div>
                ) : (
                  eventData.map((data, index) => (
                    <motion.div
                      variants={itemVariants}
                      key={index}
                      data-value={index}
                      className="flex justify-between items-center w-full font-bold p-4 hover:bg-background rounded-r-lg border-l-transparent hover:border-l-secondary border-l-4"
                    >
                      <Link className="cursor-pointer" href={data.eventId}>
                        {data.eventName}
                      </Link>
                      <FaTimes
                        onClick={(e) => removeEvent(e.target as Element)}
                        className="cursor-pointer"
                      />
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <div className="flex flex-row items-center bg-secondary rounded-lg">
          <SiYourtraveldottv size={30} className="ml-4" />
          <input
            className="font-bold w-full rounded-lg p-4 caret-stroke text-stroke bg-secondary placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
            placeholder="Event Name"
            name="trip"
            ref={eventRef}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-stretch bg-secondary rounded-lg">
            <div className="flex items-center">
              <BsPersonFill size={30} className="ml-4" />
              <input
                className="font-bold w-full p-4 rounded-lg caret-stroke text-stroke bg-secondary cursor-text placeholder:text-stroke placeholder:opacity-40 focus:outline-none"
                placeholder="Users Name"
                name="name"
                ref={userRef}
                onKeyDown={handleKeyPress}
              />
            </div>
            <button
              className="font-bold bg-stroke text-secondary rounded-r-lg lg:px-8 md:px-8 px-5 cursor-pointer"
              onClick={addUsers}
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          <AnimatePresence initial={false}>
            {names.map((name, index) => (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={index}
                data-value={name}
                className="flex bg-secondary text-stroke items-center p-2 px-3 m-1 rounded"
              >
                <span className="mr-2 font-bold">{name}</span>
                <FaTimes
                  onClick={(e) => removeUsers(e.target as Element)}
                  className="cursor-pointer"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className=" flex items-center justify-center text-xl font-bold bg-secondary text-stroke rounded-lg mt-5"
        >
          <AnimatePresence initial={false}>
            {loading ? (
              <Loader classname="py-3" color="#073042" />
            ) : (
              <motion.button
                onClick={() => createEvent()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full py-3 cursor-pointer"
              >
                Create Event
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEventForm;
