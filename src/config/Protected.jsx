import { UserAuth } from "../context/AuthControler"
import { useNavigate } from "react-router-dom"

const Protected = ({children}) => {
 const {user}=UserAuth()
 const Navigate=useNavigate()
   if(!user){

    return Navigate('/')
   }
   return children
}

export default Protected  