import React from "react";
import { UserContext } from "./user";

export const useUser = ()=>{
    return React.useContext(UserContext);
}
