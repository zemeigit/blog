import React ,{useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {Row, Col, List,Affix} from 'antd'
import { CalendarOutlined ,VideoCameraOutlined, FireOutlined} from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePage from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'

const Home = (list) => {

  const [myList, setMyList] = useState(list.data)
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:true,
    smartLists:true,
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })

  return (
    <>
    <div>
    <Head>
          <title>Home</title>
        </Head>
        <Affix offsetTop={0}>
        <Header/>
      </Affix>
        <Row className="comm-main" type="flex" justify="center">
          <Col xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div className="comm-left">
            <List 
              header={<div>My list</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item=>(
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item}}}>
                    <a>{item.title}</a>
                      </Link>
                    </div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.time}</span>
                    <span><VideoCameraOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.view_count}</span>
                  </div>
                  <div className="list-context"
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
                </List.Item>
              )}
              />
               </div>
          </Col>
         
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
          </Col>
        </Row>
        
    </div>
    <Footer />
    </>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePage.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home