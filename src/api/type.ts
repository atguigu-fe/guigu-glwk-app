export interface PageParams {
  page: number
  limit: number
}

export interface CommnetParams extends PageParams {
  courseId: number | string
}

export interface CommentAddParams {
  content: string
  courseId: string | number
  techerId: string | number
}
