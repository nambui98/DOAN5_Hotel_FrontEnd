import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Floor, FloorService, Room, RoomManageService, RoomPrice } from 'src/app/core';
import { environment } from '../../../../environments/environment';
// import { jsPDF } from 'jspdf';
// let jsPDF = require('jspdf');
// import 'jspdf-autotable';
@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.css'],
})
export class RoomManageComponent {
  productDialog: boolean;

  products: Room[];

  product: Room;
  modalType:any;
  selectedProducts: Room[];
  selectedFloor: any;
  cols: any;
  submitted: boolean;
  exportColumns: any[];
  floors:Floor[];
  modalName:any;
  uploadedFiles: any[] = [];
  price:RoomPrice;
  priceType:number;
  productImage_preview:string;
  urlAPI=environment.apiUrlImg;
  @ViewChild('fileInput') fileInput: FileUpload;
  constructor(
    private roomManageService: RoomManageService,
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
    this.roomManageService.getAll().subscribe(
      (response) => {
        this.products = response;
      }
    );
    this.cols = [
      // { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
    ];
    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
    
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
    this.product.image=image;
    this.productImage_preview=""

    // Deal with your files
    // e.g  assign it to a variable, and on submit add the variable to your form data
  }

  openNew() {
    this.product = {};
    this.modalType="addnew";

    this.modalName="Thêm mới";
    this.submitted = false;
    this.productDialog = true;
    this.productImage_preview=""

    this.selectedFloor={}
  }
  handleFilterPrice(type){
    this.price=this.product.prices.filter(x=>x.type===type)[0]
    if(!this.price){
      this.price={
        idRoom:parseInt(this.product.id),
        type:type,
        price:null,
        priceFirst:null,
        priceSecond:null,
      }
    }
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Room) {
    this.modalType="edit";
    this.modalName="Sửa";
    this.product = { ...product };
    this.uploadedFiles=[{name:product.image}];
    this.productDialog = true;
    this.selectedFloor=product.floor;
    this.productImage_preview=product.image
  }
  setUpPrice(room:Room){
    this.modalType="setUp";
    this.modalName="Thiết lập giá phòng";
    this.priceType=1;
    this.price=room.prices.filter(x=>x.type===1)[0]
    if(!this.price){
      this.price={
        price:null,
        priceFirst:null,
        priceSecond:null,
      }
    }
    this.product = { ...room };
    this.productDialog = true;
  }
  deleteProduct(product: Room) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.roomManageService.delete(product).subscribe(
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
    this.productDialog = false;
    this.submitted = false;
  }
  getALL(){
    this.roomManageService.getAll().subscribe(
      (response) => {
        this.products = response;
      }
    );
  }
  save() {
    this.submitted = true;
    if(this.modalType==="setUp"){
      console.log(this.price)
      this.roomManageService.setUpPrice(parseInt(this.product.id),this.price).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Updated',
            life: 3000,
          });
          this.getALL()
        }
      );
      this.products = [...this.products];
      this.productDialog = false;
        this.product = {};
    }else{

      if (this.product.name.trim()) {
        if (this.product.id) {
          this.roomManageService.update(this.product).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Updated',
                life: 3000,
              });
              this.getALL()
            }
          );
        } else {
          this.roomManageService.addnew(this.product).subscribe(
            (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Created',
                life: 3000,
              });
              this.getALL()
            }
          );
        }
  
        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
      }
    }
  }


  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.products);
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
