import React, { useState, useEffect, useContext } from "react"
import ListItem from "./ListItem"
import {AppContext} from "../Context/AppContext"

export default function List() {

    const {list, setList, sayHello} = useContext(AppContext)

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