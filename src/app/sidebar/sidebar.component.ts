import { Component, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EasingLogic, PageScrollConfig, PageScrollInstance, PageScrollService } from 'ng2-page-scroll';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentHeading = '';
  isActive: boolean;

  constructor(
    private router: Router,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
    ) {
        PageScrollConfig.defaultScrollOffset = 100;
        PageScrollConfig.defaultDuration = 1000;
        PageScrollConfig.defaultEasingLogic = {
            ease: (t: number, b: number, c: number, d: number): number => {
                
                // // circular easing out - decelerating to zero velocity
                // t /= d;
                // t--;
                // return c * Math.sqrt(1 - t*t) + b;

                // easeInOutCircular - acceleration until halfway, then deceleration
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                t -= 2;
                return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
                
                // // easeInOutExpo - accelerating until halfway, then decelerating
                // if (t === 0) return b;
                // if (t === d) return b + c;
                // if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                // return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };
  }

  ngOnInit() {

  }

  toggleActive() {
    this.isActive = !this.isActive;
  }
  
  scrollToHeading(heading) {
    this.router.navigate(['/'], { fragment: heading });
    this.currentHeading = heading;
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, `#${heading}`);
    this.pageScrollService.start(pageScrollInstance);
    this.isActive = !this.isActive;
  }
}
