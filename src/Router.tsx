import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { FavoritesPage } from "./ui/pages/FavoritesPage"; // ← añadir
import { DreamTeamPage } from "./ui/pages/DreamTeamPage";

const routes = {
  home: {
    path: "/",
    element: App,
  },
  favorites: {                    // ← añadir
    path: "/favorites",
    element: FavoritesPage,
  },
  dreamTeam: {          // ← añadir
    path: "/dream-team",
    element: DreamTeamPage,
  },
};

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: Object.values(routes).map(({ element: Element, path }) => ({
      path,
      element: <Element />,
    })),
  },
  { path: "*", element: <div className="notfound">Page not found</div> },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};