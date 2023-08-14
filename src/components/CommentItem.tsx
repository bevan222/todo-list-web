import React, { useState } from "react";
import { comment } from "../type";

interface CommentItemProps {
    comment: comment,
    fetchNewComment: () => Promise<void>
}

const CommentItem: React.FC<CommentItemProps> = ({comment, fetchNewComment}) => {
    const [modMode, setModMode] = useState(false)
    const [modMessage, setModMessage] = useState(comment.message)

    const handleCommentDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        fetch('http://localhost:5001/comment/deleteComment',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId: comment.id})
        })
        .then(res => res.json())
        .then((data) => {
            fetchNewComment()
            alert(data.message)
        })
        .catch((err) => {alert(err)});
    }

    const handleModMessageSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        fetch('http://localhost:5001/comment/modComment',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentId: comment.id, message: modMessage})
        })
        .then(res => res.json())
        .then((data) => {
            setModMode(false)
            fetchNewComment()
            alert(data.message)
        })
        .catch((err) => {alert(err)});
    }

    const handleModMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModMessage(event.target.value)
    };

    return (
        <div className="flex w-full px-2 mb-4">
            <div className="w-3/5 2xl:w-2/3">
                <div>
                    {comment.creator}, {new Date(comment.createTime).toISOString().slice(0,16).replace('T',' ')}
                </div>
                <div>
                    {modMode === false ? 
                        <div>{'=>'}{comment.message}</div>
                        :
                        <form>
                            <input type="text" name="taskName" className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleModMessageChange} defaultValue={modMessage} required></input>
                        </form>
                    }
                    
                </div>
            </div>
            <div className="items-center w-2/5 xl:flex 2xl:w-1/3">
                {modMode === false ? 
                    <button type="button" onClick={() => setModMode(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center mx-4 mb-2 xl:mb-0">Edit</button>
                    :
                    <button type="button" onClick={handleModMessageSubmitClick} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center mx-4 mb-2 xl:mb-0" disabled={modMessage.length === 0 ? true : false}>Comfirm</button>
                }
                <button type="button" onClick={handleCommentDeleteClick} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center mx-4" >Delete</button>
            </div>
        </div>
    )
}

export default CommentItem