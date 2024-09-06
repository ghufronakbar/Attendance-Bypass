"use client";
import ButtonBlue from "@/components/ButtonBlue";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="w-full h-full flex flex-col gap-8">
        <div className="w-full justify-between flex flex-col sm:flex-row gap-4 md:gap-0">
          <h1 className="text-3xl font-bold">Sorry, there&apos;s some mistakes</h1>          
        </div>        
        <div className="w-full border-2 border-black rounded-md bg-purple-1 p-8 flex flex-col-reverse md:flex-row gap-4">
          <div className="w-full md:w-[70%] flex flex-col gap-4">
            <h3 className="text-2xl">500 Internal Server Error</h3>                        
              <p>
                Return to the <b>Home</b> page
              </p>                          
            <ButtonBlue className="px-8" >
              <Link href="/">Home</Link>
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
    );
};

export default ErrorPage