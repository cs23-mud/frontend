import React, {useState, useEffect} from "react"
import axios from "axios"

const World = () => {

    useEffect(() => {
        axios.get("http://localhost:8000/api/adv/init/", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err.response)
        })
    }, [])
    return (
        <h1>World</h1>
    )
}

export default World