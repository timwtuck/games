import { useState } from "react";
import app from "../../firebase/firebase";
import { getDatabase, ref, set, push } from "firebase/database";
import InputField from "./FormComponents/InputField";
import Button from "./FormComponents/Button";

type Props = {
  showModal: boolean;
  handleClose: () => void;
  time: string;
};

const DetailsModal = ({ showModal, handleClose, time }: Props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "solitaire"));
    set(newDocRef, {
      name: name,
      message: message,
      time: time,
    }).catch(() =>
      setError(
        "Something went wrong, could upload name and message. Please try again"
      )
    );
  };

  const handleSubmit = async () => {
    await saveData();
    handleClose();
  };
  return (
    <>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">
                    Enter details for leader board
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <InputField
                      value={name}
                      setValue={(s) => setName(s)}
                      label="Name"
                    />
                    <InputField
                      value={message}
                      setValue={(s) => setMessage(s)}
                      label="Inspirational Message"
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Button
                    className="text-red-500 background-transparent"
                    handleClick={handleClose}
                    text="Close"
                  />
                  <Button
                    className="text-white bg-yellow-500"
                    handleClick={async () => await handleSubmit()}
                    text="Submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DetailsModal;
