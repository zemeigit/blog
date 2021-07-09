import React ,{useState,useEffect} from 'react'
import Head from 'next/head'
import {List,Affix, Breadcrumb} from 'antd'
import { CalendarOutlined ,VideoCameraOutlined, FireOutlined} from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import marked from 'marked'

const MyList = (list) => {

  const [myList, setMylist] = useState(list.data)
  useEffect(()=>{
    setMylist(list.data)
   })

  return (
    <div>
    <Head>
          <title>Zemei</title>
        </Head>
        <Affix offsetTop={0}>
        <Header/>
      </Affix>
        <div className="comm-main" type="flex" justify="center">
          <div className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div className="bread-div">
              <Breadcrumb>
              <Breadcrumb.Item><a href="/"> Home </a></Breadcrumb.Item>
              <Breadcrumb.Item>Blog</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List 
              header={<div className="list-header">My list</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item=>(
                <List.Item>
                  <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                   <a>{item.title}</a>
                   </Link></div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.time}</span>
                    <span><VideoCameraOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.view_count}</span>
                  </div>
                  <div className="list-context"
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                  </div>
                </List.Item>
              )}
              />
          </div>

          <div className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
          </div>
        </div>
        <Footer />
    </div>
  )
}
MyList.getInitialProps = async (context)=>{

  let id =context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>resolve(res.data) 
    )
  })
  return await promise
}

export default MyList