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
                          time: '0.5s ease-in'
                      }
                  })
            
              ], { optional: true }),
          
              query(':leave', [

                  useAnimation(fadeAnimation, {
                      params: {
                          from: 1,
                          to: 0,
                          time: '0.6s 800ms ease'
                      }
                  })
            
              ], { optional: true }),
          ]),
      ]),
      
      trigger('staggerAnimation', [

          transition('* => fadeIn', [

              query('li', [

                  style({ opacity: 0 }),

              ], { optional: true }),

              query('li', stagger('100ms', [

                  animate('1s 200ms ease', style({ opacity: 1 }))

              ]), { optional: true })

          ]),

          transition('* => *', [

              query(':leave', [

                  style({ opacity: 1 }),

              ], { optional: true }),

              query(':leave', stagger('200ms reverse', [

                  animate('1s 100ms ease', style({ opacity: 0 })),
                  style({ display: 'none' })

              ]), { optional: true })

          ])
      ])
  ]
})
export class HeaderComponent implements OnInit {
  scrolled: boolean = false;
  state = '';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() { }



  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;
    if (num > 150) {
      this.scrolled = true;
      this.state = 'fadeIn';
    } else if (this.scrolled && num < 150) {
      this.scrolled = false;
      this.state = 'fadeOut';
    }
  }
}
