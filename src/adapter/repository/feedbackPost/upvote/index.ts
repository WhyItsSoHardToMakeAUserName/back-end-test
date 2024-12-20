import { AdapterParams } from '@/adapter/types';
import { buildCreate, Create } from './create';
import { buildDelete, Delete } from './delete';
import { buildGet, Get } from './get';

type Params = Pick<AdapterParams, 'db'>

export type FeedbackPostUpvoteRepository = {
  create: Create,
  deleteUpvote:Delete,
  get:Get
}
export const buildFeedbackPostUpvoteRepository = (params: Params): FeedbackPostUpvoteRepository=>{
  const create = buildCreate(params)
  const deleteUpvote = buildDelete(params)
  const get = buildGet(params)

  return {
    create,
    deleteUpvote,
    get
  }
}
