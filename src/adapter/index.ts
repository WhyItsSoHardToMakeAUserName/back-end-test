import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildFeedbackPostRepository, FeedbackPostRepository } from './repository/feedbackPost';
import { buildFeedbackPostCategoryRepository, FeedbackPostCategoryRepository } from './repository/feedbackPost/category';
import { buildFeedbackPostUpvoteRepository, FeedbackPostUpvoteRepository } from './repository/feedbackPost/upvote';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';

export type Adapter = {
  userRepository: UserRepository;
  exampleGateway: ExampleGateway;
  feedbackPostRepository: FeedbackPostRepository,
  feedbackPostCategoryRepository: FeedbackPostCategoryRepository
  feedbackPostUpvoteRepository:  FeedbackPostUpvoteRepository
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const feedbackPostRepository = buildFeedbackPostRepository(params)
  const feedbackPostCategoryRepository = buildFeedbackPostCategoryRepository(params)
  const feedbackPostUpvoteRepository = buildFeedbackPostUpvoteRepository(params)
  
  const exampleGateway = buildExampleGateway(params);

  return {
    userRepository,
    feedbackPostRepository,
    feedbackPostCategoryRepository,
    exampleGateway,
    feedbackPostUpvoteRepository
  }
}
