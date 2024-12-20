import { AdapterParams } from '@/adapter/types';
import { buildList, List} from './list'
import { buildCreate, Create } from './create';
import { buildUpdate, Update } from './update';
import { buildDelete, Delete } from './delete';
import { buildGet, Get } from './get';

type Params = Pick<AdapterParams, 'db'>

export type FeedbackPostRepository = {
  get: Get,
  create: Create,
  list: List,
  update: Update,
  delete: Delete
}
export const buildFeedbackPostRepository = (params: Params): FeedbackPostRepository=>{
  const list = buildList(params)
  const get = buildGet(params)
  const create = buildCreate(params)
  const update = buildUpdate(params)
  const deletePost = buildDelete(params)

  return {
    get,
    create,
    list,
    update,
    delete:deletePost
  }
}
