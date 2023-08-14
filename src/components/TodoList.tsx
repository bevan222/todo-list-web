import React from "react";
import TodoItem from './TodoItem'
import { Task } from "../type";

interface TodoListProps {
    tasks: Array<Task>,
    sortOption: number,
    fetchTask: () => Promise<void>
}

const TodoList: React.FC<TodoListProps> = ({tasks, sortOption, fetchTask}) => {
    return (
        <ul className="my-4 max-w-screen">
            <li className="flex items-center py-2 overflow-auto text-center bg-white border border-black h-36 md:h-16">
                <div className="w-1/5 sm:w-1/6 place-items-center">Complete</div>
                <div className="w-1/5 sm:w-1/6 place-items-center">Task Name</div>
                <div className="hidden w-1/5 sm:w-1/6 sm:block place-items-center">Create time</div>
                <div className="w-1/5 sm:w-1/6 place-items-center">Due Date</div>
                <div className="w-1/5 sm:w-1/6 place-items-center">Creator</div>
                <div className="w-1/5 sm:w-1/6">Detail</div>
            </li>
            {
                tasks?.map(( task )=>(
                    <TodoItem task={task} key={task.id} sortOption={sortOption} fetchTask={fetchTask}/>
                ))
            }
        </ul>
    )
}

export default TodoList