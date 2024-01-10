import { Component } from '@angular/core';
import { ModalService } from './nav-bar/modal/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService:ModalService){}
  title = 'client';
}
