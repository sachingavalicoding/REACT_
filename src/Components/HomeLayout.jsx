import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const CustomMessageBox = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <p className="text-lg font-semibold text-gray-800">{message}</p>
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const HomeLayout = () => {
    const [randomNumber, setRandomNumber] = useState(0);
    const [inputNumber, setInputNumber] = useState("");
    const [remainChance, setRemainChance] = useState(3);
    const [message, setMessage] = useState("You have 3 chances");
    const [showInstructions, setShowInstructions] = useState(true);
    const [showMessageBox, setShowMessageBox] = useState(false); // State for custom message box

    useEffect(() => {
        // Generate random number when component mounts
        const randomNum = Math.floor(Math.random() * 20) + 1;
        setRandomNumber(randomNum);
    }, []);

    const handleInputChange = (e) => {
        setInputNumber(e.target.value);
    };

    const generateRandomNumber = () => {
        if (remainChance > 1) {
            if (parseInt(inputNumber) === randomNumber) {
                setMessage("Congratulations! You guessed the right number.");
                setRemainChance(0);
                setShowMessageBox(true);
            } else {
                setMessage(
                    `Your guess is ${inputNumber < randomNumber ? "too low" : "too high"}`
                );
                setRemainChance(remainChance - 1);
            }
        } else {
            setMessage(`Game Over! The correct number was ${randomNumber}`);
            setShowMessageBox(true);
        }
    };

    const resetGame = () => {
        const randomNum = Math.floor(Math.random() * 20) + 1;
        setRandomNumber(randomNum);
        setInputNumber("");
        setRemainChance(3);
        setMessage("You have 3 chances");
        setShowInstructions(true);
    };

    const closeInstructions = () => {
        setShowInstructions(false);
    };

    const closeMessageBox = () => {
        setShowMessageBox(false);
        resetGame();
    };

    return (
        <div className="w-full min-h-screen bg-slate-950 text-white relative">
            <p className="text-3xl text-yellow-400 fixed top-10 right-10">$100</p>
            <h1 className="text-center text-6xl mt-8 py-8 font-bold">Play & Win</h1>

            <main className="grid grid-cols-2 gap-8 py-4 bg-slate-800 container mx-auto mt-10 border-2">
                <div className="bg-red-500 p-3 flex gap-5 items-end justify-center flex-col">
                    <input
                        type="text"
                        value={inputNumber}
                        className="bg-slate-900 w-48 p-14 text-6xl font-medium outline-none"
                        onChange={handleInputChange}
                    />
                    <p className="bg-black border-[1px] border-slate-600 px-5 py-3 text-xl font-medium">
                        {message}
                    </p>
                </div>
                <div className="bg-blue-500 gap-4 p-3 flex flex-col items-start justify-center">
                    <button
                        className="bg-black w-48 border-[1px] border-slate-600 px-5 py-3 text-xl font-medium duration-300 ease-in hover:bg-blue-600"
                        onClick={generateRandomNumber}
                    >
                        Try Your Luck
                    </button>
                    <p className="bg-black text-center w-48 border-[1px] border-slate-600 px-5 py-3 text-xl font-medium duration-300 ease-in hover:bg-red-600">
                        Remain: {remainChance}
                    </p>
                    <button
                        className="bg-black w-48 border-[1px] border-slate-600 px-5 py-3 mt-4 text-xl font-medium duration-300 ease-in hover:bg-green-600"
                        onClick={resetGame}
                    >
                        Reset Game
                    </button>
                </div>
            </main>

            {showInstructions && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Instructions</h2>
                        <p className="text-gray-700 mb-4">
                            A random number between 1 and 20 will be generated. You have 3 chances to guess the correct number.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Enter your guess and click Try Your Luck. The game will guide you if your guess is too high or too low.
                        </p>
                        <p className="text-gray-700 mb-4">
                            If you guess correctly, you win! Otherwise, use the Reset Game button to start over.
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={closeInstructions}
                        >
                            Start Game
                        </button>
                    </div>
                </div>
            )}

            {showMessageBox && (
                <CustomMessageBox
                    message={remainChance > 0 ? message : `Game Over! The correct number was ${randomNumber}.`}
                    onClose={closeMessageBox}
                />
            )}
        </div>
    );
};

export default HomeLayout;
