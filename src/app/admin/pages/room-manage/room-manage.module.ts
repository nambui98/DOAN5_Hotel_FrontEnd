import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RoomManageService } from '../../../core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  providers: [RoomManageService, MessageService, ConfirmationService],
  imports: [CommonModule, ConfirmDialogModule],
  bootstrap: [RoomManageModule],
})
export class RoomManageModule {}
