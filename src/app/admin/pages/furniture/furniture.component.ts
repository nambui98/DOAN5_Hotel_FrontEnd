import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Floor, FloorService, Furniture, FurnitureService, Room, RoomManageService } from 'src/app/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit {

  furnitureDialog: boolean;

  furnitures: Furniture[];

  furniture: Furniture;
  modalType:any;
  submitted: boolean;
  exportColumns: any[];
  modalName:any;
  @ViewChild('fileInput') fileInput: FileUpload;
  constructor(
    private furnitureService: FurnitureService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.furnitureService.getAll().subscribe(
      (response) => {
        this.furnitures = response;
      },
    
    );
  }
  
  openNew() {
    this.furniture = {};
    this.modalName="Thêm mới";
    this.submitted = false;
    this.furnitureDialog = true;
  }

  edit(furniture: Furniture) {
    debugger
    this.modalType="edit";
    this.modalName="Sửa";
    this.furniture = { ...furniture };
    this.furnitureDialog = true;
  }

  delete(furniture: Furniture) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá ' + furniture.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.furnitureService.delete(furniture).subscribe(
          (response) => {
            // this.products = response;
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Xoá thành công',
              life: 3000,
            });
            this.getALL()
          }
        );
      },
    });
  }

  hideDialog() {
    this.furnitureDialog = false;
    this.submitted = false;
  }
  getALL(){
    this.furnitureService.getAll().subscribe(
      (response) => {
        this.furnitures = response;
      }
    );
  }
  save() {
    this.submitted = true;
    if (this.furniture.name.trim()) {
      if (this.furniture.id) {
        this.furnitureService.update(this.furniture).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Sửa thành công',
              life: 3000,
            });
            this.getALL()
          }
        );
      } else {
        this.furnitureService.addnew(this.furniture).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Tạo mới thành công',
              life: 3000,
            });
            this.getALL()
          }
        );
      }

      this.furnitures = [...this.furnitures];
      this.furnitureDialog = false;
      this.furniture = {};
    }
  }


  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.furnitures);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'furnitures');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

}
