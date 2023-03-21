import { redirect } from "react-router-dom"

//helpers
import { deleteItem } from "../helpers"
import { toast } from "react-toastify"


export default async function LogOutAction({key}) {
    return (
        //delete user
        deleteItem({
            key: "userName"
        }),
        toast.success("You've successfully deleted your account!"),
        //redirect
        redirect("/")
    )
}