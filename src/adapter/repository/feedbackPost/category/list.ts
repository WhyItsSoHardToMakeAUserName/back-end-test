import { AdapterParams, UnknownTx } from "@/adapter/types"
import { IFeedbackPostCategory } from "@/domain/entity/postCategory"
import { Prisma } from "@prisma/client"

type Params = Pick<AdapterParams, 'db'>

export type List = (data: Prisma.CategoryFindFirstArgs, tx?: UnknownTx)=>Promise<IFeedbackPostCategory[] | never>

export const buildList = ({db}: Params): List=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).category.findMany(data) as IFeedbackPostCategory[]
  }
}
