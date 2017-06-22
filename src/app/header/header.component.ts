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
                  style({ opacity: 0, transform: 'scale(0.95)' }),
                  // useAnimation(fadeAnimation, {
                  //     params: {
                  //         from: 0,
                  //         to: 1,
                  //         time: '0.5s 100ms ease-out'
                  //     }
                  // }),
                  animate('0.5s 100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
                  
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

  navbarBg = 'rgba(2, 18, 35, 1)';
  state = '';
  navState = '';
  bgScrollTop = 0;


  constructor(@Inject(DOCUMENT) private document: Document) { }


  ngOnInit() { }

  fadeInNav() {
    this.navState = 'fadeIn';
    this.navScrolled = true;
  }

  fadeOutNav() {
    this.navState = 'fadeOut';
    this.navScrolled = false;
  }

  fadeInBrand() {
    this.scrolled = true;
    this.state = 'fadeIn';
  }

  fadeOutBrand() {
    this.scrolled = false;
    this.state = 'fadeOut';
  }

  // WINDOW SCROLL
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;

    if (num > 205) {
      this.fadeInNav();
    }
    else if (this.navScrolled && num < 205) {
      this.fadeOutNav();
    }
    if (num > 161) {
      this.fadeInBrand();
    } 
    else if (this.scrolled && num < 110) {
      this.fadeOutBrand();
    }

    if (num > 1200) {
      this.navbarBg = 'url("/assets/img/mountain-nav.png")';
    } else {
      this.navbarBg = 'rgba(2, 18, 35, 1)';
    }
  }
}
