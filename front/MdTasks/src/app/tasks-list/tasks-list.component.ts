import { Component, OnInit } from '@angular/core';
import { WapiService } from '../wapi.service';
import { Observable, forkJoin } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

//https://ng-bootstrap.github.io/#/components/alert/examples

export class TasksListComponent implements OnInit
{
  alert = {show : 'false', type: 'danger', message: 'Error' };

  compartiments = [];
  tasks = [];

  tasksbycompartiments= [[]];

  constructor(private wapiSvce: WapiService) { }

  closeAlert() { this.alert.show = 'false'; }

//https://stackblitz.com/edit/ng2-dragula-base?file=src%2Fapp%2Fapp.component.html

  ngOnInit(): void
  {

    const example = forkJoin(
      this.wapiSvce.getCompartiments(),
      this.wapiSvce.getTasks()
    );

    const subscribe = example.subscribe(([dataCompartiments, dataTasks]) =>
      {
        if (dataCompartiments.status == 'GOOD')
        {
          this.compartiments = dataCompartiments.data;
        }
        else
        {
            this.alert.show = 'true';
            this.alert.message = dataCompartiments.data;
        }

        if (dataTasks.status == 'GOOD')
        {
          this.tasks = dataTasks.data;
        }
        else
        {
            this.alert.show = 'true';
            this.alert.message = dataTasks.data;
        }


        // Preparation couleurs bootstrap
        for (let adata of this.tasks)
        {
          //bg-primary bg-success bg-info bg-warning bg-danger
          switch (adata.Priorite)
          {
            case 1:
            adata.PrioriteBSColor ="bg-danger";
            break;
            case 2:
            adata.PrioriteBSColor ="bg-warning";
            break;
            case 3:
            adata.PrioriteBSColor ="bg-info";
            break;
            default:
            adata.PrioriteBSColor ="bg-primary";
          }

          adata.ProgressionBSColor = "bg-primary";
          if (adata.Progression == 100)
          {
                    adata.ProgressionBSColor = "bg-success";
          }


          //if (adata.Progression <= 100) { adata.ProgressionBSColor ="bg-success"; }
          //if (adata.Progression <= 75) { adata.ProgressionBSColor ="bg-info"; }
          //if (adata.Progression <= 50) { adata.ProgressionBSColor ="bg-warning"; }
          //if (adata.Progression <= 25) { adata.ProgressionBSColor ="bg-danger"; }
        }
/*
        for (let acompartiment of dataCompartiments)
        {
          for (let atask of dataTasks)
          {
            if (atask.ID_Compartiment == acompartiment.ID)
            {
              if (this.tasksbycompartiments[acompartiment.Ordre] === undefined)
              {
                this.tasksbycompartiments[acompartiment.Ordre] = []
              }
              // stocker données mais aussi index du compartiment
              this.tasksbycompartiments[acompartiment.Ordre].push(atask);
            }
          }
        }*/
      });
  }









}

//https://www.npmjs.com/package/ng-drag-drop#draggable-directive
