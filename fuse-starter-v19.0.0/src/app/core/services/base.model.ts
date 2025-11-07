export interface IPagination<T> {
  count: number
  data: T
}

export interface IBaseModel {
  id: string
  version_id: bigint
  created_at: Date
  updated_at: Date
  deleted_at?: Date // <= SOFT DELETE
}
