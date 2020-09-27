import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit {
  @Input() visible: any;
  @Input() room: any;
  @Output() visibleChanged: EventEmitter<any> = new EventEmitter();
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  ChangeAb() {
    this.visible = false;
    this.visibleChanged.emit(false);
  }
}
