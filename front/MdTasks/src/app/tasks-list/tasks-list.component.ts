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
}
