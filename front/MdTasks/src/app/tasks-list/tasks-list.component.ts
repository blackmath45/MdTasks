import { Component, OnInit } from '@angular/core';
import { WapiService } from '../wapi.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit
{
  products = [];
  constructor(private wapiSvce: WapiService) { }

  ngOnInit(): void
  {
  }

// AJOUT
  sendGetRequest()
  {
    this.wapiSvce.fetchData().subscribe((data: any[])=>{
			console.log(data);
			this.products = data;
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
