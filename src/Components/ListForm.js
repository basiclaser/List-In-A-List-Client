import React, {useState,  useEffect, useContext} from "react"
import {AppContext} from "../Context/AppContext"

export default function ListForm() {
    const {create} = useContext(AppContext)
    const [formState, setFormState] = useState({
        title:"",
        content:""
    })

    useEffect(()=>{
        console.log(formState)
    }, [formState])

    const handleSubmit = (event) => {
        create(event, formState)
    }
    const handleChange = (event) => {
        event.persist()
        setFormState(prevState => {return {...prevState, [event.target.name]:event.target.value}})
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">
                title: 
            </label>
            <input onChange={handleChange} id="title" name="title" type="text" value={formState.title}/>

            <label htmlFor="content">
                content: 
            </label>
            <input onChange={handleChange} id="content" name="content" type="text" value={formState.content}/>

            <button type="submit">submit</button>
        </form>
    )
}