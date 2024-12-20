import {UseCaseParams} from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

export type CreatePost = (params:{
  author_id:string,
  title:string,
  description:string,
  category_name:string
}) => Promise<IFeedbackPost | never>
export const buildCreatePost = ({adapter}: UseCaseParams): CreatePost=>{
  return async ({author_id,title,description,category_name})=>{
    let category = await adapter.feedbackPostCategoryRepository.get({
      where:{
        name:category_name.toLowerCase()
      }
    })

    if(!category){
      category = await adapter.feedbackPostCategoryRepository.create({
        data:{
          name:category_name.toLowerCase()
        }
      })
    }

    const post = await adapter.feedbackPostRepository.create({
      data:{
        author_id,
        title,
        description,
        category_id:category.id
      }
    })

    return post
  }
}