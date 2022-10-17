import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showNav =
    router.pathname === '/login' || router.pathname === '/register'
      ? false
      : true;
  return (
    <>
      {showNav && <Navbar />}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
