import React,{useEffect} from 'react'
import { Tabs } from 'antd';
import Bookings from '../components/Bookings';
import Rooms from '../components/Rooms';
import Users from '../components/Users';
import Addroom from '../components/Addroom';

const { TabPane } = Tabs;

function Adminscreen() {
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('currentuser')).isAdmin) {
            window.location.href = '/home';
        }
    }, [])
    
    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{fontSize:'30px'}}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings/>
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms/>
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <Addroom/>
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen