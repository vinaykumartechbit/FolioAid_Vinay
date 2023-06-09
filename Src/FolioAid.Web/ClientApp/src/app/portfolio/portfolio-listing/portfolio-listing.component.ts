import { Component,OnInit,OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GetProjectRequestModel, ProjectRequestModel } from '../../models/ProjectModel';
import { ProjectService } from '../../service/ProjectService';
import { MessageService } from 'src/app/service/message.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-portfolio-listing',
  templateUrl: './portfolio-listing.component.html',
  styleUrls: ['./portfolio-listing.component.css']
})

export class PortfolioListingComponent {
  length = 50;
  pageSize = 12;
  currentPage = 0;
  pageSizeOptions = [12, 24, 36, 48];
  search=null;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  pageEvent: PageEvent;
  gridResult: any;
  totalCount: number;
  state: ProjectRequestModel = new ProjectRequestModel();
  technologyGridResult: any[];
  industryGridResult: any[];
  selectedTechnologies=[];
  selectedIndustries=[];
  open: boolean = false;
  dialogmodel: any;
  constructor(private projectService: ProjectService ,private router : Router, private messageService : MessageService) {
    this.getAllTechnologies();
    this.getAllIndustries();
    this.getData();
   }

 ngOnInit(){
  
 }

  handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.pageEvent = e;
  this.length = e.length;
  this.pageSize = e.pageSize ;
  this.currentPage=e.pageIndex;
  this.getData();
}

  getData() {
    this.state.PageSize = this.pageSize;
    this.state.CurrentPage = this.currentPage;
    this.state.Search = this.search;
    this.state.Industries=this.selectedIndustries;
    this.state.Technologies=this.selectedTechnologies;
    this.projectService.getAllProjects(this.state).subscribe(
      (response) => {
        if (response.isSuccess)
        {
          this.gridResult = response.result.projectList;
          this.length=response.result.totalCount;
        }
        else {
          alert(response.message);
        }
        }
    );
  }
 getAllTechnologies(){
  this.projectService.getAllTechnologies().subscribe(
  (response)=>{
  if(response.isSuccess)
  {
    this.technologyGridResult=response.result.technologies;
  };
 });
}
getAllIndustries(){
  this.projectService.getAllIndustries().subscribe(
  (response)=>{
  if(response.isSuccess)
  {
    this.industryGridResult=response.result.industries;
  };
 });
}
onTechnologyChange(item:any,event:any){
  if(event.target.checked) {
    this.selectedTechnologies.push(item.id);
  } else {
  for(var i=0 ; i < this.technologyGridResult.length; i++) {
    if(this.selectedTechnologies[i] == item.id) {
      this.selectedTechnologies.splice(i,1);
   }
 }
}
this.getData();
}
onIndustryChange(item:any,event:any){
  if(event.target.checked) {
    this.selectedIndustries.push(item.id);
  } else {
  for(var i=0 ; i < this.industryGridResult.length; i++) {
    if(this.selectedIndustries[i] == item.id) {
      this.selectedIndustries.splice(i,1);
   }
 }
}
this.getData();
}
editProject($event: any){
  this.router.navigateByUrl('update-project/'+$event.id);
}

viewProjectDetail($event: any){
  this.router.navigateByUrl('project-detail/'+$event.id);
}
deleteProjectById(event:any){
  let payload =new GetProjectRequestModel();
  payload.id=event.id;
  this.projectService.deleteProject(payload).subscribe(res=>{
       if( res.isSuccess){
          this.close();
          this.messageService.success("Project Deleted Successfully");
          this.gridResult = this.gridResult.filter(x => x.id !== event.id); 
       }
      });
}

openDialog(SelectedItem)
{
    document.body.classList.add('OpenDialogOverlay');
    this.dialogmodel = SelectedItem;
    this.open = true;
}
close() {
  this.open= false
  this.dialogmodel = null;
  document.body.classList.remove('OpenDialogOverlay');
}


}

