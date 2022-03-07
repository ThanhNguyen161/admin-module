import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @ViewChild('mainElement', {
    static: true
  }) mainElement: ElementRef<HTMLElement>;
  constructor() {}

  ngOnInit(): void {
    this.drawImage();
  }

  drawImage() {
    let c = 45;
  
  }
}
