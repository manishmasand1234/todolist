import logo from './logo.svg';
import './App.css';
import {useState} from 'react';


function App() {

  let [todolist, setTodolist] = useState([]);


  let saveToDoList = (event) =>{

    
    
    let toname = event.target.toname.value;

    if(!todolist.includes(toname)){
        let finalDolist = [...todolist, toname]
        setTodolist(finalDolist)
    }
    else{
      alert(toname + " Already Added!!!!!!!!!!!!!")
    }

     event.preventDefault();
  }


  let list = todolist.map((value, index) =>{
    
    return (
      <ToDoListItems value={value} key={index} indexNumber={index} todolist={todolist} setTodolist={setTodolist} />
    )
  })


  return (
    <div className="App">
            <h1>TODO LIST</h1>
            <form onSubmit={saveToDoList}>
              <input type="text" name='toname' />
              <button>Save</button>
            </form>
            

            <div className='outerDiv'>
            <ul>
              {list}
            </ul>
            </div>


    </div>
      
  );
}

export default App;


function ToDoListItems({value , indexNumber , todolist , setTodolist}){

  let [status , setStatus] = useState(false);

  let deleteRow = ()=>{
    let finalData = todolist.filter((v,i) => i != indexNumber)
    setTodolist(finalData);
  }


  let any=()=>{
    setStatus(!status)
  }


  return (
    <li className={(status) ? 'compelete' : ""} onClick={any}>{indexNumber+1}   {value} <span onClick={deleteRow}>&times;</span></li>
  )
}