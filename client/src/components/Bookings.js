import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Bookings = () => {

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await (await axios.get('/api/bookings/getallbookings')).data
                setbookings(data);
                setloading(false);
            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(true);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-md-12">

                    <h1>Bookings</h1>
                    {loading && (<Loader />)}
                    <table class="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Booking Id</th>
                                <th scope="col">User Id</th>
                                <th scope="col">Room</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings && (bookings.map(booking => {
                                return <tr>
                                    <td scope="row">{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.room}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            }))}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default Bookings