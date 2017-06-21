import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { transition, useAnimation, trigger, query, stagger, style, animate } from '@angular/animations';
import { fadeAnimation } from '../animations/animations';

import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
      trigger('linkFade', [

          transition('* => *', [
          
              query(':enter', [

                  useAnimation(fadeAnimation, {
                      params: {
                          from: 0,
                          to: 1,
                          time: '0.5s 100ms ease-out'
                      }
                  })
            
              ], { optional: true }),
          
              query(':leave', [

                  useAnimation(fadeAnimation, {
                      params: {
                          from: 1,
                          to: 0,
                          time: '0.5s ease-out'
                      }
                  })
            
              ], { optional: true }),
          ]),
      ]),
      
      trigger('staggerAnimation', [

          transition('* => fadeIn', [

              query('li', [

                  style({ opacity: 0, marginTop: '-50px' }),

              ], { optional: true }),

              query('li', stagger('100ms', [

                  animate('0.5s 100ms ease-in-out', style({ opacity: 1, marginTop: 0 }))

              ]), { optional: true })

          ]),

          transition('* => *', [

              query(':leave', [

                  style({ opacity: 1, marginTop: 0 }),

              ], { optional: true }),

              query(':leave', stagger('100ms', [

                  animate('0.5s 100ms ease-in-out', style({ opacity: 0, marginTop: '-50px' })),

              ]), { optional: true })

          ])
      ])
  ]
})
export class HeaderComponent implements OnInit {
  scrolled: boolean = false;
  navScrolled: boolean = false;
  state = '';
  navState = '';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() { }



  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;
    if (num > 205) {
      this.navState = 'fadeIn';
      this.navScrolled = true;
    }
    else if (this.navScrolled && num < 205) {
      this.navState = 'fadeOut';
      this.navScrolled = false;
    }
    if (num > 161) {
      this.scrolled = true;
      this.state = 'fadeIn';
    } else if (this.scrolled && num < 110) {
      this.scrolled = false;
      this.state = 'fadeOut';
    }
  }
}
