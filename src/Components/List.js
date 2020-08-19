import React, { useState, useEffect } from "react"
import ListItem from "./ListItem"

export default function List() {
    const [list, setList] = useState()
    useEffect(()=>{
        fetch("http://localhost:4000/api/posts")
            .then(res => res.json())
            .then(res => setList(res))
    },[])
    return (
        <div className="posts-list">
            {list ? (
                <div>
                    <h2>{list.length} posts</h2>
                    <ul>
                        {list.map(item=> <ListItem key={item._id} item={item} />).reverse()}
                    </ul>
                </div>
                ) : (
                    <h1>loading</h1>
                )
            }
        </div>
    )
}