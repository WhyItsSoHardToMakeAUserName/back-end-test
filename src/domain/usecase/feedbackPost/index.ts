import { UseCaseParams } from '@/domain/usecase/types';
import { buildGetList, GetList } from './getList';
import { buildCreatePost, CreatePost } from './createPost';
import { buildDeletePost, DeletePost } from './deletePost';
import { buildUpdatePost, UpdatePost } from './updatePost';
import { buildGetPost, GetPost } from './getPost';

export type feedbackPostUseCase = {
  getList: GetList;
  getPost: GetPost
  createPost: CreatePost;
  deletePost: DeletePost;
  updatePost: UpdatePost;
}

export const buildFeedbackPostUseCase = (params: UseCaseParams): feedbackPostUseCase => {
  const getList = buildGetList(params);
  const getPost = buildGetPost(params);
  const createPost = buildCreatePost(params)
  const deletePost = buildDeletePost(params)
  const updatePost = buildUpdatePost(params)

  return {
    getList,
    getPost,
    createPost,
    deletePost,
    updatePost
  }
}
