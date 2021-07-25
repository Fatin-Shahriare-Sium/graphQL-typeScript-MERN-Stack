import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

const UseLogin = () => {
    interface loginErrorProps {
        text: string,
        color: string
    }
    let [error, setError] = useState<loginErrorProps>({ text: '', color: '' })
    let LOGIN_DATA = gql`
    mutation login($email:String!,$password:String!){
        login(email:$email,password:$password){
            token
            success
            msg{
                text
                color
            }
            user{
                email
                name
                profilePic
            }
        }
    }
    
    `

    let [loginx] = useMutation(LOGIN_DATA)

    async function handleLogin(e: any) {
        e.preventDefault()
        let email = e.target[0].value
        let password = e.target[1].value

        if (email && password) {
            let result = await loginx({ variables: { email, password } })
            let { login } = result.data

            console.log(login);
            if (login.success) {
                localStorage.setItem("__tokenx", login.token)
                localStorage.setItem("__userx", JSON.stringify(login.user))
                return setError({
                    text: login.msg.text,
                    color: login.msg.color
                })
            } else {
                setError({
                    text: login.msg.text,
                    color: login.msg.color
                })
            }

        }
    }

    return {
        handleLogin,
        error
    }
}

export default UseLogin;