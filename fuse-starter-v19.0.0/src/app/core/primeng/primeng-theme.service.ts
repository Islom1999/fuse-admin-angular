import {
    Injectable,
    inject,
    Renderer2,
    RendererFactory2,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FuseConfigService } from '@fuse/services/config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class PrimeNgThemeService {
    private _renderer: Renderer2;
    private _fuseConfigService = inject(FuseConfigService);
    private _platformId = inject(PLATFORM_ID);

    constructor(rendererFactory: RendererFactory2) {
        this._renderer = rendererFactory.createRenderer(null, null);

        if (isPlatformBrowser(this._platformId)) {
            this._initializeThemeSync();
        }
    }

    private _initializeThemeSync(): void {
        // Subscribe to Fuse config changes
        this._fuseConfigService.config$
            .pipe(takeUntilDestroyed())
            .subscribe((config) => {
                this._updatePrimeNgTheme(config.scheme);
            });
    }

    private _updatePrimeNgTheme(scheme: 'light' | 'dark' | 'auto'): void {
        const htmlElement = document.documentElement;

        if (scheme === 'dark') {
            this._renderer.addClass(htmlElement, 'dark');
        } else if (scheme === 'light') {
            this._renderer.removeClass(htmlElement, 'dark');
        } else if (scheme === 'auto') {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            if (prefersDark) {
                this._renderer.addClass(htmlElement, 'dark');
            } else {
                this._renderer.removeClass(htmlElement, 'dark');
            }
        }
    }
}
