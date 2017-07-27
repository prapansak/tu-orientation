import React from 'react'
import { Layout, Tabs } from 'antd'
const { Header, Footer, Content } = Layout
const TabPane = Tabs.TabPane;

import MainPanel from '../components/MainPanel'
import AuditPanel from '../components/AuditPanel'
import QAPanel from '../components/QAPanel'
import FooterElement from '../components/Footer'

export default class Home extends React.Component {
    render(){
        return(
            <div className='home'>
                 <Layout>
                    <Header style={{'padding':'0px','height':'250px'}}>
                         <img src='/assets/cover.png'/> 
                    </Header>
                    <Content style={{'backgroundColor':'#FFFFFF'}}>
                         <Tabs defaultActiveKey="1">
                            <TabPane tab="หน้าหลัก" key="1"><MainPanel/></TabPane>
                            <TabPane tab="ตรวจสอบรายชื่อ" key="2"><AuditPanel/></TabPane>
                            <TabPane tab="Q&A" key="3"><QAPanel/></TabPane>
                        </Tabs>
                    </Content>
                    <Footer><FooterElement/></Footer>
                </Layout> 
            </div>
        )
    }
}