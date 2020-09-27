import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Room } from 'src/app/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  visibleSidebar: any;
  active: any;
  visibleSidebar2: any;
  RoomActive: any;
  rooms = [
    {
      id: 1,
      name: 'Phòng 101',
      floor: 1,

      image: 'normal_11-571252810.jpg',
      price: 200000,
      status: 1,
    },
    {
      id: 2,
      floor: 1,

      name: 'Phòng 102',
      image: '429f6596e21902abaaadb5fa60bdfb81.jpg',
      status: 2,
      price: 200000,
    },
    {
      id: 3,
      floor: 1,
      name: 'Phòng 103',
      image:
        'a25-hotel-45-phan-chu-trinh-khach-san-2-sao-quan-hoan-kiem-ha-noi.jpg',
      price: 200000,
      status: 3,
    },
    {
      id: 4,
      name: 'Phòng 104',
      image: 'imagesRoom1.jpg',
      floor: 1,
      price: 200000,
      status: 4,
    },
    {
      id: 5,
      name: 'Phòng 201',
      image: 'images.jpg',
      price: 200000,
      floor: 2,
      status: 1,
    },
    {
      id: 6,
      name: 'Phòng 202',
      image: 'phong-2-nguoi-khach-san-moran.jpg',
      price: 200000,
      status: 2,
      floor: 2,
    },
  ];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  changeStatusSideBar(room) {
    // debugger;
    this.active = room.id;
    this.RoomActive = room;
    this.visibleSidebar = true;
  }
  visibleChanged(visible) {
    this.visibleSidebar = visible;
  }
}
