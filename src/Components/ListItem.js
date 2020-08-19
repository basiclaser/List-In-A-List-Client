import React, {useState, useContext} from "react"
import {AppContext} from "../Context/AppContext"

function PostDeleteButton({_id}) {
    const {kill} = useContext(AppContext)
    function handleClick() {
        if(window.confirm("Are you sure you want to kill this?")) {
            kill(_id)
        }
    }
    return (
        <button onClick={handleClick}>kill</button>
    )
}

export default function ListItem({item}) {
    const {update} = useContext(AppContext)
    const [title, setTitle] = useState(item.title)
    const [isEditing, setIsEditing] = useState(false)
    const handleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleClick = () => {
        setIsEditing(true)
    }
    const handleBlur = () => {
        setIsEditing(false)
    }
    const handleKeyPress = (event) => {
        if(event.key === "Enter") {
            update(item._id, title)
        }
    }
    return (
        <div className="listItem">
            <input 
                name="title"
                onClick={handleClick} 
                onBlur={handleBlur}
                onChange={handleChange} 
                onKeyPress={handleKeyPress}
                value={isEditing ? title : item.title}
                />
            
            <PostDeleteButton _id={item._id}/>
        </div>
    )
}