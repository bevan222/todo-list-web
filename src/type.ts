export interface Task {
    id: number,
    taskName: string,
    createTime: Date,
    dueDate: Date | null,
    creator: string ,
    complete: boolean,
    description: string,
    creatorId: number,
    modtime: Date | null
    //comment: comment[]
}

export interface comment {
    id: number,
    message: string,
    creator: string,
    createTime: Date,
}