import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';
import { IUser } from 'src/app/interface/delivery/IDelivery';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  storedUsers:IUser[]=[]
  admin:string='a'
constructor(private service:ManageService){}
ngOnInit(): void {
    this.service.getAllUsers().subscribe({
      next:(res)=>{this.storedUsers=res;},
      error:(err)=>{console.log(err)}
    })
}
}
