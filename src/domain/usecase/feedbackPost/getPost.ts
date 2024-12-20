import {UseCaseParams} from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

export type GetPost = (params:{
  post_id:string
}) => Promise<IFeedbackPost | never>

export const buildGetPost = ({adapter}: UseCaseParams): GetPost=>{
  return async ({post_id})=>{
    const post = await adapter.feedbackPostRepository.get({
      where:{
        id:post_id
      }
    })

    if (!post){
      throw new NotFoundError({
        code: 'POST_NOT_FOUND'
      })
    }

    return post
  }
}
