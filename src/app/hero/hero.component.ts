import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('bgFade', [
      transition('* => fadeIn', [
        style({ opacity: 0, marginTop: '-18px' }),
        animate('1.2s linear', style({ opacity:1, marginTop: 0 }))
      ]),
      transition('* => fadeOut', [
        animate(2000, style({ opacity:0 }))
      ])
    ]),
    trigger('heroFade', [
      transition('* => fadeIn', [
        style({ transform: 'scale(.9)', opacity: 0, marginTop: '170px' }),
        animate('1s 1000ms linear', style({ transform: 'scale(1)', opacity:1, marginTop: '150px' }))
      ]),
      transition('* => fadeOut', [
        animate(2000, style({ opacity:0 }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
        ], { optional: true }),
        query(':enter', stagger('800ms', [
          animate('1.2s 2000ms ease-out', style({ opacity: 1 }))
        ]), { optional: true })
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  items = ['Developer', 'Designer', 'Musician'];
  state = 'fadeIn';
  scrolled: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() { }

  fadeIn() {
    this.state = 'fadeIn';
  }
  fadeOut() {
    this.state = 'fadeOut';
  }


  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //   let num = this.document.body.scrollTop;
  //   // console.log(num);
  //   if (num > 130) {
  //     this.scrolled = true;
  //     // this.state = 'fadeOut';
  //   } else if (this.scrolled && num < 50) {
  //     this.scrolled = false;
  //     // this.state = 'fadeIn';
  //   }
  // }
}
