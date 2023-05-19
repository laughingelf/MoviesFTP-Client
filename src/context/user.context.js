import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../services/baseUrl";

const UserContext = createContext()


function UserContextProvider({ children }) {

}
return (
    <UserContext.Provider value={{}}>
        {children}
    </UserContext.Provider>
)


export { UserContext, UserContextProvider }