import {Response} from 'express';
import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedbackPostCategory'>
export type GetList = (req: Request, res: Response)=>Promise<Response>

export const buildGetList = ({feedbackPostCategory}: Params): GetList=>{
  return async (req, res)=>{
    const posts = await feedbackPostCategory.getList();
    
    return res.status(200).json(posts)
  }
}
