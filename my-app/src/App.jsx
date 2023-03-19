import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx/Layout";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import Home from "./components/Home/Home";
import GameDetails from "./components/GameDetails/GameDetails";
import Filter from "./components/Filter/Filter";
import MainHome from "./components/MainHome/MainHome";
import Tags from "./components/Tags/Tags";
import UserContextProvider from "./components/Store/UserContextStore";
import 'font-awesome/css/font-awesome.min.css';
import RequireAuth from "./components/Auth/RequireAuth";
import { Offline } from "react-detect-offline";
import Search from "./components/Search/Search";
import SearchTags from "./components/SearchTags/SearchTags";
import MainLoading from "./components/MainLoading/MainLoading";
import Account from "./components/Account/Account";
import UpdatingMiddleware from "./components/updatingMiddleware/updatingMiddleware";


function App() {
  const Routing = createBrowserRouter([  
  {path:'Register',element: <Register/>},
  {path:'Signin',element: <Signin/>},
  {path:'/',element: <MainLoading><Layout/></MainLoading>,children:[
    {path:'/home',element: <RequireAuth><Home/></RequireAuth>,children:[
      {index:true,element: <RequireAuth><MainHome/></RequireAuth>},
      {path:'/home/Utags/:filter',element:<RequireAuth><Filter/></RequireAuth>},
      {path:'/home/Tags/:filter',element:<RequireAuth><Tags/></RequireAuth>},
    ]},
    {path:'/GameDetails/:id',element: <RequireAuth><GameDetails/></RequireAuth>},
    {path:'/Search',element: <RequireAuth><Search/></RequireAuth>},
    {path:'/SearchTags',element: <RequireAuth><SearchTags/></RequireAuth>},
    {path:'/Account',element:<RequireAuth><Account/></RequireAuth>},
    {path:'/updatingMiddleware',element:<RequireAuth><UpdatingMiddleware/></RequireAuth>}
  ]}
])

  return (
    <>
    <Offline>
    <div className=" w-25 text-danger p-3 rounded shadow bg-dark fixed-bottom offline">
      <h6>Disconected Trying to Reconnect ...!</h6>
    </div>
    </Offline>
    <UserContextProvider>
    <RouterProvider router={Routing}/>
    </UserContextProvider>
    </>
  );
}

export default App;
