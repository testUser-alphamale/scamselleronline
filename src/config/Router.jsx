  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import React from 'react'

  import Account from "../pages/Account";
  import SignIn from "../pages/SignIn";
import Protected from "./Protected";
import Complain from "../pages/Complain";

import Search from "../pages/SearchPage";

  const AppRouter = () => {
    return (
      <BrowserRouter>
      <Routes>
 
        <Route path="/" element={<SignIn />} />
        <Route path="/account" element={<Protected>
           <Account />
        </Protected>} >
        </Route>
          <Route path="complain" element={<Protected><Complain/></Protected>} />
          <Route path="search" element={<Protected><Search /></Protected>} />
      </Routes>
      </BrowserRouter>
    )
  }

  export default AppRouter