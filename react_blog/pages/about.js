import React ,{useState} from 'react'
import Head from 'next/head'
import {Affix} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

const About = () => {

  return (
    <>
    <div>
    <Head>
          <title>Zemei</title>
        </Head>
        <Affix offsetTop={0}>
        <Header/>
      </Affix>
        <div className="comm-main" type="flex" justify="center">
            <div className="comm-left">
            <p>My Timeline</p>
            <img className="about-img" src="image/timeline.jpg"></img>
               </div>
         <div className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
          </div>
          </div>  
    </div>
    <Footer />
    </>
  )
}

export default About