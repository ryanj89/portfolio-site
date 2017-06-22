import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  scrollTop: number = 0;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let num = this.document.body.scrollTop;
    this.scrollTop = -((num - 455) * 0.15);

    // console.log(num);

    

  }

}
