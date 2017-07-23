import React from 'react'

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className='left'>
                    <div>
                        <ul>
                            <li>ช่องทางการติดต่อ</li>
                            <li>Email : regdomesu@gmail.com</li>
                            <li>FACEBOOK : องค์การนักศึกษามหาวิทยาลัยธรรมศาสตร์</li>
                        </ul>
                    </div>
                </div>
                <div className='right'>
                    <div className='org'>
                        <div className='logo'>
                           <img src='/assets/Q4HVGZ4V.jpg' width='100'/>
                        </div>
                        <div className='info'>
                            <strong className='title'>องค์การนักศึกษามหาวิทยาลัยธรรมศาสตร์</strong>
                            <div className='address'>99 หมู่ที่ 18 ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12121</div>
                            <strong className='title-eng'>STUDENT UNION THAMMASAT UNIVERSITY</strong>
                            <div className='address-eng'>99 PHAHON YOTHIN Rd., KLONG NUENG, KLONG LUANG, PHTUM THANI 12121</div>
                            <div className='contact'>Contact us : facebook.com/thammasatsu, email : tusu2560@gmail.com</div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}