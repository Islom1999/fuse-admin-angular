// Example of a custom TitleStrategy
import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Subject, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateTitleStrategy extends TitleStrategy {
    #titleService = inject(Title);
    #translate = inject(TranslocoService);
    #titleSubject = new Subject<string>();

    constructor() {
        super();
        this.#titleSubject
            .pipe(
                switchMap((newTitle) =>
                    this.#translate.selectTranslate(newTitle)
                )
            )
            .subscribe((newTitle) => {
                this.#titleService.setTitle(newTitle);
            });
    }

    override updateTitle(routerState: RouterStateSnapshot) {
        const newTitle = this.buildTitle(routerState);
        if (newTitle !== undefined) {
            this.#titleSubject.next(newTitle);
        }
    }
}
