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

        transition('* => init', [

            style({ opacity: 0, marginTop: '-18px' }),
            animate('1.2s linear', style({ opacity:1, marginTop: 0 }))

        ])

    ]),

    trigger('heroFade', [

        transition('* => init', [

            style({ transform: 'scale(.9)', opacity: 0, marginTop: '120px' }),
            animate('1s 1000ms linear', style({ transform: 'scale(1)', opacity: 1, marginTop: '150px' }))

        ]),

        transition('* => *', [
        
            query(':enter', [

                useAnimation(fadeAnimation, {
                    params: {
                        from: 0,
                        to: 1,
                        time: '0.5s 800ms ease-out'
                    }
                })
          
            ], { optional: true }),
        
            query(':leave', [

                useAnimation(fadeAnimation, {
                    params: {
                        from: 1,
                        to: 0,
                        time: '0.5s 800ms ease-out'
                    }
                })
          
            ], { optional: true }),
        ]),
    ]),

    trigger('staggerAnimation', [

        transition('* => init', [

            query('h4', [

                style({ opacity: 0 }),

            ], { optional: true }),

            query('h4', stagger('800ms', [

                animate('1s 1500ms ease', style({ opacity: 1 }))

            ]), { optional: true })

        ]),

        transition('* => fadeIn', [

            query('h4', [

                style({ opacity: 0 }),

            ], { optional: true }),
            query('h4', stagger('200ms', [

                animate('1s 200ms ease', style({ opacity: 1 }))

            ]), { optional: true })
        ]),

        transition('* => *', [

            query(':leave', [

                style({ opacity: 1 }),

            ], { optional: true }),

            query(':leave', stagger('200ms reverse', [
            // query(':leave', [

                animate('1s 100ms ease', style({ opacity: 0 })),
                style({ display: 'none' })

            ]), { optional: true })

        ])
    ])

  ]
})
export class HeroComponent implements OnInit {



  state = 'init';
  // state = 'fadeIn';
  scrolled: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;
    console.log(num);
    if (num > 110) {
      this.scrolled = true;
      this.state = 'fadeOut';
    }
    else if (this.scrolled && num < 110) {
      this.scrolled = false;
      this.state = 'fadeIn';
    }
  }
}
