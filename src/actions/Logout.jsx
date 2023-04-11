import { redirect } from "react-router-dom"

//helpers
import { deleteItem } from "../helpers"
import { toast } from "react-toastify"


export default async function LogOutAction({ key }) {
    return (
        //delete user
        deleteItem({
            key: "userName"
        }),
        deleteItem({
            key: "budgets"
        }),
        deleteItem({
            key: "expenses"
        }),
        toast.success("You've successfully deleted your account!"),
        //redirect
        redirect("/")
    )
}