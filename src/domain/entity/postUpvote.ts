import { Upvote } from "@prisma/client";


export interface IFeedbackPostUpvote extends Upvote{
    message?:string
}