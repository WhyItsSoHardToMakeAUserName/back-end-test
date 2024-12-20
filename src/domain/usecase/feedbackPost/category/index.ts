import { UseCaseParams } from "../../types";
import { buildGetList, GetList } from "./getList";


export type feedbackPostCategoryUseCase = {
  getList: GetList;
}

export const buildFeedbackPostCategoryUseCase = (params: UseCaseParams): feedbackPostCategoryUseCase => {
  const getList = buildGetList(params);

  return {
    getList
  }
}
