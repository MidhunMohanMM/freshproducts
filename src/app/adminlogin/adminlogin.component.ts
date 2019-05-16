import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import axios from "axios";
import { AppGlobals } from '../app.global';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
  providers: [AppGlobals]
})
export class AdminloginComponent implements OnInit {
  username: any;
  password: any;
  error: string = "";
  id: any;

  constructor( private route : ActivatedRoute ,  private router: Router, private _global: AppGlobals) { }

  ngOnInit() {

  }


  Dashboard(){
    var self = this;
    axios.post(`http://${self._global.baseUrl}:${self._global.port}/${self._global.version_no}/auths/users/hubs`,{
      "username" : self.username,
      "password" : self.password
    })
        .then(function (res) {
          console.log(res);
           self.id = res.data.hubsusers.hubsusersid;
          // localStorage.setItem("Hubsid", res.data.hubsusers.hubsid);
          // self.router.navigate(['/dashboard/' + res.data.hubsusers.hubsid] ); 
          if(res.data.hubsusers.hubsuserstypesid == '1'){
            self.router.navigate(['/admin/dashboard', self.id ]);
          }
          else{
            self.router.navigate(['/hub/dashboard', self.id ]);
          }
          
        })
        .catch(function (error) {
          self.error = "Username or password is incorrect"
          console.log(error);
        });


  }
}
