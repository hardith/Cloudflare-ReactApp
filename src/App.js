import React, { createElement, useState, useEffect } from 'react';
import { Comment, Avatar, Tooltip, Form, Button, List, Input } from 'antd';
import "antd/dist/antd.css";
import {
  LikeOutlined, DislikeFilled,
  DislikeOutlined, LikeFilled
} from '@ant-design/icons';
import "bootstrap/dist/css/bootstrap.css";
import Comments from "./Comments";
const { TextArea } = Input;


const data = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/oFfmyzshSidtkzZZSgea.jpg",
    userName: 'kobe',
    title: 'Title',
    content: '## hello world',
    like: "0",
    disLike: "0",
    comment: [],
    URL:"",
    type:"default"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/SJMVsfeiXXnvxvEwgHjy.gif",
    userName: 'harden',
    title: 'Title',
    content: 'i want to play a game',
    like: "0",
    disLike: "0",
    comment: [],
    URL:"",
    type:"default"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/NCRZHCzKeqkcBaKXDPZb.jpg",
    userName: 'jordan',
    title: 'Title',
    content: 'i want to play basketball',
    like: "0",
    disLike: "0",
    comment: [{
      avatar: "https://gw.alipayobjects.com/zos/rmsportal/SJMVsfeiXXnvxvEwgHjy.gif",
      userName: 'michel',
      content: 'http://taobao.com',
    }],
    URL:"",
    type:"default"
  }
]


const generatePosts = (postData) => {
  let postsJSX = postData.map((post) => {
    return (
      <Comments post={post}/>
    );
  });
  console.log(postData[0]);
  return (
    <>
      {postsJSX}
    </>
  );
};

export default function App() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    getPosts();
  },[]);

  const getPosts = () => {
    // TODO : get api not working have to fix it
    // response = await fetch(' https://serverless-api.hardithsuvarna.workers.dev/posts');
    // response = await response.json();
    setPostsData(data);
  };

  return (
    <div className="container">
      <div className="" style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
        <div style={{
          display: 'block', padding: 30
        }}>
          <div className="" style={{display:"flex",alignItems:"center", justifyContent:"center"}}>
            <h2 style={{color:"rgb(244, 129, 32)"}}>Cloudflare Social Media</h2>
          </div>
          <br/>
          {postsData.length > 0 && (
            generatePosts(postsData)
          )}
        </div>
      </div>
    </div>
  );
}
