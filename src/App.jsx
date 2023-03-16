import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Main, { mainLoader } from "./Layouts/main";


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
      }
    ]
  }
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
