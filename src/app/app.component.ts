import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  scrollTop: number = 460;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;


    if (num > 460) {
        this.scrollTop = -(num * 0.22);
    } else {
      this.scrollTop = 460;
    }
    // console.log(num);

    

  }

}
