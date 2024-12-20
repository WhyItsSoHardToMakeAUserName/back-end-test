import { AdapterParams, UnknownTx } from "@/adapter/types"
import { IFeedbackPost } from "@/domain/entity/feedbackPost"
import { Prisma } from "@prisma/client"

type Params = Pick<AdapterParams, 'db'>

export type Update = (data: Prisma.FeedbackPostUpdateArgs, tx?: UnknownTx)=>Promise<IFeedbackPost | never>

export const buildUpdate = ({db}: Params): Update=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).feedbackPost.update(data) as IFeedbackPost
  }
}
