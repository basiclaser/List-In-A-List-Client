import React, {useState, useEffect} from "react"

export default function ListForm() {
    const [formState, setFormState] = useState({
        title:"",
        content:""
    })

    useEffect(()=>{
        console.log(formState)
    }, [formState])

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:4000/api/posts', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...formState})
            })
            .then(res=>res.json())
            .then(console.log)
            // .then(res=>console.log(res))
            .catch((error) => {
                console.error('Error:', error);
            });
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