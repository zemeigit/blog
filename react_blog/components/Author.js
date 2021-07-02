
import {Avatar,Divider} from 'antd'
import { GithubOutlined } from '@ant-design/icons';

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size="small" src="http://localhost:3000/image/zemei.jpg" /></div>
            <div className="author-introduction">
                This is me
                <Divider>social</Divider>
                <GithubOutlined />Github

            </div>
        </div>
    )

}

export default Author