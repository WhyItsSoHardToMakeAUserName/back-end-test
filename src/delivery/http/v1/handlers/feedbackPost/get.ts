import {Response} from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>
export type GetPost = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildGetPost = ({feedbackPost}: Params): GetPost=>{
  return async (req, res)=>{
    const posts = await feedbackPost.getPost({
        post_id:req.params.post_id
    });
    
    return res.status(200).json(posts)
  }
}
