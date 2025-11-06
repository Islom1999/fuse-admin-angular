import { Component, ViewEncapsulation } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { FuseIconComponent } from '@fuse/components/icon'

@Component({
  selector: 'app-landing-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [ButtonModule, RouterLink, FuseIconComponent],
})
export class LandingHomeComponent {
  /**
   * Constructor
   */
  constructor() {}
}
