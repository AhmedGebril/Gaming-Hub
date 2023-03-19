
import { createContext } from "react";
import { useState } from "react";


export let UserLogged = createContext(0)

export default function UserContextProvider(props){
    let [password ,setPassword]=useState(null)
    let [name ,setName]=useState(null)
    let [Loggedin,isLoggedin]=useState(false)

    function signout(){
        setPassword(null)
        setName(null)
        isLoggedin(false)
    }
    
    return <UserLogged.Provider value={{name,setPassword,setName,signout,Loggedin,isLoggedin}}>
        {props.children}
    </UserLogged.Provider>
}