import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent
{
  title = 'MdTasks';

  route: string;

  constructor(private location: Location, private router: Router)
  {
     router.events.subscribe(val => {
       if (location.path() != "")
       {
         this.route = location.path().substring(1);
       }
       else
       {
         this.route = "Home";
       }
     });
   }

}
