import { fadeAnimation } from './animations/animations';
import { query, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
      trigger('fadeImg', [
          transition('* => *', [
              query(':enter', [
                  style({ opacity: 0 }),

              ],{ optional: true}),
              query(':enter', [
                  useAnimation(fadeAnimation, { params: { from: 0, to: 1, time: '0.5s ease-in'}}),

              ],{ optional: true}),
              query(':leave', [
                  style({ opacity: 1 }),

              ],{ optional: true}),
              query(':leave', [
                  useAnimation(fadeAnimation, { params: { from: 1, to: 0, time: '0.5s ease-out'}}),

              ],{ optional: true}),
          ])
      ])
  ]
})
export class AppComponent {
  scrollTop: number = 0;
  anim = '';
  toggled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;
    this.scrollTop = -((num - 455) * 0.15);

    if (num > 1455) {
      this.toggled = true;
      this.anim = 'fadeOut';
    } else {
      this.toggled = false;
      this.anim = 'fadeIn';
    }

    // console.log(num);

    

  }

}
