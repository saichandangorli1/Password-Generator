import React, { useState, useEffect } from "react";

import { ToggleSwitch } from "flowbite-react";

const App = () => {
  const [length, setLength] = useState(8);
  const [actualLength, setActualLength] = useState(Math.round(length / 3));
  const [diff, setDiff] = useState("Weak");
  const [uc, setUc] = useState(true);
  const [lc, setLc] = useState(true);
  const [no, setNo] = useState(true);
  const [sy, setSy] = useState(true);
  const [isAnimation, setIsAnimation] = useState(false);
  const [password, setPassword] = useState("");

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    if (password) {
      let index = -1;
      const interval = setInterval(() => {
        setDisplayedText(
          (prevDisplayedText) => prevDisplayedText + password[index]
        );
        ++index;
        if (index === password.length - 1) {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [password]); // Removed 100 from the dependency array

  console.log(lc, uc, no, sy, password[0]);

  useEffect(() => {
    setActualLength(Math.round(length / 2));
    if (actualLength <= 5) {
      setDiff("Weak");
    }
    if (actualLength >= 6 && actualLength <= 10) {
      setDiff("Medium");
    }
    if (actualLength >= 11 && actualLength <= 15) {
      setDiff("Strong");
    }
  }, [length]);
  useEffect(() => {
    if (diff === "Weak") {
      setActualLength(5);
      setLength(5 * 2);
    }
    if (diff === "Medium") {
      setActualLength(10);
      setLength(10 * 2);
    }
    if (diff === "Strong") {
      setActualLength(15);
      setLength(15 * 2);
    }
  }, [diff]);

  const handleChange = (e) => {
    setLength(e.target.value);
  };

  const handleColor = (difficulty) => {
    setDiff(difficulty);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
    }
  };

  const handlePassword = () => {
    let characters = "";
    if (lc) characters += "abcdefghijklmnopqrstuvwxyz";
    if (uc) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (no) characters += "0123456789";
    if (sy) characters += "!@#$%^&*";

    let newPassword = "";
    for (let i = 0, n = characters.length; i < actualLength; ++i) {
      newPassword += characters.charAt(Math.floor(Math.random() * n));
    }
    setPassword(newPassword);
  };

  return (
    <div className="flex h-screen justify-start items-center flex-col gap-10 py-4 text-2xl ">
      <h1 className="text-xl text-center">Generate Random Password</h1>
      <div className="gap-5 flex flex-col">
        <p className="text-left text-lg text-[#707070]">
          Password security Level:
        </p>
        <div className="flex cursor-pointer bg-white border-4 border-sky-500 rounded-md ">
          {["Weak", "Medium", "Strong"].map((difficulty) => (
            <div
              onClick={() => handleColor(difficulty)}
              key={difficulty}
              className={`rounded-[2px] px-4 py-2 ${
                diff === difficulty
                  ? "bg-sky-500 text-white"
                  : "bg-white text-black"
              }  text-center transition-all duration-150 ease-in`}
            >
              {difficulty}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full px-8 ">
        <p className="text-left text-lg text-[#707070]">
          Password length:{" "}
          <span className="font-semibold text-black">{actualLength}</span>
        </p>
        <input
          type="range"
          value={length}
          onChange={handleChange}
          min="1"
          max="30"
          className="w-full accent-sky-500"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center w-full px-6 items-center">
        <div className="flex  gap-10 justify-between items-center w-full">
          <div className="flex gap-2 items-center justify-center">
            {" "}
            <img src="/letter-case-upper.png" alt="" className="size-8" />
            <div className="text-lg">Uppercase letters</div>
          </div>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-sky-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-sky-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-sky-500 checked:focus:bg-sky-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-sky-500 dark:checked:after:bg-sky-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            checked={uc ? true : false}
            onClick={() => setUc(!uc)}
           
          />
        </div>
        <div className="flex  gap-10 justify-between items-center w-full">
          <div className="flex gap-2 items-center justify-center">
            {" "}
            <img src="/letter-case-lower.png" alt="" className="size-8" />
            <div className="text-lg">Lowercase letters</div>
          </div>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-sky-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-sky-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-sky-500 checked:focus:bg-sky-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-sky-500 dark:checked:after:bg-sky-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            checked={lc ? true : false}
            onClick={() => setLc(!lc)}
           
          />
        </div>
        <div className="flex  gap-10 justify-between items-center w-full">
          <div className="flex gap-2 items-center justify-center">
            {" "}
            <img src="/number-123.png" alt="" className="size-8" />
            <div className="text-lg">Numbers</div>
          </div>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-sky-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-sky-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-sky-500 checked:focus:bg-sky-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-sky-500 dark:checked:after:bg-sky-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            checked={no ? true : false}
            onClick={() => setNo(!no)}
            
          />
        </div>
        <div className="flex  gap-10 justify-between items-center w-full">
          <div className="flex gap-2 items-center justify-center">
            {" "}
            <img src="/math-symbols.png" alt="" className="size-8" />
            <div className="text-lg">Symbols</div>
          </div>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-sky-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-sky-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-sky-500 checked:focus:bg-sky-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-sky-500 dark:checked:after:bg-sky-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            checked={sy ? true : false}
            onClick={() => setSy(!sy)}
        
          />
        </div>
        {/* <div onClick={() => setUc(!uc)}>UpperCase</div> */}
      </div>
      <div className="w-full px-6 flex justify-center items-center flex-col">
        <div className="text-[#707070] text-left text-lg w-full flex justify-between items-center mb-2">
          <label htmlFor="flexSwitchCheckDefault">Animated Password</label>
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-sky-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-sky-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-sky-500 checked:focus:bg-sky-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-sky-500 dark:checked:after:bg-sky-500 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            checked={isAnimation ? true : false}
            onClick={() => setIsAnimation(!isAnimation)}
            id="flexSwitchCheckDefault"
          />
        </div>
        <p className="text-[#707070] text-left text-lg w-full ">
          Generated password:
        </p>
        <div className="w-full flex justify-between ">
          {password ? (
            isAnimation ? (
              <div className="text-lg">{displayedText}
              <span className="animate-blink">|</span></div>
            ) : (
              <div className="text-lg">
                {password}
              </div>
            )
          ) : (
            <div className="text-lg">Tap on "Generate new"</div>
          )}
          <img
            src="copy.png"
            alt=""
            className="size-7 active:scale-110 transition-all duration-75 ease-linear"
            onClick={handleCopy}
          />
        </div>
      </div>
      <div>
        <button
          onClick={handlePassword}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3 px-8 rounded-full border-4 border-[#473c91] text-white active:scale-95 transition-all duration-75 ease-linear md:mb-2 "
        >
          ✨ Generate New{" "}
        </button>
      </div>

    <footer className="bg-[#f5f5f5] py-1 w-full border-t-2 ">
      <h1 className="text-xl text-center">Developed by Saichandan Gorli</h1>
    </footer>
    </div>
  );
};

export default App;

// import React from 'react';
// import TypingAnimation from './T';
// import './index.css';

// function App() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <TypingAnimation text="Hello, world!" speed={100} />
//     </div>
//   );
// }

// export default App;
