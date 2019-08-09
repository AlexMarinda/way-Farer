import users from '../model/users';
import JWT from 'jsonwebtoken';
import trips from '../model/trip';
import {findTripById, findUserById} from '../helpers';
import bookings  from '../model/book';
//import uuid from 'uuid';
import moment from 'moment';


// all bookings operation class

class Booking {
    
// book a seat

static  bookSeat(req, res) {

     

//const getUser = JWT.decode(req.headers.authorization);

       


const newBook = {
     book_id:bookings.length + 1,
     seat_number:1,
     trip_id:req.body.trip_id,
     user_id: req.body.user_id,
     created_on:moment().format()

};
const findTrip =   trips.find(t => t.trip_id === parseInt(req.body.trip_id));

     if(findTrip.status==="unactive" )
        
       return res.status(400).send({ status: 400, message: "this trip was canceled" });

bookings.push(newBook);  
let foundUser =null;
let foundTrip =null;
for (let i =0; i<users.length; i++){
     if(users[i].user_id===newBook.user_id){
          foundUser  = users[i];
     }
     

}
for (let i =0; i<trips.length; i++){
     if(trips[i].trip_id===newBook.trip_id){
          foundTrip = trips[i];
     }
     

}
// booked response
return res.status(201).send({ status: 201, message: 'Booking a seat successful ', data: { 
     booking_id:newBook.book_id , 
     seat_number:newBook.seat_number,
     bus_license_number:foundTrip.bus_license_number,
     trip_date: foundTrip.trip_date,
     first_name:foundUser.first_name,
     last_name:foundUser.last_name,
     user_email:foundUser.email,
     created_on:newBook.created_on
 } });

}







 // get all booking


static  getAllBookings(req, res) {
let allBookings = [];
let booking =null;
for(let i=0;i<bookings.length;i++){
     const foundTrip =findTripById(bookings[i].trip_id)
     const foundUser =findUserById(bookings[i].user_id)

     booking ={
          booking_id:bookings[i].book_id , 
          bus_license_number:foundTrip.bus_license_number,
          seat_number:bookings[i].seat_number,
          trip_date: foundTrip.trip_date,
          first_name:foundUser.first_name,
          last_name:foundUser.last_name,
          user_email:foundUser.email
     }
     allBookings.push(booking);
}

console.log('allBookings', allBookings);
    if(!allBookings){
        return res.status(404).send({ status: 404, message:'bookings not found!' });
}
     res.status(200).send({ status: 200,message:'success to view bookings', data: allBookings});

}
static  numberOfSeat(req, res) {
    const findBook =   bookings.find(t => t.book_id === parseInt(req.params.book_id));
    if(findBook)

    findBook.seat_number = req.body.seat_number;
       

         res.status(200).send({ status: 200, message: 'seat numbers  added successfully'});

        return res.status(404).send({ status: 404, message:'trip not found!'});

}



// delete booking

static  deleteBooking(req, res) {
     const findBook =   bookings.find(t => t.book_id === parseInt(req.params.book_id));
     if(findBook){
        // const c_trip=trip.indexOf(findTrip);
        bookings.splice(findBook,1);
   
         return res.status(200).send({ status: 200, message: 'Trip cancelled successfully'});
      } 
      else {
           return res.status(403).send({ status: 403, 
                message:'booking not found!'});
      }
      }

     
}

export default Booking;