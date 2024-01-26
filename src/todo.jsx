import React, { useState } from 'react'

const Index = () =>{
    const [list , setList] = useState([])
    const [message,setMessage]= useState({
        text:"",
        id:""
    })
    const [editingItem, setEditingItem] = useState({
        id:"",
        isEditing:false
    })

    const handleEditState = (id) =>{
        console.log(id);
        setEditingItem({
            ...editingItem,
            id: id,
            isEditing:true
        })
        let editableItem = list.find((eachItem)=>{
            return eachItem.id === id
        })
        console.log(editableItem);
        setMessage({
            ...message,
            text: editableItem.text,
            id: editableItem.id
        })
    }


    const handleEdit = (e) =>{
        e.preventDefault()
        const newTodos = list.map((eachItem)=>{
             if(eachItem.id === editingItem.id){
                    return({
                        text:message.text,
                        id:editingItem.id
                    })
                    }
                    else{
                        return eachItem
                    }
        })
        setList(newTodos)
        setMessage({
            text:"",
            id:""
        })
        setEditingItem({
            id:"",
            isEditing:false
        })
    } 

 

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        const newList = {
            text : message.text,
            id: new Date().getTime().toString()
        }
        setList([...list,newList])
        console.log(newList);
   
    }




    const handleDelete = (id) =>{
        const newTodo = list.filter((eachItem)=>{
            return eachItem.id !== id
        })
        setList(newTodo)
    }



    
    return(
        <div>
            
            <h1 style={{color:"green", textDecoration:"underline"}}>TO DO LIST</h1>
            <form action="" >
                <input type="text" name="text" value={message.text} onChange={(e)=> setMessage({ ...message , text:e.target.value})} className='input'/>
                {
                    editingItem.isEditing ? <button onClick={handleEdit} className='button2'>Edit</button> : <button onClick={handleSubmit} className='button1'> Add</button>
                }
            </form>
        <div>
        
            <div>
                <ul className='list'>
                {
                list.length === 0 && <h1 style={{color:"green"}}>Currently Task list is Empty and Please Add Tasks</h1>
            }
                    {
                        list.map((eachItem)=>{
                            const {text, id} = eachItem;
                            return(
                                <li key={id} className='eachItem'>
                                    <span className='item'>{text}</span>
                                    <button onClick={() => handleEditState(id)} className='button2'>Edit</button>
                                    <button onClick={()=> handleDelete(id)} className='button3'>Delete</button>
                                    
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
        </div>
        
    )
}
export default Index