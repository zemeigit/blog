import React, {useState,useEffect} from 'react'
import {List,Row,Col,Modal,message,Button} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'

const {confirm} = Modal;

function ArticleList(props){
    const [list,setList] = useState([])
    useEffect(()=>{
        getList()
    },[])
    const getList = ()=>{
        axios({
            method:'get',
            url: servicePath.getArticleList,
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                setList(res.data.list)  
            }
        )
    }
    const deleteArticle = (id)=>{
        confirm({
            title:'confirm to delete',
            content:'if click ok, article will be delete',
            onOk(){ 
                axios(servicePath.deleteArticle+id,{withCredentials:true}).then(
                    res=>{
                        message.success('delete success')
                        getList()
                    }
                )
            },
            onCancel(){
                message.success('nothing')
            }
        })
    }
    const updateArticle = (id,checked)=>{

        props.history.push('/index/add/'+id)
    
    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>Title</b>
                        </Col>
                        <Col span={4}>
                            <b>Catogroy</b>
                        </Col>
                        <Col span={4}>
                            <b>Release Time</b>
                        </Col>
                        <Col span={4}>
                            <b>View</b>
                        </Col>
                        <Col span={4}>
                            <b>Operation</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item=>(
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.time}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={()=>{updateArticle(item.id)}}>Modify</Button>&nbsp;
                                <Button onClick={()=>{deleteArticle(item.id)}}>Delete</Button>
                            </Col>

                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default ArticleList