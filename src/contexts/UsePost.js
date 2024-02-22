import { useContext } from "react"
import { PostContext } from "./post"

export const usePost = ()=>{
    return useContext(PostContext)
}