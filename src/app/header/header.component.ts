import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { transition, useAnimation, trigger, query } from '@angular/animations';
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
                          time: '0.5s'
                      }
                  })
            
              ], { optional: true }),
          ]),
      ])
  ]
})
export class HeaderComponent implements OnInit {
  scrolled: boolean = false;
  state = '';
  links = ['Developer', 'Designer', 'Musician'];

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() { }



  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;
    console.log(this.document.body.scrollTop);
    if (num > 130) {
      this.scrolled = true;
      this.state = 'fadeIn';
    } else if (this.scrolled && num < 50) {
      this.scrolled = false;
      this.state = 'fadeOut';
    }
  }
}
