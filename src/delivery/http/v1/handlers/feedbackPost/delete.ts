import { Response} from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>

export type DeletePost = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildDeletePost = ({feedbackPost}: Params): DeletePost=>{
  return async (req, res)=>{

    const data = await feedbackPost.deletePost({
    post_id:req.params.post_id
    })

    return res.status(200).json(data);
  }
}
