import { Response} from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>

export type UpdatePost = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildUpdatePost = ({feedbackPost}: Params): UpdatePost=>{
  return async (req, res)=>{

      const data = await feedbackPost.updatePost({
        post_id:req.params.post_id,
        title:req.body.title,
        description:req.body.description,
        category_name:req.body.category_name,
        status:req.body.status,
      })

    return res.status(200).json(data);
  }
}
