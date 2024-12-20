import { AdapterParams, UnknownTx } from "@/adapter/types"
import { IFeedbackPostUpvote } from "@/domain/entity/postUpvote"
import { Prisma } from "@prisma/client"

type Params = Pick<AdapterParams, 'db'>

export type Get = (data: Prisma.UpvoteFindFirstArgs, tx?: UnknownTx)=>Promise<IFeedbackPostUpvote | never>

export const buildGet = ({db}: Params): Get=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).upvote.findFirst(data) as IFeedbackPostUpvote
  }
}
