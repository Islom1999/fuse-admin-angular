import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { FoydalanuvchiBoshqaruviService } from '../common/foydalanuvchi-boshqaruvi.service'
import { IFoydalanuvchiBoshqaruvi } from '../common/foydalanuvchi-boshqaruvi.model'
import { FormlyModule } from '@ngx-formly/core'
import { BaseFormComponent } from 'app/shared/abstracts'
import { FormActionButtonsComponent } from 'app/shared'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-foydalanuvchi-boshqaruvi-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule, FormActionButtonsComponent],
  templateUrl: './foydalanuvchi-boshqaruvi-form.component.html',
  styleUrls: ['./foydalanuvchi-boshqaruvi-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoydalanuvchiBoshqaruviFormComponent extends BaseFormComponent<IFoydalanuvchiBoshqaruvi> {
  private crudService = inject(FoydalanuvchiBoshqaruviService)

  protected initFormFields(): void {
    this.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'admin.foydalanuvchiBoshqaruvi.fields.name',
          required: true,
        },
      },
    ]
  }

  protected getById(id: string, isArchiveView: boolean): Observable<IFoydalanuvchiBoshqaruvi> {
    return this.crudService.getById(id, isArchiveView)
  }

  protected create(data: Partial<IFoydalanuvchiBoshqaruvi>): Observable<IFoydalanuvchiBoshqaruvi> {
    return this.crudService.create(data)
  }

  protected update(
    id: string,
    data: Partial<IFoydalanuvchiBoshqaruvi>,
  ): Observable<IFoydalanuvchiBoshqaruvi> {
    return this.crudService.update(id, data)
  }

  protected delete(id: string): Observable<IFoydalanuvchiBoshqaruvi> {
    return this.crudService.delete(id)
  }

  protected mapToModel(data: IFoydalanuvchiBoshqaruvi): Partial<IFoydalanuvchiBoshqaruvi> {
    return {}
  }

  protected getDeleteTitle(): string {
    return 'Delete FoydalanuvchiBoshqaruvi'
  }

  protected getDeleteMessage(): string {
    return `Are you sure you want to delete "${this.model.id}"?`
  }
}
