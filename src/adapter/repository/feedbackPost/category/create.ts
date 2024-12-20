import { AdapterParams, UnknownTx } from "@/adapter/types"
import { IFeedbackPostCategory } from "@/domain/entity/postCategory"
import { Prisma } from "@prisma/client"

type Params = Pick<AdapterParams, 'db'>

export type Create = (data: Prisma.CategoryCreateArgs, tx?: UnknownTx)=>Promise<IFeedbackPostCategory | never>

export const buildCreate = ({db}: Params): Create=>{
  return async (data, tx)=>{
    return await db.getContextClient(tx).category.create(data) as IFeedbackPostCategory
  }
}
