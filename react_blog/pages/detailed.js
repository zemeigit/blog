import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import Link from 'next/link'
import {Breadcrumb,Affix} from 'antd'
import { CalendarOutlined ,VideoCameraOutlined, FireOutlined} from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'
import MarkNav from 'markdown-navbar'
import servicePath from '../config/apiUrl'

const Detailed = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }; 

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
  let html = marked(props.article_content)

  return (
      <div>
        <Head>
      <title>Detailed-{props.title}</title>
    </Head>
    <Affix offsetTop={0}>
        <Header/>
      </Affix>
    <div className="comm-main" type="flex" justify="center">
      <div className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        <div>
            <div className="bread-div">
                <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link href="/"><a>Home</a></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link href="/"><a>Blog</a></Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Article</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <div className="detailed-title">
                    Zemei's Good Life
                </div>
                <div className="list-icon center">
                    <span><CalendarOutlined />{props.time}</span>
                    <span><VideoCameraOutlined />{props.typeName}</span>
                    <span><FireOutlined />{props.view_count}</span>
                </div>
                <div className="detailed-content" dangerouslySetInnerHTML = {{__html:html}}>
                </div>
            </div>
        </div>
      </div>

      <div className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />  
        <Affix offsetTop={60}>
        <div className="detailed-nav comm-box">
            <div className="nav-title">Blog Menu</div>
            <div className="toc-list">
            {tocify && tocify.render()}
            </div>
            <MarkNav className="article-menu" 
            source={html} 
            ordered={true}/>
            </div>  
        </Affix>   
      </div>    
    </div>
    <Footer />
      </div>
    )
  }
Detailed.getInitialProps = async(context)=>{
  let id = parseInt(context.query.id)
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById+id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed