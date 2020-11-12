import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Admin, AdminService, Room, RoomManageService } from 'src/app/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  adminDialog: boolean;

  admins: Admin[];

  admin: Admin;

  modalName:string;
  modalType:string;
  cols: any;
  uploadedFiles: any[] = [];
  urlAPI=environment.apiUrlImg;

  selectedAdmin:any;
  submitted: boolean;
  adminImage_preview:string;
  exportColumns: any[];
  constructor(
    private accountService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
   this.getALL()
    
  }
  getALL(){
    this.accountService.getAll().subscribe(
      (response) => {
        this.admins = response;
      },
    
    );
  }
  openNew() {
    this.admin = {};
    this.modalName="Thêm mới";
    this.submitted = false;
    this.adminDialog = true;
    this.selectedAdmin={}
  }

 

  editProduct(admin: Admin) {
    this.modalType="edit";
    this.modalName="Sửa";
    this.admin = { ...admin };
    this.adminDialog = true;
  }

  deleteProduct(admin: Admin) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xoá ' + admin.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accountService.delete(admin).subscribe(
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
  onUpload(event) {

    for(let file of event.files) {
        this.uploadedFiles.push(file);
 
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
 getBase64(file) {

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
  async upLoad_getBase64(event) {
  let image;
    for (let file of event.files) {
      image=await this.getBase64(file);
    }
    image=image.replace(/^data:image\/[a-z]+;base64,/, "")
    this.admin.image=image;
    this.adminImage_preview=""

    // Deal with your files
    // e.g  assign it to a variable, and on submit add the variable to your form data
  }
  hideDialog() {
    this.adminDialog = false;
    this.submitted = false;
  }
 
  save() {
    this.submitted = true;
    if (this.admin.name.trim()) {
      if (this.admin.id) {
        this.accountService.update(this.admin).subscribe(
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
        this.accountService.addnew(this.admin).subscribe(
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

      this.admins = [...this.admins];
      this.adminDialog = false;
      this.admin = {};
    }
  }


  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.admins);
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
