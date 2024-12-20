import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { buildFeedbackPostUseCase, feedbackPostUseCase } from './feedbackPost';
import { UseCaseParams } from './types';
import { buildFeedbackPostCategoryUseCase, feedbackPostCategoryUseCase } from './feedbackPost/category';
import { buildFeedbackPostUpvoteUseCase, feedbackPostUpvoteUseCase } from './feedbackPost/upvote';

export type UseCase = {
  auth: AuthUseCase;
  example: ExampleUseCase;
  feedbackPost:feedbackPostUseCase;
  feedbackPostCategory:feedbackPostCategoryUseCase;
  feedbackPostUpvote:feedbackPostUpvoteUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const example = buildExampleUseCase(params);
  const feedbackPost = buildFeedbackPostUseCase(params)
  const feedbackPostCategory = buildFeedbackPostCategoryUseCase(params)
  const feedbackPostUpvote = buildFeedbackPostUpvoteUseCase(params)
  
  return {
    auth,
    example,
    feedbackPost,
    feedbackPostCategory,
    feedbackPostUpvote
  }
}
