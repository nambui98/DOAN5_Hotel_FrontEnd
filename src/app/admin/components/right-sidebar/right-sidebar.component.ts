import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { statusRoom } from '../../helpers/index';
import { environment } from '../../../../environments/environment';
import { Booking, BookingService, Room, RoomService } from 'src/app/core';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css'],
})
export class RightSidebarComponent implements OnInit {
  @Input() visible: any;
  @Input() room: any;
  @Input() booking: Booking;
  @Input() getResetData: Function; 
  @Output() visibleChanged: EventEmitter<any> = new EventEmitter();
  urlAPI=environment.apiUrlImg;
  productDialog: boolean;
  typeDialog: number;
  // booking:Booking;
  submitted: boolean;
  timeEnd:Date;
  statusRoom = statusRoom;
  constructor(private primengConfig: PrimeNGConfig,
    private bookingService: BookingService,
    private roomService: RoomService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    
    
  }
//  ngOnChanges():void{
//     if(this.room&&this.room.status===2){
//       debugger
//       this.bookingService.getByIdRoom(this.room.id).subscribe(
//         (response) => {
//           // this.booking = response;
//           debugger
//         }
//       );
//       debugger
//     }
//   }
  hideRigeSidebar() {
    this.visible = false;
    this.visibleChanged.emit(false);
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  openDialog(type) {
    // this.room = {};
    debugger;
    if(this.room.status===2){
      this.booking=this.room.booking
    }else{
debugger
      this.booking = {
    //     id:null,
    // idRoom:null,  
    // bookingUsername: null,  
    // bookingPhone: null,  
    // bookingTimeStart: null,
    // bookingTimeNow: null,
    // timeCaculatar:null,
    // status:null,
    // type:null,
      };
    }
    this.typeDialog = type;
    this.submitted = false;
    this.productDialog = true;
  }
  cancelBooking(room: Room) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn huỷ đặt trước phòng ' + this.room.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roomService.changeStatus(parseInt(room.id),1).subscribe(
          (response) => {
            this.hideDialog();
            debugger
            this.hideRigeSidebar();
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: '',
              life: 3000,
            });
            this.getResetData()
            
          }
        );
      },
    });
  }
  changeStatus(room: Room, status) {
    this.roomService.changeStatus(parseInt(room.id),status).subscribe(
      (response) => {
        this.hideDialog();
        this.hideRigeSidebar();
        
        this.getResetData()
        
      }
    );
  }
  saveBooking(booking){
    var datePipe = new DatePipe('en-US');
    // booking.id=
    if(this.room&&this.room.booking&& this.room.booking.status==1&& this.room.status==2){

      booking.id=this.room.booking.id
    }
    if(!booking.bookingUsername){
      booking.bookingUsername=this.room.booking.bookingUsername
    }
    if(!booking.bookingPhone){
      booking.bookingPhone=this.room.booking.bookingPhone
    }
    debugger
    booking.idRoom=this.room.id;
    if(booking.type){

      booking.type=parseInt(booking.type)
    }
    var d1 = new Date (),
    d2 = new Date ( d1 );
    // debugger
    
    booking.bookingTimeStart=datePipe.transform(d2.setMinutes ( d1.getMinutes() +booking.bookingTimeStart ), 'yyyy/MM/dd HH:mm:ss')
    booking.bookingTimeNow=datePipe.transform(new Date(), 'yyyy/MM/dd hh:mm:ss')
    booking.status=this.typeDialog===1?2:1
    this.bookingService.addnew(booking).subscribe(
      (response) => {
        this.hideDialog();
        this.hideRigeSidebar();
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: '',
          life: 3000,
        });
        this.getResetData()
        
      }
    );

  }
  handleEvent(e){
    if(e.action==="done"){
      this.roomService.changeStatus(this.room.id,1).subscribe(
        (response) => {
          this.hideDialog();
          this.hideRigeSidebar();
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: '',
            life: 3000,
          });
          this.getResetData()
          
        }
      );
    }
    
  }
}
