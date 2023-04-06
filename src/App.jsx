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
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";

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
        errorElement: <Error />
      },
      {
        path:"expenses",
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction
      },
      {
        path:"budgets/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction
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
