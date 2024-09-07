"use client";

import ButtonBlue from "@/components/ButtonBlue";
import ProgressBar from "@/components/ProgressBar";
import { useToast } from "@/components/Toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [progress, setProgress] = useState<number>(0); // State untuk progress
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStart = () => {
    setIsLoading(true);
    setProgress(0); // Reset progress saat memulai kembali
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isLoading && progress < 100) {      
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const randomIncrement = Math.random() * 10 + 1; 
          const newProgress = Math.min(prevProgress + randomIncrement, 100); 
          return newProgress;
        });
      }, Math.random() * 300 + 10); 
    }

    if (progress >= 100 && isLoading) {
      setIsLoading(false);      
      showToast("Let's gooooow!!!", "success");
      setTimeout(() => {
        router.push("/course");
      }, 1000); 
    }

    return () => clearInterval(intervalId); 
  }, [isLoading, progress, showToast, router]);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8">
        <div className="w-full justify-between flex flex-row items-center">
          <h1 className="text-3xl font-bold">Heyhoo!</h1>
        </div>
        <div className="w-full border-2 border-black rounded-md bg-purple-1 p-8 flex flex-col-reverse md:flex-row gap-4">
          <div className="w-full md:w-[70%] flex flex-col gap-4">
            <h3 className="text-2xl">How to bypass my attendance?</h3>
            <p className="text-lg">Hi, welcome to my app</p>
            <div>
              <p>
                First, you have to register your course by using encrypted code
              </p>
              <p>
                Second, you have to create your attendance using your course
                you&apos;ve registered
              </p>
              <p>To get started, click on the button below!</p>
            </div>
            <ButtonBlue className="px-8" onClick={handleStart}>
              Start
            </ButtonBlue>
          </div>
          <div className="w-full md:w-[30%] h-fit flex justify-center">
            <Image
              src="/avatar.png"
              alt="hero"
              width={500}
              height={500}
              className="w-[50%] h-auto"
            />
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-end py-20 z-50 bg-black/50">
          <ProgressBar currentValue={progress} color="red" />
        </div>
      )}
    </>
  );
};

export default HomePage;
