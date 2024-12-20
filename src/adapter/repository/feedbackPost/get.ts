import {AdapterParams} from '@/adapter/types';
import {Prisma} from '@prisma/client'
import { IFeedbackPost } from '@/domain/entity/feedbackPost';

type Params = Pick<AdapterParams, 'db'>

export type Get = (params:Prisma.FeedbackPostFindManyArgs)=>Promise<IFeedbackPost | null | never>
export const buildGet = ({db}: Params): Get =>{
  return async (getParams )=>{
    const posts = await db.client.feedbackPost.findFirst(getParams) as IFeedbackPost

    return posts
  }
}
