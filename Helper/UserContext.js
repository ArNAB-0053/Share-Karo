'use client'
import React, { createContext } from "react";
import { auth, currentUser } from "@clerk/nextjs"

export const MyContext = createContext();

const Context = ({ children }) => {
    // const {userId} = auth();
    const userId = 'hi'

    console.log(userId)
    return (
        <div>
            <MyContext.Provider value={userId}>{children}</MyContext.Provider>
        </div>
    );
};

export default Context;