import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core'
import { FileType } from 'app/shared/enums/file_type'
import { UploadFileService } from './common/upload-file.service'
import { IUploadFile, UploadFileData } from './common/upload-file.model'
import { Constants } from 'app/core/config/constant.config'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileComponent implements OnChanges {
  @Input() multiple: boolean = false
  @Input() acceptType: FileType = FileType.image
  @Input() maxSizeOverride?: number
  @Input() uploadUrl: string = ''
  @Input() files: { id: string }[] = []
  @Output() fileSelected = new EventEmitter<UploadFileData[]>()

  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef<HTMLInputElement>
  selectedFiles: UploadFileData[] = []

  FILE_MAX_SIZE = Constants.FILE_MAX_SIZE
  FILE_ALLOWED_MIMES = Constants.FILE_ALLOWED_MIMES

  private _fileService = inject(UploadFileService)
  private cdr = inject(ChangeDetectorRef)

  ngOnChanges() {
    this.selectedFiles = (this.files || []).map((file) => ({
      file: null,
      uploadData: { id: file.id } as IUploadFile,
    }))
    this.cdr.markForCheck()
  }

  focusFileInput() {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.click()
    }
  }

  getFilePreview(file: UploadFileData): string | null {
    return file.uploadData?.id
      ? `${this._fileService.baseFileUrl}/${file.uploadData.id}/stream`
      : null
  }

  removeFile(file: UploadFileData) {
    this.selectedFiles = this.selectedFiles.filter((f) => f != file)
    this.cdr.markForCheck()
    this.fileSelected.emit(this.selectedFiles)
  }

  clearFiles() {
    this.selectedFiles = []
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = ''
    }
    this.fileSelected.emit([])
    this.cdr.markForCheck()
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (!input.files) return

    const files = Array.from(input.files)
    const validFiles: File[] = []

    for (const file of files) {
      const type = this.detectFileType(file)
      if (!type) continue

      const maxSize = this.maxSizeOverride ?? this.FILE_MAX_SIZE[FileType.image]
      if (file?.size > maxSize) continue

      validFiles.push(file)
    }

    const uploadFile: UploadFileData[] = []
    if (this.multiple) {
      this._fileService.uploadFiles(this.uploadUrl, validFiles).subscribe((event) => {
        event.forEach((file, index) => {
          uploadFile.push({ file: validFiles[index], uploadData: file })
        })

        this.selectedFiles = [...this.selectedFiles, ...uploadFile]
        this.fileSelected.emit(this.selectedFiles)
        this.cdr.markForCheck()
      })
    } else {
      if (validFiles[0]) {
        this._fileService.uploadFile(this.uploadUrl, validFiles[0]).subscribe((event) => {
          uploadFile.push({ file: validFiles[0], uploadData: event })
          this.selectedFiles = [...uploadFile]
          this.cdr.markForCheck()
          this.fileSelected.emit(this.selectedFiles)
        })
      }
    }
  }

  private detectFileType(file: File): FileType | null {
    if (this.FILE_ALLOWED_MIMES[this.acceptType].includes(file?.type)) return this.acceptType
    return null
  }
}
