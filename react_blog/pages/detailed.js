import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import {Row, Col, Breadcrumb,Affix} from 'antd'
import { CalendarOutlined ,VideoCameraOutlined, FireOutlined} from '@ant-design/icons';
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'
import MarkNav from 'markdown-navbar'
import ReactMarkdown from 'react-markdown'
import servicePage from '../config/apiUrl'
import Link from 'next/link'

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

  // let html = marked(props.article_content)

  let markdown='\n# P01:课程介绍和环境搭建\n' +
  '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
  '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
   '**这是加粗的文字**\n\n' +
  '*这是倾斜的文字*`\n\n' +
  '***这是斜体加粗的文字***\n\n' +
  '~~这是加删除线的文字~~ \n\n'+
  '\`console.log(111)\` \n\n'+
  '# p02:来个Hello World 初始Vue3.0\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n'+
  '***\n\n\n' +
  '# p03:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p04:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '#5 p05:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p06:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '# p07:Vue3.0基础知识讲解\n' +
  '> aaaaaaaaa\n' +
  '>> bbbbbbbbb\n' +
  '>>> cccccccccc\n\n'+
  '``` var a=11; ```'

  return (
      <div>
        <Head>
      <title>Detailed</title>
    </Head>
    <Header />
    <Row className="comm-main" type="flex" justify="center">
      <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
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
                    Zemei&aposs Good Life
                </div>
                <div className="list-icon center">
                    <span><CalendarOutlined />2021-06-01</span>
                    <span><VideoCameraOutlined />Video</span>
                    <span><FireOutlined />1234</span>
                </div>
                <div className="detailed-content" >
          
                  <ReactMarkdown 
                  // children={markdown} 
                  escapeHtml={false}  
                />
                </div>
            </div>
        </div>
      </Col>

      <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />  
        <Affix offsetTop={5}>
        <div className="detailed-nav comm-box">
            <div className="nav-title">Blog Menu</div>
            <div className="toc-list">
            {tocify && tocify.render()}
            </div>
            <MarkNav className="article-menu" 
            source={markdown} 
            ordered={true}/>
            </div>  
        </Affix>   
      </Col>    
    </Row>
    <Footer />
      </div>
    )
  }
Detailed.getInitialProps = async(context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePage.getArticleById+id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed