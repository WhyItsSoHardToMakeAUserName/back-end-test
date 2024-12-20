import { Adapter } from '@/domain/types';
import { UseCase } from '@/domain/usecase';

export type DeliveryParams = UseCase & Adapter

export type SortBy = {
    sort_by: "Date" | "UpvoteAsc" | "UpvoteDesc" | undefined
}