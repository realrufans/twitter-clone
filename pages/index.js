import Head from "next/head";
import SiderBar from "../components/SideBar";
import Feed from "../components/Feed";
import Login from "./login";
import { getProviders, getSession, useSession } from "next-auth/react";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { openModal } from "../atoms/atoms";

export async function getServerSideProps(context) {


  // creating providers and session with Next auth
  const providers = await getProviders();
  const session = await getSession(context);
  

  return {
    props: {
      providers,
      session,
    },
  };
}

export default function Home({ providers }) {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useRecoilState(openModal);

  if (!session) return <Login providers={providers} />;

 
  return (
    <div>
      <Head>
        <title>Twitter clone</title>
        <meta name="description" content="A twitter clone by rufans" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" relative  h-screen  overflow-y-scroll scrollbar-hide   lg:flex my-0 mx-auto lg:max-w-[1600px] xl:max-w-[1400px] ">
        <SiderBar />
        <Feed />
      </main>

      {/* modal */}
      <div className="absolute top-0">
        {isOpen && <Modal />}
      </div>
    </div>
  );
}
