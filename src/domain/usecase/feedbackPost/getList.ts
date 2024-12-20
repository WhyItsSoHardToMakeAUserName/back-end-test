import {UseCaseParams} from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
import { Prisma, Status } from '@prisma/client';

export type GetList = (params:{
  category_name?:string
  status?:Status
  sortby?:"DateAsc"|"DateDesc"|"UpvoteAsc"|"UpvoteDesc"

  skip?:number
  take?:number
}) =>
    Promise<IFeedbackPost[] | never>
export const buildGetList = ({adapter}: UseCaseParams): GetList=>{
  return async ({category_name,status,sortby,skip,take})=>{

    const category = await adapter.feedbackPostCategoryRepository.get({
      where:{
        name:category_name
      }
    })
    
    const queryParams : Prisma.FeedbackPostFindManyArgs = {
      where:{
        ...(category_name ? {category_id:category.id}:{}),
        ...(status && {status})
      },
      skip,
      take,
      orderBy:[]
    }

    if (sortby) {
      switch (sortby) {
        case 'DateAsc':
          queryParams.orderBy = { created_at: 'asc' }; // Sort by date created (newest first)
          break;
        case 'DateDesc':
          queryParams.orderBy = { created_at: 'desc' }; // Sort by date created (newest first)
          break;
        case 'UpvoteAsc':
          queryParams.orderBy = [
            {
              upvotes: {
                _count: 'asc',
              },
            },
            { created_at: 'desc' }, // Secondary sort by created_at if upvotes are equal
          ];
          break;
        case 'UpvoteDesc':
          queryParams.orderBy = [
            {
              upvotes: {
                _count: 'desc',
              },
            },
            { created_at: 'desc' }, // Secondary sort by created_at if upvotes are equal
          ];
          break;
      }
    }
    console.log(queryParams)

    const user = await adapter.feedbackPostRepository.list(queryParams)

    if (!user){
      throw new NotFoundError({
        code: 'USERS_NOT_FOUND'
      })
    }

    return user
  }
}
