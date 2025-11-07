import { IBaseModel } from 'app/core/services/base.model'

export interface UploadFileData {
  file: File
  uploadData: IUploadFile
}

export interface IUploadFile extends IBaseModel {
  file_type: string
  folder_name: string
  file_name: string
  file_orginal_name: string
  file_used_type: string
  used: boolean
}
