import {UseCaseParams} from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

export type DeletePost = (params:{
  post_id:string
}) => Promise<IFeedbackPost | never>

export const buildDeletePost = ({adapter}: UseCaseParams): DeletePost=>{
  return async ({post_id})=>{

    const post = await adapter.feedbackPostRepository.delete({
      where:{
        id:post_id
      }
    })

    return post
  }
}