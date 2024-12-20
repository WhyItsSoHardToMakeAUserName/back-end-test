import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { buildGetList, GetList } from './list';
import { createRouteHandler } from '../../../routeHandler';
import { IHandler } from '../../types';


type Params = Pick<DeliveryParams, 'feedbackPostCategory'>;

export type FeedbackPostMethods = {
  getList:GetList,
};

const buildRegisterRoutes = (methods: FeedbackPostMethods) => (
  (root: Express.Router) => {
    const namespace = Express.Router();

/**
 * @openapi
 * /FeedbackPostCategory/getAll:
 *   get:
 *     tags:
 *       - FeedbackPostCategory
 *     summary: Get all feedback post categories
 *     description: This endpoint retrieves all available feedback post categories, including their IDs and names.
 *     responses:
 *       200:
 *         description: Successfully retrieved all feedback post categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the category (UUID)
 *                   name:
 *                     type: string
 *                     description: The name of the category
 *       500:
 *         description: Server error while retrieving categories
 *       404:
 *         description: No categories found
 */


    namespace.get(
      '/getAll',
      createRouteHandler(methods.getList)
    )

    root.use('/feedbackPostCategory', namespace);
  }
);

export const buildFeedbackPostCategoryHandler = (params: Params): IHandler => {
  const getList = buildGetList(params)

  return {
    registerRoutes: buildRegisterRoutes({
      getList
    })
  };
};
