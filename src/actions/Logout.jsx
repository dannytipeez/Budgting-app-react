import { redirect } from "react-router-dom"

//helpers
import { deleteItem } from "../helpers"


export default async function LogOutAction({key}) {
    return (
        //delete user
        deleteItem({
            key: "userName"
        }),
        //redirect
        redirect("/")
    )
}