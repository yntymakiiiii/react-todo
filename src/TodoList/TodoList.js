import React, {useState} from "react";

const TodoList = ({el, deleteTodo, changeStatus, updateTodo}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(el.name)
    const handleChange = (e) => setTitle(e.target.value)
    const openInput = () => {
        setIsOpen(true)
    }
    const closeInput = (title, id) => {
        updateTodo(title, id)
        setIsOpen(false)
    }

    return (
        <li className=" px-4 py-2 border-b border-gray-200   rounded-t-lg dark:border-gray-600 flex items-center justify-between">
                                            <span className="flex">
                                                <input type="checkbox"
                                                       onClick={() => changeStatus(el.id)}
                                                       checked={el.isDone}
                                                />
                                                {
                                                    isOpen? <input type="text"

                                                                   defaultValue={el.name}
                                                                   onChange={handleChange}
                                                                   className="text-black m-4"/>:

                                                        <span
                                                            style={{
                                                                textDecoration:el.isDone ? "line-through":""
                                                            }}
                                                            className="mx-2">{el.name}</span>
                                                }
                                            </span>
            <span>
                                               <button type="button"
                                                       onClick={()=> isOpen? closeInput(title, el.id): openInput()}
                                                       className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                                   {isOpen ? "save": "change"}</button>

                                            <button type="button"
                                                    onClick={() => deleteTodo(el.id)}
                                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
                                            </span>
        </li>
    );
};
export default TodoList
