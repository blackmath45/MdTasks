import { Component, OnInit } from '@angular/core';
import { WapiService } from '../wapi.service';
import { Observable, forkJoin } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

//https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs

export class TasksListComponent implements OnInit
{
  compartiments = [];
  tasks = [];

  tasksbycompartiments= [[]];

  constructor(private wapiSvce: WapiService) { }

  ngOnInit(): void
  {
    this.getCompartimentsRequest();
    this.getTasksRequest();

/*
    forkJoin(
      this.wapiSvce.getCompartiments()

    ).pipe(
      map(([first]) => {
        // forkJoin returns an array of values, here we map those values to an object
        //this.compartiments = (first : any[]);
        console.log('ok');
      })
    );
*/


          /*
        for (let acompartiment of this.compartiments)
        {
          for (let atask of this.tasks)
          {
            if (atask.ID_Compartiment == acompartiment.ID)
            {
              this.tasksbycompartiments[acompartiment.Ordre].push(atask);
            }
          }
        }*/



  }


// AJOUT
  getTasksRequest()
  {
    this.wapiSvce.getTasks().subscribe((data: any[])=>{
      //console.log(data);

      // Preparation couleurs bootstrap
      for (let adata of data)
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

        /*
        if (adata.Progression <= 100) { adata.ProgressionBSColor ="bg-success"; }
        if (adata.Progression <= 75) { adata.ProgressionBSColor ="bg-info"; }
        if (adata.Progression <= 50) { adata.ProgressionBSColor ="bg-warning"; }
        if (adata.Progression <= 25) { adata.ProgressionBSColor ="bg-danger"; }
        */
      }

      this.tasks = data;
    })
  }

  getCompartimentsRequest()
  {
    this.wapiSvce.getCompartiments().subscribe((data: any[])=>{
      //console.log(data);
      this.compartiments = data;
    })
  }
// FIN AJOUT




  vegetables = [
    {name: 'Carrot', type: 'vegetable'},
    {name: 'Onion', type: 'vegetable'},
    {name: 'Potato', type: 'vegetable'},
    {name: 'Capsicum', type: 'vegetable'}];

  droppedItems = [];

  onAnyDrop(e: any)
  {
    this.droppedItems.push(e.dragData);

    if (e.dragData.type === 'vegetable')
    {
      this.removeItem(e.dragData, this.vegetables);
    }
  }

  onAnyDrag(e: any)
  {
    this.vegetables.push(e.dragData);

    if (e.dragData.type === 'vegetable')
    {
      this.removeItem(e.dragData, this.droppedItems);
    }
  }

  removeItem(item: any, list: Array<any>)
  {
    let index = list.map(function (e)
    {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }
}

//https://www.npmjs.com/package/ng-drag-drop#draggable-directive
