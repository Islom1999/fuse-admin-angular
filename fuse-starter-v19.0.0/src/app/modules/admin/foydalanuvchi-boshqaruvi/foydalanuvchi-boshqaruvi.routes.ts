import { Routes } from '@angular/router'
import { FoydalanuvchiBoshqaruviComponent } from './foydalanuvchi-boshqaruvi.component'
import { FoydalanuvchiBoshqaruviFormComponent } from './foydalanuvchi-boshqaruvi-form/foydalanuvchi-boshqaruvi-form.component'
import { DITokens } from 'app/core/utils/di-tokens'

export const foydalanuvchiBoshqaruviRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FoydalanuvchiBoshqaruviComponent,
      },
      {
        path: 'create',
        component: FoydalanuvchiBoshqaruviFormComponent,
      },
      {
        path: 'edit/:id',
        component: FoydalanuvchiBoshqaruviFormComponent,
      },
    ],
  },
]

export default foydalanuvchiBoshqaruviRoutes
