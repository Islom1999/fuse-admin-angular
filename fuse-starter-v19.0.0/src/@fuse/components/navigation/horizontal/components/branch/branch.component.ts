import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FuseHorizontalNavigationBasicItemComponent } from '@fuse/components/navigation/horizontal/components/basic/basic.component';
import { FuseHorizontalNavigationDividerItemComponent } from '@fuse/components/navigation/horizontal/components/divider/divider.component';
import { FuseHorizontalNavigationComponent } from '@fuse/components/navigation/horizontal/horizontal.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseIconComponent } from '@fuse/components/icon';
import { TooltipModule } from 'primeng/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { Popover } from 'primeng/popover';

@Component({
    selector: 'fuse-horizontal-navigation-branch-item',
    templateUrl: './branch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        NgClass,
        NgTemplateOutlet,
        NgFor,
        FuseHorizontalNavigationBasicItemComponent,
        forwardRef(() => FuseHorizontalNavigationBranchItemComponent),
        FuseHorizontalNavigationDividerItemComponent,
        TooltipModule,
        FuseIconComponent,
    ],
})
export class FuseHorizontalNavigationBranchItemComponent
    implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_child: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() child: boolean = false;
    @Input() item: FuseNavigationItem;
    @Input() name: string;
    @ViewChild('overlayPanel') overlayPanel: Popover;

    menuOpen: boolean = false;
    private _fuseHorizontalNavigationComponent: FuseHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._fuseHorizontalNavigationComponent =
            this._fuseNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._fuseHorizontalNavigationComponent.onRefreshed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Trigger the change detection
     */
    triggerChangeDetection(): void {
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    toggleOverlay(event: Event, panel: Popover): void {
        if (this.item.disabled) {
            return;
        }

        panel.toggle(event);
    }

    onOverlayShow(): void {
        this.menuOpen = true;
        this.triggerChangeDetection();
    }

    onOverlayHide(): void {
        this.menuOpen = false;
        this.triggerChangeDetection();
    }

    toggleChildMenu(): void {
        if (this.item.disabled) {
            return;
        }

        this.menuOpen = !this.menuOpen;
        this.triggerChangeDetection();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
