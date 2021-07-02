import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, {useState} from 'react'
import '../static/css/AdminIndex.css'
import { Route } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props){
  const [collapsed,setCollapsed] = useState(false) 

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };
  const hanldeClickArticle = e=>{
      if(e.key==='AddArticle'){
          props.history.push('/index/add')
      }else{
          props.history.push('/index/list')
      }
  }

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                Workplace
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                Add Article
            </Menu.Item>
            <SubMenu key="sub1" 
                onClick={hanldeClickArticle}
                icon={<UserOutlined />} title="Article Managament">
                <Menu.Item key="AddArticle">Add New</Menu.Item>
                <Menu.Item key="ArticleList">Article List</Menu.Item>
            </SubMenu>
            
            <Menu.Item key="9" icon={<FileOutlined />}>
                Comment Management
            </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Managment</Breadcrumb.Item>
                <Breadcrumb.Item>WorkPlace</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
               
               <div style={{ padding: 24, background: '#fff', minHeight: 360 }}> 
                <div>
                    <Route path="/index/" exact component={AddArticle} />
                    <Route path="/index/add/" exact component={AddArticle} />
                    <Route path="/index/list/" exact component={ArticleList} />
                    <Route path="/index/add/:id" exact component={AddArticle} />
                </div>
            </div>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </Layout>
    );
}

export default AdminIndex
