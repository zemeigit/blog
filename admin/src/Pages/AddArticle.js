import React, {useState,useEffect} from 'react'
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker ,message} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Item from 'antd/lib/list/Item'

const { Option } = Select;
const { TextArea } = Input

function AddArticle(props){

   const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
   const [articleTitle,setArticleTitle] = useState('')   //文章标题
   const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
   const [markdownContent, setMarkdownContent] = useState('review') //html内容
   const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
   const [introducehtml,setIntroducehtml] = useState('editing') //简介的html内容
   const [showDate,setShowDate] = useState()   //发布日期
   const [updateDate,setUpdateDate] = useState() //修改日志的日期
   const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
   const [selectedType,setSelectType] = useState('select') //选择的文章类别

   useEffect(()=>{
       getTypeInfo()
   },[])

   marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    }); 

    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }
 
    const changeIntroduce = (e)=>{
         setIntroducemd(e.target.value)
         let html=marked(e.target.value)
         setIntroducehtml(html)
     }

     const getTypeInfo = ()=>{
         axios({
             method:'get',
             url:servicePath.getTypeInfo,
             header:{ 'Access-Control-Allow-Origin':'*' },
             withCredentials:true
         }).then(
             res=>{ 
                if(res.data.data==='no login'){
                    localStorage.removeItem('openId')
                    props.history.push('/index')
                }else{
                    setTypeInfo(res.data.data)
                }
             }
         )
     }
     const selectTypeHandler =(value)=>{
        setSelectType(value)
    }

    const saveArticle = ()=>{
        if(!selectedType){
            message.error('must select article type')
            return false
        }else if(!articleTitle){
            message.error('title can not be empty')
            return false
        }else if(!articleContent){
            message.error('content can not be empty')
            return false
        }else if(!introducemd){
            message.error('introduce can not be empty')
            return false
        }else if(!showDate){
            message.error('release date can not be empty')
            return false
        }
        let dataProps = {}
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content =articleContent
        dataProps.introduce =introducemd
        let dataText = showDate.replace('-','/')
        dataProps.time = (new Date(dataText).getTime())/1000
        if(articleId==0){
            dataProps.view_count = 0;
            axios({
                method:'post',
                url:servicePath.addArticle,
                data:dataProps,
                header:{ 'Access-Control-Allow-Origin':'*' },
                withCredentials:true,
            }).then(
                res=>{
                    setArticleId(res.data.insertId)  
                    if(res.data.isSuccess){
                        message.success('success save')
                    }else{
                        message.error('fail save');
                    }           
                }
            )
        }else{
            dataProps.id = articleId
            axios({
                method:'post',
                url:servicePath.updateArticle,
                data:dataProps,
                header:{ 'Access-Control-Allow-Origin':'*' },
                withCredentials:true,
            }).then(
                res=>{
                    if(res.data.isSuccess){
                        message.success('success update')
                    }else{
                        message.error('fail update')
                    }
                }
            )
        }

    }
    return (
      <div>
          <Row gutter={5}>
            <Col span={18}>
                <Row gutter={10}>
                    <Col span={20}>
                        <Input 
                            placeholder="Blog title"
                            size="large"
                            onChange={e=>{setArticleTitle(e.target.value)}}
                            size="large" 
                        />
                    </Col>
                    <Col span={4}>
                        &nbsp;
                        <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                            {
                                typeInfo.map((item,index)=>{
                                    return (<Option key={index} value={item.Id}>{item.typeName}</Option>)
                                })}
                        </Select>
                    </Col>
                </Row>
                <br/>
                <Row gutter={10}>
                    <Col span={12}>
                        <TextArea
                            className="markdown-content"
                            rows={35}
                            placeholder="Article Content"
                            onChange={changeContent}
                            />
                    </Col>
                    <Col span={12}>
                        <div className="show-html" dangerouslySetInnerHTML={{__html:markdownContent}}></div>
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                <Row>
                    <Col span="24">
                        <Button size="large">Draft Article</Button>&nbsp;
                        <Button type="primary" size="large" onClick={saveArticle}>Submit Article</Button>
                        <br/>
                    </Col>
                    <Col span="24">
                        <br/>
                        <TextArea 
                            rows={4} 
                            placeholder="Intro"
                            onChange={changeIntroduce}
                        />
                        <br/><br/>
                        <div  className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                    </Col>
                    <Col span={12}>
                        <div className="date-select">
                            <DatePicker
                                onChange={(date,dateString)=>setShowDate(dateString)}
                                placeholder="Release Date"
                                size="large"  
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col span={6}></Col>
            </Row>
      </div>
    )
}
export default AddArticle