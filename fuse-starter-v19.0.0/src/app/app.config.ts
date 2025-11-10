import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router'
import { provideFuse } from '@fuse'
import { provideTransloco, TranslocoService } from '@ngneat/transloco'
import { firstValueFrom } from 'rxjs'
import { appRoutes } from 'app/app.routes'
import { provideAuth } from 'app/core/auth/auth.provider'
import { provideIcons } from 'app/core/icons/icons.provider'
import { mockApiServices } from 'app/mock-api'
import { TranslocoHttpLoader } from './core/transloco/transloco.http-loader'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { providePrimeNG } from 'primeng/config'
import { FusePrimePreset } from './core/primeng/fuse-primeng.preset'
import { PrimeNgThemeService } from './core/primeng/primeng-theme.service'
import { provideFormlyCore, FORMLY_CONFIG } from '@ngx-formly/core'
import { withFormlyPrimeNG } from '@ngx-formly/primeng'
import { registerTranslateExtension } from './shared/ngx-formly/translate.extension'
import { TypeAutocomplete } from './shared/ngx-formly/type-autocomplete'
import { TypeDatepicker } from './shared/ngx-formly/type-datepicker'
import { TypeInputMask } from './shared/ngx-formly/type-input-mask'
import { TypeInputNumber } from './shared/ngx-formly/type-input-number'
import { TypeMultiSelect } from './shared/ngx-formly/type-multiselect'
import { TypeTextArea } from './shared/ngx-formly/type-textarea'
import { TypeUpload } from './shared/ngx-formly/type-upload.component'
import { environment } from 'environments/environment.development'
import { DITokens } from './core/utils/di-tokens'
import { authInterceptor } from './core/auth/auth.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),

    {
      provide: DITokens.API_BASE_URL,
      useValue: environment.apiUrl,
    },

    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: FusePrimePreset,
        options: {
          prefix: 'p',
          darkModeSelector: 'html.dark',
          cssLayer: false, // Disable CSS layers for now
        },
      },
    }),

    // Initialize PrimeNG Theme Service
    provideAppInitializer(() => {
      inject(PrimeNgThemeService)
      // Service will automatically start listening to theme changes
    }),

    // Formly Config
    provideFormlyCore([
      ...withFormlyPrimeNG(),
      {
        types: [
          {
            name: 'textarea',
            component: TypeTextArea,
            wrappers: ['form-field'],
          },
          {
            name: 'input-number',
            component: TypeInputNumber,
            wrappers: ['form-field'],
          },
          {
            name: 'input-mask',
            component: TypeInputMask,
            wrappers: ['form-field'],
          },
          {
            name: 'datepicker',
            component: TypeDatepicker,
            wrappers: ['form-field'],
          },
          {
            name: 'autocomplete',
            component: TypeAutocomplete,
            wrappers: ['form-field'],
          },
          {
            name: 'multiselect',
            component: TypeMultiSelect,
            wrappers: ['form-field'],
          },
          {
            name: 'upload',
            component: TypeUpload,
            wrappers: ['form-field'],
          },
        ],
      },
    ]),
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: registerTranslateExtension,
      deps: [TranslocoService],
    },

    // Transloco Config
    provideTransloco({
      config: {
        availableLangs: [
          {
            id: 'en',
            label: 'English',
          },
          {
            id: 'tr',
            label: 'Turkish',
          },
        ],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: true,
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => {
      const initializerFn = (() => {
        const translocoService = inject(TranslocoService)
        const defaultLang = translocoService.getDefaultLang()
        translocoService.setActiveLang(defaultLang)

        return () => firstValueFrom(translocoService.load(defaultLang))
      })()
      return initializerFn()
    }),

    // Fuse
    provideAuth(),
    provideIcons(),
    provideFuse({
      mockApi: {
        delay: 0,
        services: mockApiServices,
      },
      fuse: {
        layout: 'classy',
        scheme: 'light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme: 'theme-default',
        themes: [
          {
            id: 'theme-default',
            name: 'Default',
          },
          {
            id: 'theme-brand',
            name: 'Brand',
          },
          {
            id: 'theme-teal',
            name: 'Teal',
          },
          {
            id: 'theme-rose',
            name: 'Rose',
          },
          {
            id: 'theme-purple',
            name: 'Purple',
          },
          {
            id: 'theme-amber',
            name: 'Amber',
          },
        ],
      },
    }),
  ],
}
