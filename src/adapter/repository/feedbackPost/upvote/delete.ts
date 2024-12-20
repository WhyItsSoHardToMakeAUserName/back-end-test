import { AdapterParams, UnknownTx } from "@/adapter/types"
import { IFeedbackPostUpvote } from "@/domain/entity/postUpvote"
import { Prisma } from "@prisma/client"

type Params = Pick<AdapterParams, 'db'>

export type Delete = (data: Prisma.UpvoteDeleteArgs, tx?: UnknownTx)=>Promise<IFeedbackPostUpvote | never>

export const buildDelete = ({db}: Params): Delete=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).upvote.delete(data) as IFeedbackPostUpvote  }
}
