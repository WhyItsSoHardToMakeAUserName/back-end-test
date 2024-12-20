import { Response} from 'express';
import { DeliveryParams } from '@/delivery/types';
import { AuthRequest } from '../types';

type Params = Pick<DeliveryParams, 'feedbackPost'>

export type CreatePost = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildCreatePost = ({feedbackPost}: Params): CreatePost=>{
  return async (req, res)=>{
    console.log(req.user?.id)
    


      const data = await feedbackPost.createPost({
      author_id: req.user?.id,
      title: req.body.title,
      description: req.body.description,
      category_name: req.body.category_name
    });

    return res.status(200).json(data);
  }
}
