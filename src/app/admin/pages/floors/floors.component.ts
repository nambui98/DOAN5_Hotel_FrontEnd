import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Floor, FloorService, Room, RoomManageService } from 'src/app/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css']
})
export class FloorsComponent implements OnInit {

  floorDialog: boolean;

  floors: Floor[];

  floor: Floor;
  modalType:any;
  selectedFloor: any;
  cols: any;
  submitted: boolean;
  exportColumns: any[];
  modalName:any;
  uploadedFiles: any[] = [];
  @ViewChild('fileInput') fileInput: FileUpload;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private floorService: FloorService
  ) {}

  ngOnInit() {
    this.floorService.getAll().subscribe(
      (response) => {
        this.floors = response;
      },
    
    );
   
   
  }
  
  
  

  openNew() {
    this.floor = {};
    this.modalName="Thêm mới";
    this.submitted = false;
    this.floorDialog = true;
    this.selectedFloor={}
  }

 

  editProduct(floor: Floor) {
    this.modalType="edit";
    this.modalName="Sửa";
    this.floor = { ...floor };
    this.floorDialog = true;
  }

  deleteProduct(floor: Floor) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xoá ' + floor.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.floorService.delete(floor).subscribe(
          (response) => {
            // this.products = response;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Deleted',
              life: 3000,
            });
            this.getALL()
          }
        );
      },
    });
  }

  hideDialog() {
    this.floorDialog = false;
    this.submitted = false;
  }
  getALL(){
    this.floorService.getAll().subscribe(
      (response) => {
        this.floors = response;
      }
    );
  }
  save() {
    this.submitted = true;
    if (this.floor.name.trim()) {
      if (this.floor.id) {
        this.floorService.update(this.floor).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Cập nhật tầng thành công',
              life: 3000,
            });
            this.getALL()
          }
        );
      } else {
        this.floorService.addnew(this.floor).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành công',
              detail: 'Tạo mới tầng thành công',
              life: 3000,
            });
            this.getALL()
          }
        );
      }

      this.floors = [...this.floors];
      this.floorDialog = false;
      this.floor = {};
    }
  }


  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.floors);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
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
