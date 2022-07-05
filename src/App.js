import './App.css';
import {useEffect, useState} from "react";
import TodoList from "./TodoList/TodoList";
import axios from "axios";

function App() {

    const [todo, setTodo] = useState([])
    const [title, setTitle] = useState("")
    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    const addTodo = () => {
        // const newTodo = {
        //     id: todo.length ? todo[todo.length - 1].id + 1 : 1,
        //     name: title,
        //     isDone: false
        // }
        // setTodo((state) => [newTodo])
        axios.post("https://62c14a40eff7f7856f0bafde.mockapi.io/frontend-4/todo", {

            name: title,
        })


            .then(({data}) => {
                setTodo([...todo, data])
            })
    }

    const deleteTodo = (id) => {
        setTodo(state => state.filter(el => el.id !== id))
        axios.delete(`https://62c14a40eff7f7856f0bafde.mockapi.io/frontend-4/todo/${id}`)
            .then(({data}) => {
                console.log(data)
            })
    }


    const changeStatus = (id) => {
        const element =todo.find(el=>el.id===id)

            axios.put(`https://62c14a40eff7f7856f0bafde.mockapi.io/frontend-4/todo/${id}`, {
                             isDone: !element.isDone
                         }).then(({data})=>{
                             setTodo(state=>state.map(el=>el.id===id?data:el))

            })









    }









    const updateTodo = (title, id) => {
        // setTodo(state => state.map(el => el.id === id ? {...el, name: title} : el))
        axios.put(`https://62c14a40eff7f7856f0bafde.mockapi.io/frontend-4/todo/${id}`,{
            name:title
        }).then(({data})=>{
            setTodo(state => state.map(el => el.id === id ? data : el))
        })
    }




    const getTodo = async () => {
        const url = await axios("https://62c14a40eff7f7856f0bafde.mockapi.io/frontend-4/todo")
        const {data} = await url
        setTodo(data)
        return;
    }

    //https://62c14a40eff7f7856f0bafde.mockapi.io/frontend-4/todo

    useEffect(() => {
        getTodo()
    }, [])


    return (
        <div className="App">
            <div className="container">
                <h1 className="text-4xl my-5">TODO UP</h1>
                <div className="flex-row flex flex-wrap justify-center">
                    <div className="basis-2/4  justify-center items-center">
                        <div className="">
                            <div className="flex">
                                <input type="search" id="default-search"
                                       onChange={handleChange}
                                       className="w-full p-3  mr-2    text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                       placeholder="type todo name" required/>
                                <button
                                    onClick={addTodo}
                                    className="text-white p-4      bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blur-300 ">
                                    add
                                </button>
                            </div>
                            <ul className="my-4  text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {
                                    todo.filter(el => el.isDone === false).map(el => <TodoList
                                        updateTodo={updateTodo}
                                        changeStatus={changeStatus} deleteTodo={deleteTodo} el={el}
                                        key={el.id}/>)
                                }
                            </ul>

                        </div>
                    </div>

                    <div className="flex flex-wrap w-full flex-row justify-center py-16">
                        <div className="basis-2/4">
                            <hr/>
                            finished works
                            <hr/>
                            <ul className="my-4 text-sm font-medium text-white bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 ">
                                {
                                    todo.filter(el => el.isDone === true).map(el => <TodoList
                                        updateTodo={updateTodo}
                                        changeStatus={changeStatus}
                                        deleteTodo={deleteTodo}
                                        el={el} key={el.id}/>)
                                }
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;


