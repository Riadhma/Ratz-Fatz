import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: any;


  constructor(private spinner: NgxSpinnerService) {
    this.socket = io(environment.URL);
  }


  listen(EventName: string) {
    var self = this;
    return new Observable((subscriber) => {
      this.socket.on(EventName, (data) => {
        console.log(EventName);
        //   self.spinner.hide();
        subscriber.next(data)
      })
      this.socket.io.on('connect_error', function (err) {
        // handle server error here
        console.log('Error connecting to server');
        self.spinner.show();
      });

    })
  }

  SendVals(obj: any) {

    this.socket.emit('Setvals', obj);
  }

}
