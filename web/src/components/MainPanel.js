import React from 'react'

export default class MainPanel extends React.Component {
    render() {
        return (
            <div className='main-panel'>
                <div className='header'>
                    <h1>งานรับเพื่อนใหม่ 2560</h1><br/>
                    <p>ลงทะเบียนเข้างาน เวลา 15.30 น. - 17.00 น.</p>
                    <p>ณ ศูนย์ประชุมธรรมศาสตร์ ศูนย์รังสิต</p>
                </div>
                <p>ขั้นตอนการเข้าร่วมงาน</p><br/>
                <ol className='pad'>
                    <li>ลงทะเบียนผ่าน Link ลงทะเบียนกิจกรรมวันปฐมนิเทศนักศึกษาใหม่ (กิจกรรมจำกัดผู้เข้าร่วมเพียง 4,500 คน) <strong>ตอนนี้ปิดรับไปแล้วนะจ๊ะ</strong></li>
                    <li>ตรวจสอบรายชื่อของตัวเอง โดยใช้เลขบัตรประชาชน 13 หลัก หรือ ชื่อ - นามสกุล</li>
                    <li>เตรียมหลักฐานยืนยันต่อไปนี้มาในวันงาน
                        <ol className='pad'>
                            <li>ใบบาร์โค้ดลงทะเบียนเข้าร่วมกิจกรรม (พิมพ์จากลิงค์ของมหาวิทยาลัย เปิดให้พิมพ์จากระบบวันที่ 27 กรกฏาคม) <a href='http://sa.tu.ac.th/oth/studenthandbook/member/STDfindPrint.php' target='_blank'>http://sa.tu.ac.th/oth/studenthandbook/member/STDfindPrint.php</a></li>
                            <li>หลักฐานยืนยันการเป็นนักศึกษาชั้นปีที่ 1 อย่างใดอย่างหนึ่ง
                                <ul className='pad'>
                                    <li>-  บัตรคิวขึ้นทะเบียนนักศึกษาใหม่</li>
                                    <li>-  บัตรนักศึกษา (สำหรับนักศึกษาที่ผ่านกิจกรรม "ขึ้นทะเบียน/ตรวจร่างกาย ในวันที่ 1 สิงหาคมแล้ว")</li>
                                    <li>-  บัตรสอบ TCTC</li>
                                </ul>
                            </li>
                        </ol>
                    </li>
                    <li>นำหลักฐานมาแสดง ตอนลงทะเบียนหน้างานได้ในวันที่ 1 สิงหาคม ตั้งแต่เวลา <u>15.30 น. - 17.00 น.</u> ณ ศูนย์ประชุมธรรมศาสตร์ รังสิต</li>
                    <li>สนุกสนานให้เต็มที่ไปกับการแสดงมากมาย และคอนเสิร์ตจากศิลปินภายในงาน</li>
                </ol>
            </div>
        )
    }
}