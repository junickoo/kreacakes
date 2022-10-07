import { SellerServiceService } from './../../service/seller-service.service';
import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css'],
})
export class DialogOverviewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sellerService: SellerServiceService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  userId: any = sessionStorage.getItem('user_id');
  deleteItem(item_id: any) {
    this.sellerService
      .deleteItem(item_id, this.userId)
      .subscribe((resp) => console.log(resp));
    window.location.reload();
  }
}
export interface DialogData {
  type: String;
  message: String;
}
export interface DataDelete {
  type: String;
  item_id: String;
}
