import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Reservation from '../models/Reservation';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  reservation:Reservation = new Reservation();

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        console.log(params);

        if ('reservation' in params) {
          console.log('reso: ', params['reservation']);
          this.reservation = JSON.parse(params['reservation']);
          console.log("this.reservation: ", this.reservation);
        }
      }
    })
   }

  ngOnInit() {return}

  btnReservationPage() {
    this.router.navigate(['/']);
  }

}
