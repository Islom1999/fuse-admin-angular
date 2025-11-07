import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core'
import { MockClient } from 'app/core/mock'
import { ButtonDirective } from 'primeng/button'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'type-upload',
  standalone: true,
  imports: [FormsModule, FormlyModule, ButtonDirective],
  template: `
    <input type="file" [hidden]="true" #file (change)="handleFileInput($event)" />
    <div class="flex gap-4 items-center">
      @if (uploadedImgSrc(); as uploadedImgSrc) {
        <img [src]="uploadedImgSrc" width="100px" alt="" />
      } @else if (formControl.parent?.value?.fileDataUrl) {
        <img [src]="formControl.parent?.value?.fileDataUrl" width="100px" alt="" />
      }
      <button
        pButton
        icon="pi pi-upload"
        type="button"
        (click)="file.click()"
        aria-label="uploadFile"
      ></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeUpload extends FieldType<FieldTypeConfig> {
  private $cdr = inject(ChangeDetectorRef)
  private $file = inject(MockClient)
  uploadedImgSrc = signal<string | undefined>(undefined)

  handleFileInput(e: Event) {
    const file = (e.target as HTMLInputElement)?.files?.item(0)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        this.uploadedImgSrc.set(reader.result as string)
      }
      reader.readAsDataURL(file)

      this.$file
        .uploadFileToMinIO(this.props['filePath'], {
          data: file,
          fileName: file.name,
        })
        .subscribe((w) => {
          if (w) {
            this.formControl.setValue(w)
          }
          this.$cdr.markForCheck()
        })
    }
  }
}
