import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.sass';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('@popperjs/core');
    import('bootstrap/dist/js/bootstrap.min');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
