import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IUploadFile } from './upload-file.model'
import { DITokens } from 'app/core/utils/di-tokens'

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private http = inject(HttpClient)
  private apiBaseUrl = inject(DITokens.API_BASE_URL)

  public baseFileUrl = `${this.apiBaseUrl}/files`

  deleteFile(id: string) {
    throw new Error('Method not implemented.')
  }

  /**
   * Bitta faylni upload qilish
   * @param uploadUrl - backend url
   * @param file - upload qilinadigan fayl
   * @param extraData - qo‘shimcha data
   */
  uploadFile(
    uploadUrl: string,
    file: File,
    extraData?: { [key: string]: any },
  ): Observable<IUploadFile> {
    const formData = new FormData()
    formData.append('file', file, file?.name)

    if (extraData) {
      Object.keys(extraData).forEach((key) => {
        formData.append(key, extraData[key])
      })
    }

    // Oddiy POST
    return this.http.post<IUploadFile>(uploadUrl, formData)
  }

  /**
   * Bir nechta faylni upload qilish
   * @param uploadUrl - backend url
   * @param files - upload qilinadigan fayllar
   * @param extraData - qo‘shimcha data
   */
  uploadFiles(
    uploadUrl: string,
    files: File[],
    extraData?: { [key: string]: any },
  ): Observable<IUploadFile[]> {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('files', file, file?.name)
    })

    if (extraData) {
      Object.keys(extraData).forEach((key) => {
        formData.append(key, extraData[key])
      })
    }

    // Oddiy POST → faqat backend javobini qaytaradi
    return this.http.post<IUploadFile[]>(uploadUrl, formData)
  }
}
