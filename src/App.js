import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import TwoPlayer from "./Components/Game";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/players", element: <TwoPlayer /> },
]);

// App component
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
