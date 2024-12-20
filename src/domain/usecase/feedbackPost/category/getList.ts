import {UseCaseParams} from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import { IFeedbackPost } from '@/domain/entity/feedbackPost';
import { IFeedbackPostCategory } from '@/domain/entity/postCategory';

export type GetList = () =>
    Promise<IFeedbackPostCategory[] | never>
export const buildGetList = ({adapter}: UseCaseParams): GetList=>{
  return async ()=>{
    const categories = await adapter.feedbackPostCategoryRepository.list({})

    if (!categories){
      throw new NotFoundError({
        code: 'CATEGORIES_NOT_FOUND'
      })
    }

    return categories
  }
}
