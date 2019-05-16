import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from "jquery";
import axios from "axios";
@Component({
  selector: 'app-freshhub',
  templateUrl: './freshhub.component.html',
  styleUrls: ['./freshhub.component.css']
})
export class FreshhubComponent implements OnInit {
  hubList:any;
  constructor(private router: Router,) { }

  ngOnInit() {
    var self = this;
    axios.get('http://103.214.233.141:2981/v1/secure/hubs/profiles')
        .then(function (res) {
         self.hubList = res.data;     
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  
}
