import React,{ useEffect, useState } from "react";
import DropDownButton from "./DropDownButton";


interface NewCommentProps {
    taskId: number,
    fetchNewComment: () => Promise<void>
}

const NewComment: React.FC<NewCommentProps>  = ({taskId, fetchNewComment}) => {

    const [commentMessage, setCommentMessage] = React.useState('')
    const [userOptions, setUserOptions] = useState()
    const [creatorSelect, setCreatorSelect] = useState<{value:number, label:string}>()

    useEffect(() => {
        fetch('http://'+process.env.REACT_APP_API_HOST+'/user/getAllUser')
        .then(res => res.json())
        .then((data) => {
            const userOptions = data.users.map((user:{id:number, username: string})=>{
                return {value: user.id, label: user.username}
            })
            setUserOptions(userOptions)
        });
    },[])

    const handleNewTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(creatorSelect === undefined){
            alert('select a creator')
            return
        }
        if(commentMessage === ''){
            alert('please enter a comment')
            return
        }
        
        fetch('http://'+process.env.REACT_APP_API_HOST+'/comment/createComment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message:commentMessage, creatorId:creatorSelect?.value, belongTaskId:taskId})
        })
        .then(res => res.json())
        .then((data) => {
            alert(data.message)
            fetchNewComment()
        })
        .catch((err) => {alert(err)});
        
    }

    const handleCommentMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentMessage(event.target.value)
    };

    const handleCreatorSelect = (option: {value:number, label:string}) => {
        setCreatorSelect(option)
    };

    return (
        <div className="h-full rounded-xl">
            <form className="flex items-center pl-4" onSubmit={handleNewTaskSubmit}>
                <input className="w-full h-full px-2 py-2 rounded-l-lg" placeholder="Add a comment" onChange={handleCommentMessageChange}></input>
                {/* 選user */}
                <DropDownButton options={userOptions} optionValue={creatorSelect} onSelect={handleCreatorSelect}></DropDownButton>
                <button className="text-white my-6 bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-r-lg text-sm w-auto px-5 py-2.5 text-center">submit</button>
            </form>
        </div>
    )
}

export default NewComment