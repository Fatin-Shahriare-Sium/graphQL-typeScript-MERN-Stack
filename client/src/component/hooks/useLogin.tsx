import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
            id
            email
            name
            profilePic
        }
    }
}

`

interface loginErrorProps {
    text: string,
    color: string
}
const UseLogin = () => {

    let [error, setError] = useState<loginErrorProps>({ text: '', color: '' })
    let history = useHistory()
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
                window.location.pathname = '/' //reload the /' path
                setTimeout(() => {

                    history.push('/')
                }, 500);
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
