import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslocoPipe } from '@ngneat/transloco'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'form-action-buttons',
  standalone: true,
  imports: [CommonModule, TranslocoPipe, ButtonModule],
  templateUrl: './form-action-buttons.component.html',
})
export class FormActionButtonsComponent {
  @Input() isEditMode: boolean = false
  @Input() isFormValid: boolean = true
  @Input() showDelete: boolean = true

  @Output() delete = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
  @Output() submit = new EventEmitter<void>()

  onDelete(): void {
    this.delete.emit()
  }

  onCancel(): void {
    this.cancel.emit()
  }

  onSubmit(): void {
    this.submit.emit()
  }
}
