import { AdapterParams } from '@/adapter/types';
import { buildGet, Get } from './get';
import { buildCreate, Create } from './create';
import { buildList, List } from './list';

type Params = Pick<AdapterParams, 'db'>

export type FeedbackPostCategoryRepository = {
  create: Create,
  get:Get,
  list:List
}
export const buildFeedbackPostCategoryRepository = (params: Params): FeedbackPostCategoryRepository=>{
  const create = buildCreate(params)
  const get = buildGet(params)
  const list = buildList(params)

  return {
    create,
    get,
    list
  }
}
