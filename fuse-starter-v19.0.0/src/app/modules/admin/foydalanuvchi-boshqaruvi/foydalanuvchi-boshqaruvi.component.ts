import { Component, inject, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { GridComponent, IColumn, GridService } from 'app/shared/components/grid'
import { TableFilterComponent, ITableFilterConfig } from 'app/shared/components/table-filter'
import { IFoydalanuvchiBoshqaruvi } from './common/foydalanuvchi-boshqaruvi.model'
import { ButtonModule } from 'primeng/button'
import { DialogService } from 'primeng/dynamicdialog'
import { FoydalanuvchiBoshqaruviFormComponent } from './foydalanuvchi-boshqaruvi-form/foydalanuvchi-boshqaruvi-form.component'
import { BaseTableComponent } from 'app/shared/abstracts'
import { FoydalanuvchiBoshqaruviGridService } from './common/foydalanuvchi-boshqaruvi-grid.service'

@Component({
  selector: 'app-foydalanuvchi-boshqaruvi',
  standalone: true,
  imports: [CommonModule, GridComponent, TableFilterComponent, ButtonModule],
  providers: [FoydalanuvchiBoshqaruviGridService, DialogService],
  templateUrl: './foydalanuvchi-boshqaruvi.component.html',
  styleUrls: ['./foydalanuvchi-boshqaruvi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoydalanuvchiBoshqaruviComponent extends BaseTableComponent<IFoydalanuvchiBoshqaruvi> {
  gridService = inject(FoydalanuvchiBoshqaruviGridService)
  formComponent = FoydalanuvchiBoshqaruviFormComponent

  filterConfig: ITableFilterConfig = {
    columns: 1,
    showResetButton: true,
    fields: [
      {
        key: 'name',
        type: 'input',
        label: 'admin.foydalanuvchiBoshqaruvi.name',
        placeholder: 'admin.foydalanuvchiBoshqaruvi.namePlaceholder',
      },
    ],
  }

  columns: IColumn[] = [
    {
      field: 'name',
      header: 'admin.foydalanuvchiBoshqaruvi.fields.name',
    },
    {
      field: 'key',
      header: 'admin.foydalanuvchiBoshqaruvi.fields.key',
    },
  ]

  protected getItemId(item: IFoydalanuvchiBoshqaruvi): string | undefined {
    return item.id
  }

  protected getEditHeaderKey(): string {
    return 'admin.foydalanuvchiBoshqaruvi.edit'
  }

  protected getCreateHeaderKey(): string {
    return 'admin.foydalanuvchiBoshqaruvi.create'
  }
}
