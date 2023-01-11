import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

function Login({ providers }) {
  return (
    <div className=" items-center flex justify-center flex-col space-y-10 h-[90vh] ">
      <Image
        height={150}
        width={150}
        src={"/images/twitter.png"}
        alt="twitter clone logo"
      />

      <p
        onClick={() => signIn(providers?.google?.id, { callbackUrl: "/" })}
        className="relative  cursor-pointer inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
      >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-700 rounded-full group-hover:w-56 group-hover:h-56"></span>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span className="relative"> Sign with {providers?.google?.name}</span>
      </p>
    </div>
  );
}

export default Login;
