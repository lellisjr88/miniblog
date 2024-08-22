import {db} from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import { useState, useEffect } from "react"

export const useAuthentication = () => {
    const[error, setError ] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

    const createUser = async(data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const{user} = createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

        await updateProfile(user, {
            displayName: data.displayName
        })
        
        setLoading(false)

        return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter 6 ou mais caracteres"
            } else if(error.message.includes("email-already")){
                systemErrorMessage = "Email já cadastrado"
            }else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"    
            }

            setLoading(false)
            setError(systemErrorMessage)
        }

        
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, []); 

    return {
        auth,
        createUser,
        error,
        loading
    }
}