import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';
import { WebsocketService } from './websocket.service'


const baseUrl = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  receivedData;

  products = [];
  paginationOptions = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: 0
  }


  pageNumber;
  Init = true;

  nextPage = false;

  constructor(private http: HttpClient, private WebsocketService: WebsocketService, private spinner: NgxSpinnerService) {
    this.WebsocketService.listen('UpdatedData').subscribe((res: any) => {

      if (res) {

        this.spinner.hide()
        console.log('haw weslet');
        console.log(res)
        this.products = res.arrayOfProductData
        this.receivedData = res;
        this.paginationOptions.totalItems = res.totalItems;
        this.paginationOptions.currentPage = res.currentPage;
        this.paginationOptions.itemsPerPage = res.itemPerPage
        this.Init = false;
        this.nextPage = false;

      }
    })
  }

  getAll() {
    return this.http.get(baseUrl).subscribe(data => {
      console.log(data)
      this.products = data['arrayOfProductData'];
    });
  }

  getPage(event) {
    this.nextPage = true;
    console.log(event)
    this.pageNumber = event;
    this.send()
  }

  send() {
    this.products = [];
    if (this.products.length === 0) {
      this.spinner.show();
    }
    this.WebsocketService.SendVals(this.pageNumber)
  }

  public get NextPage() {
    return this.nextPage;
  }
  public get Products() {
    return this.products
  }


  public get PaginationOptions() {
    return this.paginationOptions
  }




}
