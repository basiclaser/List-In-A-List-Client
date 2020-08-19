import React, {createContext, useState, useEffect} from "react"

export const AppContext = createContext()

const initialList = []

const AppContextProvider = ({ children }) => {
    const [list, setList] = useState(initialList);
    
    // create
    const create = (event, values) => {
        event.preventDefault()
        fetch('http://localhost:4000/api/posts', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...values})
            })
            .then(res=>res.json())
            .then(res=>setList([...list,res]))
            // .then(res=>console.log(res))
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // read
    useEffect(()=>{
        fetch("http://localhost:4000/api/posts")
            .then(res => res.json())
            .then(res => setList(res))
    },[])
    //update
    const update = (_id, title) => {
        fetch(`http://localhost:4000/api/posts/${_id}`,
        {
            method: "put",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })
        .then(res=>res.json())
        .then(res=>{
            console.log({res})
            const updatedList = list.map(item => {
                if(item._id !== _id) return item
                return res
            })
            setList(updatedList)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    //delete
    const kill = (_id) => {
        fetch('http://localhost:4000/api/posts/'+_id, {
                method: 'delete'
        })
        .then(()=> setList(list.filter(item => item._id !== _id)))
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <AppContext.Provider value={{ list, setList, create, update, kill }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider