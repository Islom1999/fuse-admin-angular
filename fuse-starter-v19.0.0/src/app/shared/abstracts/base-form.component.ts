import { Directive, inject, OnInit, ChangeDetectorRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FuseLoadingService } from '@fuse/services/loading'
import { FuseConfirmationService } from '@fuse/services/confirmation'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { Observable } from 'rxjs'

@Directive()
export abstract class BaseFormComponent<T> implements OnInit {
  protected loadingService = inject(FuseLoadingService)
  protected confirmationService = inject(FuseConfirmationService)
  protected dialogRef = inject(DynamicDialogRef, { optional: true })
  protected dialogConfig = inject(DynamicDialogConfig, { optional: true })
  protected cdr = inject(ChangeDetectorRef)

  form = new FormGroup({})
  model: Partial<T> = {}
  fields: FormlyFieldConfig[] = []
  id?: string
  isEditMode = false
  isArchiveView = false

  ngOnInit(): void {
    this.id = this.dialogConfig?.data?.id
    this.isArchiveView = this.dialogConfig?.data?.isArchiveView || false
    this.initFormFields()
    this.isEditMode = !!this.id

    if (this.isEditMode && this.id) {
      this.loadData(this.id)
    }
  }

  protected abstract initFormFields(): void

  private loadData(id: string): void {
    setTimeout(() => this.loadingService.show())
    this.getById(id, this.isArchiveView).subscribe({
      next: (data: T) => {
        this.model = this.mapToModel(data)
        this.initFormFields()
        setTimeout(() => this.loadingService.hide())
        this.cdr.markForCheck()
      },
      error: () => {
        setTimeout(() => this.loadingService.hide())
        this.dialogRef?.close(false)
      },
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    setTimeout(() => this.loadingService.show())

    const request = this.isEditMode ? this.update(this.id!, this.model) : this.create(this.model)

    request.subscribe({
      next: () => {
        setTimeout(() => this.loadingService.hide())
        this.dialogRef?.close(true)
      },
      error: () => {
        setTimeout(() => this.loadingService.hide())
      },
    })
  }

  onCancel(): void {
    this.dialogRef?.close(false)
  }

  onDelete(): void {
    if (!this.id) return

    const confirmation = this.confirmationService.open({
      title: this.getDeleteTitle(),
      message: this.getDeleteMessage(),
      icon: {
        show: true,
        name: 'heroicons_outline:exclamation-triangle',
        color: 'warn',
      },
      actions: {
        confirm: {
          show: true,
          label: 'Delete',
          color: 'warn',
        },
        cancel: {
          show: true,
          label: 'Cancel',
        },
      },
      dismissible: true,
    })

    confirmation.onClose.subscribe((result) => {
      if (result === 'confirmed') {
        setTimeout(() => this.loadingService.show())
        this.delete(this.id!).subscribe({
          next: () => {
            setTimeout(() => this.loadingService.hide())
            this.dialogRef?.close(true)
          },
          error: () => {
            setTimeout(() => this.loadingService.hide())
          },
        })
      }
    })
  }

  protected abstract getById(id: string, isArchiveView: boolean): Observable<T>
  protected abstract create(data: Partial<T>): Observable<T>
  protected abstract update(id: string, data: Partial<T>): Observable<T>
  protected abstract delete(id: string): Observable<T>
  protected abstract mapToModel(data: T): Partial<T>
  protected abstract getDeleteTitle(): string
  protected abstract getDeleteMessage(): string
}
