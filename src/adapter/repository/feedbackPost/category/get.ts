import { AdapterParams, UnknownTx } from "@/adapter/types"
import { IFeedbackPostCategory } from "@/domain/entity/postCategory"
import { Prisma } from "@prisma/client"

type Params = Pick<AdapterParams, 'db'>

export type Get = (data: Prisma.CategoryFindFirstArgs, tx?: UnknownTx)=>Promise<IFeedbackPostCategory | never>

export const buildGet = ({db}: Params): Get=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).category.findFirstOrThrow(data) as IFeedbackPostCategory
  }
}
