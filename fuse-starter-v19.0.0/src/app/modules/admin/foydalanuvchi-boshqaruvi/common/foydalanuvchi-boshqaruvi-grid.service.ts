import { inject, Injectable } from '@angular/core'
import { GridService } from 'app/shared/components/grid/common/grid.service'
import { FoydalanuvchiBoshqaruviService } from './foydalanuvchi-boshqaruvi.service'
import { IFoydalanuvchiBoshqaruvi } from './foydalanuvchi-boshqaruvi.model'
import { TableQueryDTO } from 'app/shared/services/base-crud.service'
import { map, Observable } from 'rxjs'
import { GridResponse } from 'app/shared'

@Injectable()
export class FoydalanuvchiBoshqaruviGridService extends GridService<IFoydalanuvchiBoshqaruvi> {
  private foydalanuvchiBoshqaruviService = inject(FoydalanuvchiBoshqaruviService)

  constructor() {
    super()
  }

  override getAllData(
    params: TableQueryDTO,
    isArchiveView: boolean,
  ): Observable<GridResponse<IFoydalanuvchiBoshqaruvi>> {
    return this.foydalanuvchiBoshqaruviService.getAllPagination(params, isArchiveView).pipe(
      map((response) => ({
        count: response.count,
        data: Array.isArray(response.data) ? response.data : [],
      })),
    )
  }
}
