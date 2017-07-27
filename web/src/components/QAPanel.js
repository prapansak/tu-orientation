import React from 'react'

export default class QAPanel extends React.Component {
    render() {
        return (
            <div className='main-panel'>
                <div className='header'><h1>Q&A</h1></div>
                <p>
                    <span className='question'>Q : ถ้าเกิดว่าลงทะเบียนมาแล้ว แต่ตรวจสอบไม่พบข้อมูลหรือข้อมูลมีปัญหา?</span><br />
                    <span>A : เพื่อนๆสามารถติดต่อสอบถามมาทาง regdomesu@gmail.com เพื่อดำเนินการตรวจสอบและแก้ไขปัญหาต่อไปครับ</span>
                </p><br/>
                <p>
                    <span className='question'>Q : สามารถลงทะเบียนเข้าร่วมงานได้ตั้งแต่กี่โมง?</span><br />
                    <span>A : เพื่อนๆสามารถมาลงทะเบียนได้ตั้งแต่ 15.30 น. - 17.00 น. เลยครับ</span>
                </p><br/>
                <p>
                    <span className='question'>Q : ถ้าเกิดว่ามาลงทะเบียนไม่ทัน 17.00 น. จะเป็นยังไง?</span><br />
                    <span>A : ถ้าเกิดว่ามาเข้าแถวลงทะเบียนไม่ทัน 17.00 เราจะถือว่าน้องสละสิทธิ์</span>
                </p><br/>
                <p>
                    <span className='question'>Q : กิจกรรมรับเพื่อนใหม่ ต้องสวมชุดอะไรมาร่วมงาน?</span><br />
                    <span>A : ใส่ชุดลำลองสุภาพทั่วไป เหมาะกับการทำกิจกรรมครับ</span>
                </p><br/>
                <p>
                    <span className='question'>Q : ในวันงาน สามารถขอกลับก่อนเวลาได้มั้ย?</span><br />
                    <span>A : ถ้าในวันงานเพื่อนๆไม่สะดวกอยู่ร่วมกิจกรรมจนจบ สามารถลงชื่อออกจากงานก่อนได้ครับ แต่หลังจากนั้นจะถือว่าเพื่อนๆไม่ได้อยู่ในความรับผิดชอบของผู้จัดงานแล้วนะครับ</span>
                </p><br/>
                <p>
                    <span className='question'>Q : ถ้าไม่ได้ลงทะเบียนเข้าร่วกิจกรรมในลิงค์ สามารถมาเข้าร่วมกิจกรรมได้มั้ย?</span><br />
                    <span>A : ไม่แน่นอนครับ ขึ้นอยู่กับจำนวนผู้มาร่วมงานในวันนั้น เพราะต้องให้สิทธิ์กับคนที่ลงทะเบียนจองมาก่อนครับ</span>
                </p><br/>
                <p>
                    <span className='question'>Q : รถ ขสมก. ที่จัดไว้ให้ออกเวลากี่โมง?</span><br />
                    <span>A : รถ ขสมก. ที่จัดไว้ให้จะออกหลังจากเลิกกิจกรรมแล้วประมาณ 00.10 น. ซึ่งมีปลายทางที่อนุเสาวรีย์ชัยสมรภูมิ โดยสามารถจอดให้ลงได้ตามป้ายรถโดยสารประจำทางตามปกติ</span>
                </p>
            </div>
        )
    }
}