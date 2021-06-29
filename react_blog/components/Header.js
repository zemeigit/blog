import React, {useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import {Row,Col, Menu} from 'antd'
import { HomeOutlined ,YoutubeOutlined ,CameraOutlined} from '@ant-design/icons';


const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result= await axios(servicePath.getTypeInfo).then(
                 (res)=>{
                     setNavArray(res.data.data)
                     return res.data.data
                 }
               )
            setNavArray(result)
         }
         fetchData()
    },[])

    const handleClick = (e)=>{
        if(e.key=="0"){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        } 
    }
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">Zemei</span>
                    <span className="header-txt">have a good life</span>
                </Col>

                <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                        <HomeOutlined />
                            Home
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                                return (
                                    <Menu.Item key={item.id}>
                                    <YoutubeOutlined />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                        
                        <Menu.Item key="life">
                        <CameraOutlined />
                            Life
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header