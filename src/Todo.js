import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./Todo.css";
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Quotes from './Quotes';


const getLocalstorageData = () =>{
  let lists = localStorage.getItem('list');

  if(lists){
    return JSON.parse(localStorage.getItem('list'));
  }else{
    return [];
  }
}


function Todo() {

    const [todos,setTodo] = useState(getLocalstorageData());
    const [input,setInput] = useState("");
    const [toggle,settoggle] = useState(true);
    const [isEdit,setisEdit] = useState(null);
   

    const addTodo = (e) =>{
         e.preventDefault();

        if(!input){
          alert("please fill the Data");


        }else if (input && !toggle) {
          setTodo(todos.map(i => {
           if(i.id ===isEdit ){
             return {...i,name:input}
           }
           return i;
          })
          )
          settoggle(true);
          setInput("");
          setisEdit(null);


         
        }
        
        else{

           const allinput = {id: new Date().getTime().toString(),name:input}
            setTodo([...todos,allinput]);
            setInput("");

        }
        

    }

    console.log(input);
    const deleteTodo = (index) => {



        const deleteList = todos.filter((elem) =>{
            return index != elem.id;
        })

        setTodo(deleteList);

    }

    const updateTodo = (id) => {

      const newupdateTodo = todos.find(i => {
        return i.id === id;
      }) 

      // console.log(newupdateTodo);
      settoggle(false);
      setInput(newupdateTodo.name);
      setisEdit(id);





    }

    useEffect(() => {
      localStorage.setItem('list',JSON.stringify(todos))
    },[todos]);
  
  return (
      
  <>
  <div className='body'>

    <Quotes />
  <Box className="box" >
      <form>

      
      <Typography className='heading' variant="h4">Todo App</Typography>
   <TextField value={input} onChange={e => setInput(e.target.value)} className='input' variant="standard" />
   <IconButton type="submit" onClick={addTodo} >
     {
       toggle ?   <AddIcon  className='button'  /> : <EditIcon className='button1'  />


     }
      
      </IconButton>
      </form>
     


      <List >
       

             {todos.map((todo,ind) => {
                 return(

                    
               <div key={todo.id}>
                    <ListItem  disablePadding > 
                    <ListItemIcon ><CheckCircleIcon   className='compicon' /> </ListItemIcon>
                   <ListItemText className="list"  >{todo.name}</ListItemText>
                   <ListItemIcon><EditIcon  className='updateicon' onClick={() => updateTodo(todo.id)} /> </ListItemIcon>
                   <ListItemIcon><DeleteIcon className='deleteicon' onClick={() => deleteTodo(todo.id)} /> </ListItemIcon>
                  
                   </ListItem>
                   </div>
                       
                       
      )})}

                 
                

           
   
          
        </List>

      

      


  </Box>
  </div>
  </>
  )
}

export default Todo
