import {UseCaseParams} from '@/domain/usecase/types';
import { IFeedbackPostUpvote } from '@/domain/entity/postUpvote';

export type ToggleUpvote = (params:{
    id:string
    post_id:string
}) =>
    Promise<IFeedbackPostUpvote | never>
export const buildToggleUpvote = ({adapter}: UseCaseParams): ToggleUpvote=>{
  return async ({id,post_id})=>{
    console.log(id)
    let upvote = await adapter.feedbackPostUpvoteRepository.get({
        where:{
            userId:id,
            feedbackPostId:post_id
        }
    })

    if (!upvote){
      upvote = await adapter.feedbackPostUpvoteRepository.create({
          data: {
            userId:id,
            feedbackPostId:post_id
          }
      })
      return {...upvote,message:`Post upvoted`}
    }
    else{
        await adapter.feedbackPostUpvoteRepository.deleteUpvote({
            where:{
                id:upvote.id
            }
        })
        return {...upvote,message:`Upvote was removed`}
    }
  }
}
