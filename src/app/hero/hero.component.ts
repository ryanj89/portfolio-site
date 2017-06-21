import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { fadeAnimation } from '../animations/animations';

import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('bgFade', [

        // transition('* => init', [

        //     style({ opacity: 0, marginTop: '-18px' }),
        //     animate('1.2s linear', style({ opacity:1, marginTop: 0 }))

        // ]),

        transition('* => *', [
            query(':enter', [

                style({ opacity: 0, marginTop: '-18px' }),
                animate('1s ease', style({ opacity:1, marginTop: 0 }))
                
            ], { optional: true }),

            query(':leave', [

                style({ opacity: 1 }),
                animate('0.5s ease-out', style({ opacity:0 })),

            ], { optional: true })
        ])

    ]),

    trigger('heroFade', [

        transition('* => init', [

            style({ transform: 'scale(.95)', opacity: 0 }),
            animate('1s 1200ms linear', style({ transform: 'scale(1)', opacity: 1 }))

        ]),

        transition('* => *', [
        
            query(':enter', [
                style({ opacity: 0, transform: 'scale(0.95)' }),
                animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
                // useAnimation(fadeAnimation, {
                //     params: {
                //         from: 0,
                //         to: 1,
                //         time: '0.5s ease-out'
                //     }
                // })
          
            ], { optional: true }),
        
            query(':leave', [

                style({ opacity: 1, transform: 'scale(1)' }),
                animate('0.5s ease-out', style({ opacity: 0, transform: 'scale(0.95)' }))
                // useAnimation(fadeAnimation, {
                //     params: {
                //         from: 1,
                //         to: 0,
                //         time: '0.5s ease-out'
                //     }
                // })
          
            ], { optional: true }),
        ]),
    ]),

    trigger('staggerAnimation', [

        transition('* => init', [

            query('h4', [

                style({ opacity: 0 }),

            ], { optional: true }),

            query('h4', stagger('750ms', [

                animate('1s 2200ms ease-in', style({ opacity: 1 }))

            ]), { optional: true })

        ]),

        transition('* => fadeIn', [

            query('h4', [

                style({ opacity: 0, transform: 'translateY(-100px)' }),

            ], { optional: true }),
            query('h4', stagger('200ms', [

                animate('1s 200ms ease', style({ opacity: 1, transform: 'translateY(0)'  }))

            ]), { optional: true })
        ]),

        transition('* => fadeOut', [

            query(':leave', [

                style({ opacity: 1, transform: 'translateY(0)' }),

            ], { optional: true }),

            query(':leave', [

                animate('0.5s 100ms ease-in-out', style({ opacity: 0, transform: 'translateY(-100px)' })),

            ], { optional: true })

        ])
    ])

  ]
})
export class HeroComponent implements OnInit {

  bgScrollTop = 0;
  state = 'init';
  linkState = 'init';
  bgToggled: boolean = true;

  scrolled: boolean = false;
  linkScrolled: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;

    this.bgScrollTop = -(num * 0.22);
    console.log(num);
    
    if (num > 205) {
      this.linkState = 'fadeOut';
      this.linkScrolled = true;
    }
    else if (this.linkScrolled && num < 205) {
      this.linkState = 'fadeIn';
      this.linkScrolled = false;
    }
    if (num > 161) {
      this.scrolled = true;
      this.state = 'fadeOut';
    }
    else if (this.scrolled && num < 110) {
      this.scrolled = false;
      this.state = 'fadeIn';
    }

    if (num > 665) {
      this.bgToggled = false;
    } else if (!this.bgToggled && num < 650) {
      this.bgToggled = true;
    }
    

  }
}
