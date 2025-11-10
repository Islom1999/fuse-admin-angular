import { Injectable } from '@angular/core'
import { BaseCrudService } from 'app/shared/services/base-crud.service'
import { IFoydalanuvchiBoshqaruvi } from './foydalanuvchi-boshqaruvi.model'

@Injectable({ providedIn: 'root' })
export class FoydalanuvchiBoshqaruviService extends BaseCrudService<IFoydalanuvchiBoshqaruvi> {
  constructor() {
    super('admin/admin-permission')
  }
}
