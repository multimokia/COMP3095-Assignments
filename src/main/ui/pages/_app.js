import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showNav =
    router.pathname === '/login' || router.pathname === '/register'
      ? false
      : true;

  //TODO: shopping list context, user context

  //TODO: add shopping list to navbar
  //TODO: SHOPPING LIST, FAVOURITES, EVENTS
  return (
    <>
      {showNav && <Navbar />}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
