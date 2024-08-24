// eslint-disable-next-line react/prop-types
const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <p className="text-lg font-semibold text-gray-800">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};
import { useState } from "react";

const HomeLayout = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [inputNumber, setInputNumber] = useState("");
  const [remainChance, setRemainChance] = useState(3);
  const [message, setMessage] = useState("You Have 3 Chances");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const generateRandomNumber = () => {
    if (remainChance === 3) {
      const randomNum = Math.floor(Math.random() * 20) + 1;
      setRandomNumber(randomNum);
    }

    const parsedInputNumber = parseInt(inputNumber, 10);

    if (isNaN(parsedInputNumber)) {
      setMessage("Please enter a valid number.");
      return;
    }

    if (parsedInputNumber === randomNumber) {
      setAlertMessage("Congratulations! You guessed the correct number!");
      setShowAlert(true);
      setRemainChance(0);
    } else {
      if (remainChance > 0) {
        if (parsedInputNumber < randomNumber) {
          setMessage("Your Number is Too Small!");
        } else if (parsedInputNumber > randomNumber) {
          setMessage("Your Number is Too Big!");
        }
        setRemainChance(remainChance - 1);
      }

      if (remainChance === 1) {
        setAlertMessage(`GAME OVER. The Random Number was ${randomNumber}`);
        setShowAlert(true);
        resetGame();
      }
    }
  };

  const resetGame = () => {
    setRandomNumber(0);
    setInputNumber("");
    setMessage("You Have 3 Chances");
    setRemainChance(3);
  };

  const closeAlert = () => {
    setShowAlert(false);
    resetGame();
  };

  return (
    <div className="w-full min-h-screen bg-slate-950">
      <p className="text-3xl text-yellow-400 fixed top-10 right-10"> $ 100 </p>
      <h1 className="text-center text-6xl mt-8 py-8 font-bold text-white">
        Play & Win
      </h1>

      <main className="grid grid-cols-2 gap-8 text-white py-4 bg-slate-800 container mx-auto mt-10 border-2">
        <div className="bg-red-500 p-3 flex gap-5 items-end justify-center flex-col">
          <input
            type="text"
            value={inputNumber}
            className="bg-slate-900 w-48 p-14 text-6xl font-medium outline-none appearance-none"
            onChange={(e) => setInputNumber(e.target.value)}
            
            style={{
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            }}
          />
          <div className="message-box bg-gradient-to-r from-purple-500 to-indigo-500 border-2 border-indigo-700 rounded-lg px-5 py-3 text-white text-xl font-semibold text-center shadow-lg mt-4">
            {message}
          </div>
        </div>
        <div className="bg-blue-500 gap-4 p-3 flex flex-col items-start justify-center">
          <button
            className="bg-black w-48 border-[1px] border-slate-600 px-5 py-3 text-white text-xl font-medium duration-300 ease-in hover:bg-blue-600"
            onClick={generateRandomNumber}
          >
            TRY LUCK
          </button>
          <p
            className="bg-black text-center w-48 border-[1px] border-slate-600 px-5 py-3 text-white text-xl font-medium duration-300 ease-in hover:bg-red-600"
          >
            REMAIN: {remainChance}
          </p>
          <button
            className="bg-red-600 w-48 border-[1px] border-slate-600 px-5 py-3 text-white text-xl font-medium duration-300 ease-in hover:bg-red-800"
            onClick={resetGame}
          >
            RESET GAME
          </button>
        </div>
      </main>

      {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};

export default HomeLayout;
