import React from 'react'

export default class MainPanel extends React.Component {
    render() {
        return (
            <div className='main-panel'>
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                        <h3>งานรับเพื่อนใหม่ 2560</h3>
                        <div className="mdl-card">
                            <div className="mdl-card__title">
                                <p>ขั้นตอนการเข้าร่วมงาน</p>
                            </div>
                            <div className="mdl-card__supporting-text">
                                <ol>
                                    <li>ลงทะเบียนผ่าน Link ลงทะเบียนกิจกรรมวันปฐมนิเทศนักศึกษาใหม่ <a href='http://sa.tu.ac.th/oth/studenthandbook/member/register.php' target='_blank'>http://sa.tu.ac.th/oth/studenthandbook/member/register.php</a> (กิจกรรมจำกัดผู้เข้าร่วมเพียง 4,500 คน)</li>
                                    <li>ตรวจสอบรายชื่อของตัวเอง โดยใช้เลขบัตรประชาชน 13 หลัก และ ชื่อ - นามสกุล</li>
                                    <li>เตรียมหลักฐานยืนยันการเป็นนักศึกษา อย่างใดอย่างหนึ่ง</li>
                                    <ul>
                                        <li>บัตรคิวขึ้นทะเบียนนักศึกษาใหม่</li>
                                        <li>บัตรนักศึกษา (สำหรับนักศึกษาที่ผ่านกิจกรรม "ขึ้นทะเบียน/ตรวจร่างกาย ในวันที่ 1 สิงหาคมแล้ว")</li>
                                        <li>บัตรสอบ TCTC</li>
                                    </ul>
                                    <li>นำหลักฐานมาแสดง ตอนลงทะเบียนหน้างานได้ในวันที่ 1 สิงหาคม ตั้งแต่เวลา <u>15.30 น. - 17.00 น.</u> ณ ศูนย์ประชุมธรรมศาสตร์ รังสิต</li>
                                    <li>สนุกสนานให้เต็มที่ไปกับการแสดงมากมาย และคอนเสิร์ตจากศิลปินภายในงาน</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}