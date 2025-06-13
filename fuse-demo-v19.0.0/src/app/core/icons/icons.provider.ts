import { EnvironmentProviders, inject, Provider, provideEnvironmentInitializer } from '@angular/core';
import { IconsService } from 'app/core/icons/icons.service';

export const provideIcons = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideEnvironmentInitializer(() => inject(IconsService)),
    ];
};
