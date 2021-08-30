import React, { useState } from 'react'
import { gql, useMutation } from "@apollo/client"
import { useHistory } from 'react-router-dom'
let sendUserData = gql`
mutation createUser($name:String! , $email:String! ,$password:String!, $gender:String!){
    createUser(name:$name,email:$email,password:$password,gender:$gender){
        token
        user{
            id
            name
            email
            profilePic
        }
        msg{
            text
            color
        }
        success
    }
}

`
const UseSignup = () => {
    let [error, setError] = useState<{ text: string, color: string }>()

    let [x] = useMutation(sendUserData)

    let history = useHistory()
    let handleSignup = async (e: any) => {
        e.preventDefault()
        console.log(e);
        let name = e.target[0].value
        let email = e.target[1].value
        let password = e.target[2].value
        let conpassword = e.target[3].value
        let gender = e.target[4].value
        if (password !== conpassword) {
            return setError({ text: 'Password is not matching', color: 'danger' })
        }
        if (name && email && password) {
            let result = await x({ variables: { name, email, password, gender } })

            let { createUser } = result.data
            console.log(createUser);

            if (createUser.success) {
                localStorage.setItem("__tokenx", createUser.token)
                localStorage.setItem("__userx", JSON.stringify(createUser.user))
                window.location.pathname = '/'
                setTimeout(() => {

                    history.push('/')

                }, 500);
                return setError({
                    text: createUser.msg.text,
                    color: createUser.msg.color
                })

            } else {
                return setError({
                    text: createUser.msg.text,
                    color: createUser.msg.color
                })
            }

        } else {
            return setError({ text: 'Fill up the blank', color: 'warning' })
        }

    }

    return {
        handleSignup,
        error
    }
}

export default UseSignup;
