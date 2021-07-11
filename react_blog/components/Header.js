import React, {useState,useEffect} from 'react'
import Link from 'next/link'
import { HomeOutlined ,YoutubeOutlined ,CameraOutlined} from '@ant-design/icons';

const Header = () => {
    
    return (

        <div className="header">
            <script src="//cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js"></script>
                <div className="header-center">
                    <div type="flex" justify="center">
                        <span className="header-logo">
                            <Link href={{pathname:'/'}}>
                                Zemei
                            </Link>
                            </span>
                        <span className="header-txt">have a good life</span>
                        <span className="menu-div">
                            <li><Link href={{pathname:'/'}}><a> <HomeOutlined /> Home</a></Link> </li>
                            <li><Link href={{pathname:'/list',query:{id:1}}}><a> <YoutubeOutlined /> Video</a></Link>  </li>
                            <li><Link href={{pathname:'/list',query:{id:2}}}><a> <CameraOutlined /> Life</a></Link> </li>
                        </span>
                    </div>
                </div>
            </div>
    )
}

export default Header