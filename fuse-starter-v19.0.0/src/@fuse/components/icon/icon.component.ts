import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

type IconInput = string | null | undefined;

@Component({
    selector: 'fuse-icon',
    standalone: true,
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, NgClass],
})
export class FuseIconComponent
{
    @Input() set svgIcon(value: IconInput)
    {
        this._svgIcon = value ?? null;
        this.iconUrl = this._buildSvgIconUrl(this._svgIcon);
    }

    @Input() set icon(value: IconInput)
    {
        this._icon = value ?? null;
    }

    protected iconUrl: string | null = null;
    protected get iconClass(): string | null
    {
        return this._icon;
    }

    private _icon: string | null = null;
    private _svgIcon: string | null = null;
    private readonly _assetsPath: string = 'assets/icons/';

    private _buildSvgIconUrl(icon: string | null): string | null
    {
        if ( !icon )
        {
            return null;
        }

        let namespace: string = 'heroicons_outline';
        let iconName: string = icon;

        if ( icon.includes(':') )
        {
            const [ns, name] = icon.split(':', 2);
            namespace = ns || namespace;
            iconName = name || iconName;
        }

        const fileName = `${namespace.replace(/_/g, '-')}.svg`;
        return `${this._assetsPath}${fileName}#${iconName}`;
    }
}
