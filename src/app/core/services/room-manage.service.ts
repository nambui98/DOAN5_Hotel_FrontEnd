import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room, RoomPrice } from '../models';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RoomManageService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  productNames: string[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
    'Grey T-Shirt',
    'Headphones',
    'Light Green T-Shirt',
    'Lime Band',
    'Mini Speakers',
    'Painted Phone Case',
    'Pink Band',
    'Pink Purse',
    'Purple Band',
    'Purple Gemstone Necklace',
    'Purple T-Shirt',
    'Shoes',
    'Sneakers',
    'Teal T-Shirt',
    'Yellow Earbuds',
    'Yoga Mat',
    'Yoga Set',
  ];

  constructor(private http: HttpClient) {}

  addnew(room:Room) {
    debugger
    room.idFloor=room.floor.id;
    room.createdBy=JSON.parse(localStorage.getItem('user')).id;
    room.status=1;
    room.floor=null;
    return this.http
      .post<any>(`${environment.apiUrl}/rooms`, 
       room
      )
      
  }
  update(room:Room) {
    room.idFloor=room.floor.id;
    room.createdBy=JSON.parse(localStorage.getItem('user')).id;
    room.status=1;
    room.floor=null;
    return this.http
      .put<any>(`${environment.apiUrl}/rooms/${room.id}`, 
       room
      )  
  }
  delete(room:Room) {
    debugger
    return this.http
      .delete<any>(`${environment.apiUrl}/rooms/${room.id}`)  
  }
  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(
      `${environment.apiUrl}/rooms`
    );
  }
  getProducts() {
    return this.http
      .get<any>('assets/test/products.json')
      .toPromise()
      .then((res) => <Room[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/products-orders-small.json')
      .toPromise()
      .then((res) => <Room[]>res.data)
      .then((data) => {
        return data;
      });
  }

  generatePrduct(): Room {
    const product: Room = {
      id: this.generateId(),
      name: this.generateName(),
      // description: 'Product Description',
      price: this.generatePrice(),
      // quantity: this.generateQuantity(),
      // category: 'Product Category',
      // inventoryStatus: this.generateStatus(),
      // rating: this.generateRating(),
    };

    product.image =
      product.name.toLocaleLowerCase().split(/[ ,]+/).join('-') + '.jpg';
    return product;
  }

  generateId() {
    let text = '';
    let possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.productNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generatePrice() {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  generateQuantity() {
    return Math.floor(Math.random() * Math.floor(75) + 1);
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(3))];
  }

  generateRating() {
    return Math.floor(Math.random() * Math.floor(5) + 1);
  }
  setUpPrice(id_room:number, roomPrice:RoomPrice): Observable<Room[]> {
    return this.http.put<Room[]>(
      `${environment.apiUrl}/rooms/setUpPrice/${id_room}`,roomPrice
    );
  }
}
