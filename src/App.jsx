import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [todo, settodo] = useState(" ")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const SaveTols = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
    console.log(localStorage.getItem("todos"));
  };

  const handleAdd = () => {
    settodos(prevTodos => {
      const newTodos = [...prevTodos, { id: uuidv4(), todo, iscomplete: false }];
      SaveTols(newTodos);
      return newTodos;
    });
    settodo("");
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id == id;
    })
    // console.log(t)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    SaveTols(newTodos)
    settodos(newTodos)
  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    SaveTols(newtodos)
    settodos(newtodos)
    console.log(todos)
  }

  const handleChange = (e) => {
    settodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id == id
    })
    let newtodos = [...todos]
    newtodos[index].iscomplete = !newtodos[index].iscomplete
    SaveTols(newtodos)
    settodos(newtodos)
  }

  return (
    <>
      <Navbar />
      <div className="md:container bg-sky-100 md:mx-auto my-8 p-3 rounded-xl  min-h-[80vh] md:w-1/2 ">
        <h1 className='text-xl font-bold font-serif text-center'>iTask - Manage todo at one place</h1>
        <div className="addTodo flex flex-col gap-3">
          <h3 className='text-xl font-bold font-serif text-center mt-3'>Todo</h3>
          <div className='flex'>
            <input onChange={handleChange} value={todo} type="text" className='w-full mx-4 rounded-lg  ' />
          </div>
          <button disabled={todo.length < 3} onClick={handleAdd} className='cursor-pointer disabled:bg-blue-900 bg-blue-700 hover:bg-blue-600 p-1  text-white rounded-md  font-bold text-sm mx-auto w-1/3'>save</button>
        </div >
        <br />
        <h3 className='text-xl font-bold font-serif m-auto max-w-fit'>Your Todos</h3>
        <input className='my-4' type="checkbox" name="" id="show" onChange={toggleFinished} checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        
        {todos.length == 0 && <div>No Todos to display</div>}
        <div className='todos' >
          {todos.map(item => {
            return (showFinished || !item.iscomplete) && <div key={item.id} className="todo flex my-3 justify-around  ">
              <div className='flex gap-5 w-1/2 '>
                <input name={item.id} id='' type="checkbox" onChange={handleCheckbox} checked={item.iscomplete} />
                <div className={` max-w-full max-h-[250px] overflow-auto  ${item.iscomplete ? "line-through" : ""}`}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full  ">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-blue-700 hover:bg-blue-600 p-2 py-1 text-white rounded-md  font-bold text-sm m-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-700 hove  r:bg-blue-600 p-2 py-1 text-white rounded-md  font-bold text-sm m-1'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
