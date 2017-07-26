import React from 'react'
import MainPanel from '../components/MainPanel'
import AuditPanel from '../components/AuditPanel'
import QAPanel from '../components/QAPanel'
import Footer from '../components/Footer'

export default class Home extends React.Component {
    render(){
        return(
            <div className='home'>
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col cover">
                         <img height='100%' src='/assets/cover.png'/> 
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
                            <div className="mdl-tabs__tab-bar">
                                <a href="#home" className="mdl-tabs__tab is-active">หน้าหลัก</a>
                                <a href="#audit" className="mdl-tabs__tab">ตรวจสอบรายชื่อ</a>
                                <a href="#qa" className="mdl-tabs__tab">Q&A</a>
                            </div>

                            <div className="mdl-tabs__panel is-active" id="home">
                                <MainPanel/>
                            </div>
                        
                            <div className="mdl-tabs__panel" id="audit">
                                <AuditPanel/>
                            </div>

                            <div className="mdl-tabs__panel" id="qa">
                                <QAPanel/>
                            </div>
                        </div>
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        <Footer/> 
                    </div>
                </div>
            </div>
        )
    }
}