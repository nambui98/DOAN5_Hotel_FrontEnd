import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoomManageService } from '../../../core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [CommonModule, ConfirmDialogModule],
  providers: [RoomManageService, MessageService, ConfirmationService],
  bootstrap: [StaffModule],
})
export class StaffModule {}
