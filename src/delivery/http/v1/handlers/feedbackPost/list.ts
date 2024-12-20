import { Response } from 'express';
import { DeliveryParams, SortBy } from '@/delivery/types';
import { AuthRequest } from '../types';
import { Status } from '@prisma/client';

type Params = Pick<DeliveryParams, 'feedbackPost'>
export type GetList = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetList = ({ feedbackPost }: Params): GetList => {
  return async (req, res) => {
    // Ensure skip and take are valid numbers or set defaults
    const skip = isNaN(Number(req.query.skip)) ? undefined : Number(req.query.skip);
    const take = isNaN(Number(req.query.take)) ? undefined : Number(req.query.take);

    console.log(req.query)

    const posts = await feedbackPost.getList({
      category_name:req.query.category_name as string,
      status:req.query.status as Status,
      sortby:req.query.sort_by as "DateAsc"|"DateDesc"|"UpvoteAsc"|"UpvoteDesc",
      skip,
      take,
    });
    
    return res.status(200).json(posts);
  };
}
