import { DeliveryParams } from '@/delivery/types';
import Express from 'express';
import { createRouteHandler } from '../../../routeHandler';
import { IHandler } from '../../types';
import { buildToggleUpvote, ToggleUpvote } from './toggleUpvote';
import { autorizationRequiredRules } from '../../auth/rules';

type Params = Pick<DeliveryParams, 'feedbackPostUpvote'>;

export type FeedbackPostMethods = {
  toggleUpvote: ToggleUpvote,
};

const buildRegisterRoutes = (methods: FeedbackPostMethods) => (
  (root: Express.Router) => {
    const namespace = Express.Router();

    // OpenAPI Comment for the /toggleUpvote endpoint
    /**
     * @openapi
     * /feedbackPostUpvote/toggleUpvote/{post_id}:
     *   get:
     *     summary: Toggle upvote on a feedback post
     *     description: Allows a user to toggle their upvote on a feedback post. If the user has already upvoted the post, the upvote will be removed. Otherwise, the upvote will be added. Requires Authorization
     *     tags:
     *       - Feedback Post Upvote
     *     parameters:
     *       - in: path
     *         name: post_id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the feedback post to update.
     *     responses:
     *       200:
     *         description: Successfully toggled upvote for the post.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: The user ID.
     *       400:
     *         description: Bad request (missing required parameters).
     *       500:
     *         description: Internal server error.
     */
    namespace.get(
      '/toggleUpvote/:post_id',
      autorizationRequiredRules,
      createRouteHandler(methods.toggleUpvote)
    );

    root.use('/feedbackPostUpvote', namespace);
  }
);

export const buildFeedbackPostUpvoteHandler = (params: Params): IHandler => {
  const toggleUpvote = buildToggleUpvote(params);

  return {
    registerRoutes: buildRegisterRoutes({
      toggleUpvote
    })
  };
};
