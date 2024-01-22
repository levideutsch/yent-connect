import React, { useContext, useEffect, useReducer } from "react"
import { UserContext } from "./context/User"

function LatestPost() {
    const {allPosts, seAllPosts} = useContext(UserContext)
console.log(allPosts)
    useEffect(() => {

    }, [allPosts])

    return (
        <div>
            <p>{allPosts.body}</p>
            <img src={allPosts.post_image_url}></img>
        </div>
    )
}
export default LatestPost