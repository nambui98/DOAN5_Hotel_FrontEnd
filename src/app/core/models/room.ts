import { Booking } from './booking';
import { Floor } from './floor';
import { RoomPrice } from './RoomPrice';

export interface Room {
  id?: string;
  idFloor?: number;
  name?: string;
  roomNumber?: number;
  price?: number;
  createdBy?: string;
  status?: number;
  image?: string;
  type?: number;
  floor?:Floor;
  booking?:Booking;
  prices?:RoomPrice[]
}
