import {Response} from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../../types';

type Params = Pick<DeliveryParams, 'feedbackPostUpvote'>
export type ToggleUpvote = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildToggleUpvote = ({feedbackPostUpvote}: Params): ToggleUpvote=>{
  return async (req, res)=>{
    console.log(req.user?.id)
    const posts = await feedbackPostUpvote.toggleUpvote({
      id:req.user?.id,
      post_id:req.params.post_id
    });
    
    return res.status(200).json(posts)
  }
}
