import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksTabComponent } from './tasks-tab/tasks-tab.component';
import { ProjetsTabComponent } from './projets-tab/projets-tab.component';
import { ProjetDetailComponent } from './projet-detail/projet-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskDetailComponent,
    TasksTabComponent,
    ProjetsTabComponent,
    ProjetDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//TODO : https://feathericons.com/
