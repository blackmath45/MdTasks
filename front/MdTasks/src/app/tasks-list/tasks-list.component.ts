import { Component, OnInit } from '@angular/core';
import { WapiService } from '../wapi.service';
import { Observable, forkJoin } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { Compartiment } from '../compartiment'
import { Task } from '../task'
import { Tasksbycompartiment } from '../tasksbycompartiment'

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

//https://ng-bootstrap.github.io/#/components/alert/examples

export class TasksListComponent implements OnInit
{
  alert = {show : 'false', type: 'danger', message: 'Error' };

  tasksbycompartiments : Tasksbycompartiment[] = [];

  constructor(private wapiSvce: WapiService, private dragulaService: DragulaService)
  {
    this.dragulaService.dropModel("VAMPIRES").subscribe(args =>
      {
        console.log(args.item);
        console.log(args.item.ID);
        console.log(args.target.parentElement);
      });
  }

  closeAlert() { this.alert.show = 'false'; }

//https://stackblitz.com/edit/ng2-dragula-base?file=src%2Fapp%2Fapp.component.html

  ngOnInit(): void
  {
    this.refresh();
  }

  refresh() : void
  {
    const example = forkJoin(
      this.wapiSvce.getCompartiments(),
      this.wapiSvce.getTasks()
    );

    const subscribe = example.subscribe(([dataCompartiments, dataTasks]) =>
      {
        let compartiments = [];
        let tasks = [];

        if (dataCompartiments.status == 'GOOD')
        {
          compartiments = dataCompartiments.data;
        }
        else
        {
            this.alert.show = 'true';
            this.alert.message = dataCompartiments.data;
        }

        if (dataTasks.status == 'GOOD')
        {
          tasks = dataTasks.data;
        }
        else
        {
            this.alert.show = 'true';
            this.alert.message = dataTasks.data;
        }

        // Preparation couleurs bootstrap
        for (let adata of tasks)
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

        for (let acompartiment of compartiments)
        {
          let newtc = new Tasksbycompartiment();
          newtc.compartiment = acompartiment;

          for (let atask of tasks)
          {
            if (atask.ID_Compartiment == acompartiment.ID)
            {
              newtc.tasks.push(atask);
            }
          }

          this.tasksbycompartiments.push(newtc);
        }
/*
        for (let acmp of this.tasksbycompartiments)
        {
          console.log(acmp.compartiment.Nom)

          for (let atask of acmp.tasks)
          {
            console.log(atask.Nom);
          }
        }
*/
      });
  }







}

//https://www.npmjs.com/package/ng-drag-drop#draggable-directive
