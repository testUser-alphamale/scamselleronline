import React from 'react'
import AppRouter from './config/Router'
import { AuthContextProvider } from './context/AuthControler'
import logo from './images/SCAM.svg'

const App = () => {
  return (
    <div>

      {/* <img src={logo} alt="logo"  width={"200"} height={"200px"}/> */}
      
<AuthContextProvider>

        <AppRouter/>
</AuthContextProvider>
       


    </div>
  )
}

export default App