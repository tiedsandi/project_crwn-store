import "react-toastify/dist/ReactToastify.css";

import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import router from "./app/Routes";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
