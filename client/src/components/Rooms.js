import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Rooms = () => {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await (await axios.get('/api/rooms/getallrooms')).data
                setrooms(data);
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

                    <h1>Rooms</h1>
                    {loading && (<Loader />)}
                    <table class="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Room Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Type</th>
                                <th scope="col">Rent per day</th>
                                <th scope="col">Max count</th>
                                <th scope="col">Phone number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms && (rooms.map(room => {
                                return <tr>
                                    <td scope="row">{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentperday}</td>
                                    <td>{room.maxcount}</td>
                                    <td>{room.phonenumber}</td>
                                </tr>
                            }))}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
  )
}

export default Rooms