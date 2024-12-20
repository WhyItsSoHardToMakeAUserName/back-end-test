import { AdapterParams, UnknownTx } from "@/adapter/types"
import { IFeedbackPostUpvote } from "@/domain/entity/postUpvote"
import { Prisma } from "@prisma/client"

type Params = Pick<AdapterParams, 'db'>

export type Create = (data: Prisma.UpvoteCreateArgs, tx?: UnknownTx)=>Promise<IFeedbackPostUpvote | never>

export const buildCreate = ({db}: Params): Create=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).upvote.create(data) as IFeedbackPostUpvote
  }
}
