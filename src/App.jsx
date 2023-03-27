import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Main, { mainLoader } from "./Layouts/Main";

//actions
import logOutAction from './actions/Logout';

//libraries
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from "./pages/Error";

//router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        action: dashboardAction,
        loader: dashboardLoader,
        errorElement: <Error/>
      },
      {
        path: "logout",
        action: logOutAction
      }
    ]
  }
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
