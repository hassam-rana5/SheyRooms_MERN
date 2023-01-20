import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from 'sweetalert2'
import { set } from "mongoose";

const Addroom = () => {
    const [name, setname] = useState([])
    const [rentperday, setrentperday] = useState([])
    const [maxcount, setmaxcount] = useState([])
    const [description, setdescription] = useState([])
    const [phonenumber, setphonenumber] = useState([])
    const [type, settype] = useState([])
    const [imageurl1, setimageurl1] = useState([])
    const [imageurl2, setimageurl2] = useState([])
    const [imageurl3, setimageurl3] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const data = await (await axios.get('/api/bookings/getallbookings')).data
    //             setbookings(data);
    //             setloading(false);
    //         } catch (error) {
    //             console.log(error);
    //             setloading(false);
    //             seterror(true);
    //         }
    //     }
    //     fetchData();
    // }, [])

    async function addRoom() {
        const newRoom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls:[imageurl1,imageurl2,imageurl3]
        }

        try {
            setloading(true)
            const results = await (await axios.post('/api/rooms/addroom',newRoom)).data
            console.log(results)
            setloading(false)
            swal.fire('Congrats','Your new Room has been added successfully','success').then(results=>{
                window.location.home = '/home';
            })
        } catch (error) {
            console.log(error)
            setloading(false);
            swal.fire('oopps','Something went wrong','error');
        }
    }

    return (
        <>
            <div className="row">
                    {loading && (<Loader />)}

                <div className="col-md-5">
                    <div className="form-group">
                    <input type="text" classaName="form-control"  placeholder="Room name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
                    </div>

                    <div className="form-group">
                    <input type="text" classaName="form-control"  placeholder="Rent per day" value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}} />
                    </div>

                    <div className="form-group">
                    <input type="text" classaName="form-control"  placeholder="Max count" value={maxcount} onChange={(e)=>{setmaxcount(e.target.value)}}/>
                    </div>

                    <div className="form-group">
                    <input type="text" classaName="form-control"  placeholder="Description" value={description} onChange={(e)=>{setdescription(e.target.value)}} />
                    </div>

                    <div className="form-group">
                    <input type="text" classaName="form-control"  placeholder="Phone number" value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}} />
                    </div>

                </div>
                <div className="col-md-5">

                    <div className="form-group">
                    <input type="text" classaName="form-control"  placeholder="Type" value={type} onChange={(e)=>{settype(e.target.value)}} />
                    </div>

                    <div className="form-group">
                    <input type="text" classaName="form-control"  placeholder="Image Url 1" value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}} />
                    </div>

                    <div className="from-group mb-2">
                    <input type="text" classaName="form-control"  placeholder="Image url 2" value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}} />
                    </div>

                    <div className="form-group">
                    <input type="text" classaName="form-control"  placeholder="Image Url 3" value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}} />
                    </div>

                    <div className="text-right">
                        <button className="btn btn-primary" onClick={addRoom}>Add Room</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Addroom