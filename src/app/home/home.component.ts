import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { WebsocketService } from '../websocket.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from '../global.service'
import { environment } from 'src/environments/environment.prod';


const baseUrl = environment.URL;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  singleProductData;


  constructor(public Global: GlobalService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (this.Global.Products.length === 0) {
      this.spinner.show();
    }
  }

  getAll() {
    this.Global.getAll()
  }

  getPage(event) {
    this.Global.getPage(event)
  }

  send() {

    this.Global.send()
  }

  onSelect(selectedItem: any) {
    this.singleProductData = selectedItem;
  }


}
