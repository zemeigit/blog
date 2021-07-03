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
                <div className="header-center">
                    <Row type="flex" justify="center">
                        <Col  xs={24} sm={24} md={13} >
                            <span className="header-logo">
                                <Link href={{pathname:'/'}}>
                                    <a> Zemei</a>
                                </Link>
                                </span>
                            <span className="header-txt">have a good life</span>
                        </Col>
                    
                        <Col className="menu-div" xs={0} sm={0} md={11} >
                            <li><Link href={{pathname:'/'}}><a> <HomeOutlined /> Home</a></Link> </li>
                            <li><Link href={{pathname:'/list',query:{id:1}}}><a> <YoutubeOutlined /> Video</a></Link>  </li>
                            <li><Link href={{pathname:'/list'}}><a> <CameraOutlined /> Life</a></Link> </li>
                        </Col>
                    </Row>
                </div>
            </div>
    )
}

export default Header