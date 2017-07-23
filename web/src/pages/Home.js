import React from 'react'
import MainPanel from '../components/MainPanel'
import AuditPanel from '../components/AuditPanel'
import Footer from '../components/Footer'

export default class Home extends React.Component {
    render(){
        return(
            <div className='home'>
                <div className="mdl-grid cover">
                    <div className="mdl-cell mdl-cell--12-col">
                         <img className='cover' height='100%' src='/assets/cover.png'/> 
                    </div>
                </div>

                <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                    <div className="mdl-tabs__tab-bar">
                        <a href="#home" className="mdl-tabs__tab is-active">หน้าหลัก</a>
                        <a href="http://sa.tu.ac.th/oth/studenthandbook/member/register.php" target='_blank' className="mdl-tabs__tab">ลงทะเบียนเข้าร่วมกิจกรรม</a>
                        <a href="#audit" className="mdl-tabs__tab">ตรวจสอบรายชื่อ</a>
                        <a href="#qa" className="mdl-tabs__tab">Q&A</a>
                    </div>

                    <div className="mdl-tabs__panel is-active" id="home">
                        <MainPanel/>
                    </div>
                
                    <div className="mdl-tabs__panel" id="audit">
                        <AuditPanel/>
                    </div>

                    <div className="mdl-tabs__panel" id="qa"></div>
                </div>

                <Footer/> 
            </div>
        )
    }
}