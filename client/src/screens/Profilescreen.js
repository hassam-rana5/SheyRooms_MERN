import { Tabs,Divider, Tag  } from 'antd';
import React,{useEffect,useState} from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import swal from 'sweetalert2'
import axios from 'axios';
const { TabPane } = Tabs;

function Profilescreen() {
    const user = JSON.parse(localStorage.getItem('currentuser'));

    useEffect(() => {
        if(!user){
            window.location.href='/login'
        }
    }, [])
    
    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <p>My Profile</p>
                    <br />
                    <p>Name : {user.name}</p>
                    <p>Email : {user.email}</p>
                    <p>isAdmin : {user.isAdmin ? 'Yes' : 'No'}</p>
                </TabPane>
                <TabPane tab="Booking" key="2">
                    <MyBookings/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen

export function MyBookings(){
    const user = JSON.parse(localStorage.getItem('currentuser'));
    const [booking , setbooking] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();    
    useEffect( () => {
        async function fetchData() {
            
            try {
                setloading(true);
                const data = await (await axios.post('/api/bookings/getbookingsbyuserid',{userid : user._id})).data;
                console.log(data);
                setbooking(data);
                setloading(false);
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(error);
            }
        }
        fetchData();
    },[])
    
    async function cancelBooking(bookingid,roomid) {

        try {
            setloading(true);
            const result = await (await axios.post('/api/bookings/cancelbooking',{bookingid,roomid})).data
            console.log(result)
            setloading(false);
            swal.fire('congrats','Your booking has been cancelled','success').then(result=>{
                window.location.reload();
            })
        } catch (error) {
            console.log(error);
            setloading(false);
            swal.fire('oopps','Something went wrong','error');
        }
    }
    
    return(
        <div>
            <div className="row">
                <div className="col-md-6">

                    {loading && (<Loader/>)}
                    {booking && (booking.map(booking=>{
                        return <div className='bs mb-4'>
                            <p><b>{booking.room}</b></p>
                            <p><b> Bookingid</b> : {booking._id}</p>
                            <p><b> CheckIn</b> : {booking.fromdate}</p>
                            <p><b> Check Out</b>: {booking.todate}</p>
                            <p><b> Amount</b> : {booking.totalamount}</p>
                            <p><b>Status</b> : {booking.status === 'booked' ? (<Tag color="green">CONFIRMED</Tag>) : (<Tag color="red">CANCELLED</Tag>)}</p>
                            {booking.status === "booked" && (
                                <div className='text-right'>
                                <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOKING</button>
                                
                                </div>
                            )}
                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}