import {UseCaseParams} from '@/domain/usecase/types';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
import { Prisma, Status } from '@prisma/client';

export type UpdatePost = (params:{
  post_id:string,
  title?:string,
  description?:string,
  category_name?:string
  status?:Status
}) => Promise<IFeedbackPost | never>

export const buildUpdatePost = ({adapter}: UseCaseParams): UpdatePost=>{
  return async ({post_id, title, description, category_name, status})=>{
    const updateData: Prisma.FeedbackPostUpdateInput = {};

    //adding parameter to the updateData if provided in body
    if (title) {
      updateData.title = title;
    }

    if (description) {
      updateData.description = description;
    }

    //if category doesn't exist create a new category
    if (category_name) {
      let category = await adapter.feedbackPostCategoryRepository.get({
        where: { name: category_name }
      });

      if (!category) {
        category = await adapter.feedbackPostCategoryRepository.create({
          data:{
            name:category_name.toLowerCase()
          }
        })
      }
      
      updateData.category = { connect: { id: category.id } }; // This connects the post with the category by its ID
    }

    if (status) {
      updateData.status = status;
    }

    const post = await adapter.feedbackPostRepository.update({
      where:{
        id:post_id
      },
      data:updateData
    })

    return post
  }
}