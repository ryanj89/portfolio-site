import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isActive: boolean;

  constructor() { }

  ngOnInit() {
  }

  onActive() {
    this.isActive = !this.isActive;
  }
  
}
