import React, { useState } from "react"
import LoginScreen from "./LoginScreen"
import PortalScreen from "./PortalScreen"
import AdminHome from "./AdminHome"

export default function App(){

  const [user,setUser] = useState<any>(null)

  
  if(!user){
    return <LoginScreen setUser={setUser}/>
  }

  
  if(user.email === "admin@test.com"){
    return <AdminHome/>
  }

  
  return <PortalScreen user={user}/>

}