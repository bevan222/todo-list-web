import React from "react";
import CommentItem from "./CommentItem";
import NewComment from "./NewComment";
import { comment } from "../type";

interface CommentListProps {
    comments: Array<comment>,
    fetchNewComment: () => Promise<void>,
    taskId: number,
    creatorId: number
}

const CommentList: React.FC<CommentListProps> = ({comments, fetchNewComment, taskId, creatorId}) => {
    return (
        <React.Fragment>
            <div className="flex items-center pt-4">
                <h1 className="px-4">Comment</h1>
            </div>
            <div className="p-4 m-4 bg-gray-100 shadow-inner">
                {
                    comments.map((comment:comment) => {
                        return (
                            <CommentItem comment={comment} fetchNewComment={fetchNewComment}/>
                        )
                    })
                }
                <NewComment taskId={taskId} fetchNewComment={fetchNewComment}/>
            </div>
        </React.Fragment>
    )
}

export default CommentList