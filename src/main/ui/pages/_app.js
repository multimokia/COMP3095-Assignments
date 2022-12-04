import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { ShoppingListProvider } from '../context/ShoppingListContext';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showNav =
    router.pathname === '/login' || router.pathname === '/register'
      ? false
      : true;

  return (
    <>
      <ShoppingListProvider>
        {showNav && <Navbar />}
        <Component {...pageProps} />
      </ShoppingListProvider>
    </>
  );
}

export default MyApp;
