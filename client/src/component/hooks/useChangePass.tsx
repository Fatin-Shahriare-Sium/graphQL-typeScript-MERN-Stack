import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'

let CHANGE_PASSWORD = gql`

mutation($email:String!,$old:String!,$new:String!){
    changePass(email:$email,oldPassword:$old,newPassword:$new){
        text
        color
    }
}

`


const UseChangePass = () => {
    let [changePass] = useMutation(CHANGE_PASSWORD)
    let [error, setError] = useState<{ text: string, color: string }>({ text: '', color: '' })
    async function handleChangePassword(e: any) {
        e.preventDefault()
        let email = e.target[0].value
        let oldPassword = e.target[1].value
        let newPass = e.target[2].value



        if (email && oldPassword && newPass) {
            let { data } = await changePass({ variables: { email, old: oldPassword, new: newPass } })

            return setError({
                text: data.changePass.text,
                color: data.changePass.color
            })

        } else {
            return setError({
                text: 'Please,fill the gap',
                color: 'warning'
            })
        }
    }

    return { handleChangePassword, error }

}

export default UseChangePass;
