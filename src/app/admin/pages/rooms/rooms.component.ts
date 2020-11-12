import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { BookingService, FloorService, Room, RoomService } from '../../../core';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
    productDialog: boolean;
    submitted: boolean;
    visibleSidebar: any;
    active: any;
    visibleSidebar2: any;
    RoomActive: any;
    urlAPI = environment.apiUrlImg;
    errorMessage: any;
    loading: boolean;
    activeFloor: any;
    floors: any;
    rooms: any;
    booking: any;
    constructor(private primengConfig: PrimeNGConfig,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private bookingService: BookingService,
        private roomService: RoomService,
        private floorService: FloorService
    ) {
        this.activeFloor = 0
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.loading = true;
        this.floorService.getAll().subscribe(
            (response) => {
                this.floors = response;
            },
            (error) => {
                this.errorMessage = error;
                this.loading = false;
            },
            () => {
                this.loading = false;
            }
        );
        this.getAll();
    }
    getTimeCountDown(bookingTimeStart) {
        let startDate = new Date(bookingTimeStart);
        let endDate = new Date();
        let diff = (startDate.getTime() - endDate.getTime()) / 1000;
        diff /= 60;

        if (diff > 0) {
            if (startDate.getHours() >= endDate.getHours()) {
                diff = diff * 60;
            }
            diff = Math.round(diff)


        } else {

            diff = 0
        }
        return diff
    }
    getAll() {
        this.roomService.getByFloor(0).subscribe(
            (response) => {
                this.rooms = response;
                this.rooms.map(x => x.booking ? x.booking.timeCaculatar = this.getTimeCountDown(x.booking.bookingTimeStart) : '')
            },
            (error) => {
                this.errorMessage = error;
                this.loading = false;
            },
            () => {
                this.loading = false;
            }
        );
    }

    handleEvent(e, room: Room) {
        if (e.action === "done") {

            this.roomService.changeStatus(parseInt(room.id), 1).subscribe(
                (response) => {
                    // this.hideDialog();
                    this.visibleSidebar = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Thành công',
                        detail: '',
                        life: 3000,
                    });
                    this.getAll();

                }
            );
        }

    }
    changeStatusSideBar(room) {

        this.visibleSidebar = true;

        this.active = room.id;
        this.RoomActive = room;

    }
    visibleChanged(visible) {
        this.visibleSidebar = visible;
    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    public getByFloor(id_floor) {
        this.loading = true;
        this.errorMessage = '';
        this.activeFloor = id_floor;
        this.roomService.getByFloor(id_floor).subscribe(
            (response) => {
                this.rooms = response;
                this.rooms.map(x => x.booking ? x.booking.timeCaculatar = this.getTimeCountDown(x.booking.bookingTimeStart) : '')
            },
            (error) => {
                this.errorMessage = error;
                this.loading = false;
            },
            () => {
                this.loading = false;
            }
        );
    }
}
