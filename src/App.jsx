import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Main, { mainLoader } from "./Layouts/main";

//actions
import logOutAction from './actions/Logout';

//libraries
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        loader: dashboardLoader
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
