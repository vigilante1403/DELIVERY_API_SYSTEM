import { Component, OnInit } from '@angular/core';
import { PeriodService } from './period.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(private service:NotifierService) {
    this.notifier=service;
  }

  ngOnInit(): void {
    this.notifier.notify('warning', 'You are awesome! I mean it!');
}
}
