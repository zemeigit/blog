import { GithubOutlined } from '@ant-design/icons';

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <a href="/about">
            <img className="author" src="http://localhost:3000/image/zemei.jpg" />
            </a>
            <div className="author-introduction">
                Zemei
            </div>
            <br></br>
            <a className="git" href="https://github.com/zemeigit"><GithubOutlined /></a>

        </div>
    )

}

export default Author