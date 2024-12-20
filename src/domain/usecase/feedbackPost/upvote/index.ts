import { UseCaseParams } from "../../types";
import { buildToggleUpvote, ToggleUpvote } from "./toggleUpvote";


export type feedbackPostUpvoteUseCase = {
  toggleUpvote: ToggleUpvote;
}

export const buildFeedbackPostUpvoteUseCase = (params: UseCaseParams): feedbackPostUpvoteUseCase => {
  const toggleUpvote = buildToggleUpvote(params);

  return {
    toggleUpvote
  }
}
