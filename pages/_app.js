import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import  {useRecoilState} from 'recoil'
import { openModal } from "../atoms/atoms";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
 
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <Component {...pageProps} />;
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
