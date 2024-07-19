import { Component } from '@angular/core';
import {Router} from '@angular/router';
import Reservation from '../models/Reservation';

const MIN_HOUR:number = 1;
const MAX_HOUR:number = 96;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  cars: string[] = ['sedan', 'suv'];
  vehicleType = "default";
  reservationDate:string = "";
  rentalHours:number = MIN_HOUR;
  carSeat:boolean = false;

  error = false;
  errMsgList: string[] = [];

  constructor(private router: Router) {}

  btnSubmit() {
    // Reset error messages and error status
    this.errMsgList = [];
    this.error = false;

    // Validate fields
    if (this.vehicleType === "default") {
      this.errMsgList.push("Car Type: You must select one car type");
    }
    if (this.reservationDate === "") {
      this.errMsgList.push("Reservation Date: You must enter a valid date");
    }
    if (!(this.rentalHours >= MIN_HOUR && this.rentalHours <= MAX_HOUR)) {
      this.errMsgList.push("Hours: You must enter a value between 1-96");
    }

    // Set error status
    if (this.errMsgList.length > 0) {
      this.error = true;
      // Exit if there is any error
      return;
    } 

    // Save data to a "Reservation" object
    let reservation = new Reservation(this.vehicleType, this.reservationDate, this.rentalHours, this.carSeat);
 
    // Switch to the "Receipt" screen and pass Reservation object to it
    this.router.navigate(['/receipt'], {
      queryParams: {
        reservation: JSON.stringify(reservation),
      }
    })
  }

  btnReset() {
    console.log("Resetting all input fields...");
    this.vehicleType = "default";
    this.reservationDate = "";
    this.rentalHours = MIN_HOUR;
    this.carSeat = false; 
    this.error = false;
    this.errMsgList = [];
    
  }

}
