import "../styles/globals.css";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import EmployeeDetails from "./employee/employeeDetails"
import Head from 'next/head'; 
import 'react-notifications/lib/notifications.css';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
                <title>Employee Management</title>
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous" />
                <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
                <link rel="stylesheet" type="text/css" href="path/to/notifications.css"/>
                <link rel="stylesheet" href="dist/notiflix-3.2.5.min.css" />

<script src="dist/notiflix-3.2.5.min.js"></script>
<script src="dist/notiflix-aio-3.2.5.min.js"></script>
<script src="dist/notiflix-notify-aio-3.2.5.min.js"></script>

<script src="dist/notiflix-report-aio-3.2.5.min.js"></script>

<script src="dist/notiflix-confirm-aio-3.2.5.min.js"></script>

<script src="dist/notiflix-loading-aio-3.2.5.min.js"></script>

<script src="dist/notiflix-block-aio-3.2.5.min.js"></script>
            </Head>
        <Provider store={store}>
        <Component {...pageProps} />
        
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);