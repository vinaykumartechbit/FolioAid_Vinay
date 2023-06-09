import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { GetProjectRequestModel } from 'src/app/models/ProjectModel';
import { ProjectService } from 'src/app/service/ProjectService';
export interface videoObject {
  image:any;
  thumbImage:any;
 };
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})

export class ProjectDetailComponent {
  @ViewChild('myCarousel') myCarousel: NgbCarousel;
  @ViewChild('myCarousel') myCarouselVideo: NgbCarousel;              
customOptionsGallery={items:0, dots:false, margin:5, autoWidth: true};
payload=new GetProjectRequestModel(); 
activeSliderId: string;
videoObjects:videoObject[]=[];
constructor (private projectService:ProjectService, private route: ActivatedRoute){}
projectDetail:any;
  ngOnInit(){
    this.payload.id=this.route.snapshot.params.id;
    if(this.payload.id !=null || this.payload.id!= undefined){ 
    this.projectService.getProjectById(this.payload).subscribe(response=>{
        if(response.isSuccess){
         this.projectDetail=response.result;
         this.customOptionsGallery.items=response.result.imagesPath.length;
         this.projectDetail.videosPath.forEach(x => {
          this.videoObjects.push({image:x,thumbImage:x})
         });
       }
  });
}
}
selectedImage: string;

  changeimage(image: string){
    this.selectedImage = image;
  }
  cycleToSlide(id) {
    this.myCarousel.select(''+ id);
  }
  cycleToVideo(id)
  {
    this.myCarouselVideo.select(''+ id);
  }
   
}
