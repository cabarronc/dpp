import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status';
import { DownloadUploadService } from 'src/app/services/download-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() public disabled!: boolean;
  @Output () public uploadStatus : EventEmitter<IProgressStatus>;
  @ViewChild('inpuFile') inputFile! : ElementRef;


  constructor(private service: DownloadUploadService) {
    this.uploadStatus = new EventEmitter<IProgressStatus>();

  }
  public upload(event:any)
  {
    console.log("subiedno archivo");
    if (event.target.files &&  event.target.files.length > 0)
    {
      const file =event.target.files[0];
      this.uploadStatus.emit({status: ProgressStatusEnum.START});
      this.service.uploadFile(file).subscribe(
        data=>{
          if(data){
            switch(data.type){
              case HttpEventType.UploadProgress:
                this.uploadStatus.emit({status: ProgressStatusEnum.IN_PROGRESS,percentage:Math.round((data.loaded/data.total!)*100)});
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value='';
                this.uploadStatus.emit({status: ProgressStatusEnum.COMPLETE});
                break;
            }
          }
        },
        error =>{
          this.inputFile.nativeElement.value="";
          this.uploadStatus.emit({status: ProgressStatusEnum.ERROR})
        }
      )
    }

  }

  ngOnInit(): void {
  }

}
