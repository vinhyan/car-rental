const SEDAN_RATE:number = 7;
const SEDAN_FLAT:number = 70;
const SUV_RATE:number = 12;
const SUV_FLAT:number = 100;
const CAR_SEAT_RATE:number = 1;
const CAR_SEAT_FLAT:number = 10;
const SALES_TAX:number = 0.13;

class Reservation {
    reservationID:string = "";
    vehicleType:string = "";
    reservationDate:string = "";
    rentalHours:number = 1;
    carSeat:boolean = false;
    subtotal:number = 0;
    tax:number = 0;
    total:number = 0;

    constructor(vehicleType?:string, 
                reservationDate?:string, 
                rentalHours?:number, 
                carSeat?:boolean) {

        if (vehicleType && reservationDate && rentalHours && carSeat) {
            this.reservationID = this.generateID();
            this.vehicleType = vehicleType;
            this.reservationDate = reservationDate;
            this.rentalHours = rentalHours;
            this.carSeat = carSeat;
            this.calculateSubtotal();
            this.calculateTax();
            this.calculateTotal();
        }           
    }

    private generateID(): string {
        let randomNum = Math.floor(Math.random() * 10000);
        return "RES-" + (randomNum < 1000 ? "0" + randomNum.toString() : randomNum.toString());
      }

    calculateSubtotal() : void {
        this.subtotal = 0;
                
        // 1. 5 hours or less 
        if (this.rentalHours <= 5) {

            // rental hours
            this.subtotal += this.vehicleType === 'sedan' ? this.rentalHours*SEDAN_RATE : this.rentalHours*SUV_RATE;

            // car seat
            this.subtotal += this.carSeat ? this.rentalHours*CAR_SEAT_RATE : 0;

        } else {
        // 2. more than 5 hours - flat rate
            // 2a. how many days?
            let rentalDays : number = this.rentalHours / 24;

            if (rentalDays <= 1) {
                this.subtotal += this.vehicleType === 'sedan' ? SEDAN_FLAT : SUV_FLAT;
                // car seat
                this.subtotal += this.carSeat ? CAR_SEAT_FLAT : 0;

            } else if (rentalDays <= 2) {
                this.subtotal += this.vehicleType === 'sedan' ? SEDAN_FLAT*2 : SUV_FLAT*2;
                this.subtotal += this.carSeat ? CAR_SEAT_FLAT*2 : 0;

            } else {
                this.subtotal += this.vehicleType === 'sedan' ? SEDAN_FLAT*3 : SUV_FLAT*3;
                this.subtotal += this.carSeat ? CAR_SEAT_FLAT*3 : 0;
            }
        } 
    }

    calculateTax() : void {
        this.tax = this.subtotal * SALES_TAX;
    }

    calculateTotal() : void {
        this.total = this.subtotal + this.tax;
    }
}

export default Reservation;