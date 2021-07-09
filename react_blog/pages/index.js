import React ,{useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {List,Affix} from 'antd'
import { CalendarOutlined ,VideoCameraOutlined, FireOutlined} from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'

const Home = (list) => {

  const [myList, setMylist] = useState(list.data)
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
    <div>
    <div>
    <Head>
          <title>Zemei</title>
        </Head>
        <Affix offsetTop={0}>
        <Header/>
      </Affix>
        <div className="comm-main" type="flex" justify="center">
            <div className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} >
            <List 
              header={<div className="list-header">Blog List</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item=>(
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
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

         <div className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
          </div>
          </div>  
    </div>
    <Footer />
    </div>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home