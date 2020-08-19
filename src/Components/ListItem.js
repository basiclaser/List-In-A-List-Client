import React, {useState} from "react"

function PostDeleteButton({_id}) {
    function handleClick() {
        if(window.confirm("Are you sure you want to delete this?")) {
            fetch('http://localhost:4000/api/posts/'+_id, {
                method: 'delete'
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
    return (
        <button onClick={handleClick}>delete</button>
    )
}

export default function ListItem({item}) {
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
            saveChanges()
        }
    }
    const saveChanges = () => {
        fetch(`http://localhost:4000/api/posts/${item._id}`,
        {
            method: "put",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })
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