import React from 'react'
import moment from 'moment'
import axios from 'axios'
import SearchApi from '../api/SearchApi'
import StudentApi from '../api/StudentApi'
import { Input, Button, Modal, TimePicker, } from 'antd'

const ModalWarning = Modal.warning;

const format = 'h:mm a';

const LOADING = (props) => (
    <div className='status'>
        <div className="mdl-spinner mdl-js-spinner is-active"></div>
    </div>
)

const STATUS = (props) => (
    <div className='status'>
        <h2>{props.msg}</h2>
    </div>
)

const PENDING = () => (
    <div className='pending'>
        <h2>กรุณากรอกข้อมูลเพื่อตรวจสอบ</h2>
    </div>
)

const NOT_FOUND = () => (
    <div className='notfound'>
        <h2>เสียใจด้วยค่ะ คุณลงทะเบียนในลำดับที่เกิน 4,500</h2>
        <div>หากมีข้อผิดพลาดหรือข้อสงสัย กรุณาติดต่อ:</div>
        <div>E-mail: regdomesu@gmail.com</div>
    </div>
)


const FOUND = (props) => (
    <div className='found'>
        <div className='sec-1'>
            <h2 className='title'>ยินดีด้วย คุณ {props.name}</h2>
            <h2 className='title'>ลงทะเบียนในอันดับที่ {props.id} มีสิทธิ์เข้าร่วมกิจกรรม</h2>
            <div>กิจกรรมงานรับเพื่อนใหม่เวลา 17.30 น. - 23.30 น. ลงทะเบียนได้ตั้งแต่ 15.30 น. - 17.00 น.</div>
            <div className='detail' onClick={()=>{window.location='/'}}><u>อ่านรายละเอียดเพิ่มเติมที่หน้าแรก</u></div>
        </div>

        <div className='sec-2'>
            <div><u>หมายเหตุ</u></div>
            <form>
                <div className='sub-1'>
                    <label >ไม่สะดวกอยู่จนจบกิจกรรม กลับเวลาประมาณ : </label>
                    <div className='timepicker'>
                    <TimePicker
                        onChange={(event)=>props.timePickerHandle(event)}
                        format={format}
                        use12Hours
                    />
                    </div>
                </div>
                <div className='sub-2'>
                    <div className='radio'>
                        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="victory">
                            <input name='victory' type="checkbox" id="victory" className="mdl-checkbox__input"  checked={props.victory} onChange={(event)=>props.inputPlaceHandle(event)}/>
                            <span className="mdl-checkbox__label">เดินทางกลับด้วยรถโดยสาร ขสมก. ไปอนุเสาวรีย์ชัยสมรภูมิ (ทางมหาวิทยาลัยจัดเตรียมไว้ให้) โดยรถจะออกหลังจบกิจกรรมแล้ว และจอดตามป้ายรถโดยสารประจำทางระหว่างเส้นทางได้</span>
                        </label>
                    </div>
                    <div className='button-sent'>
                        <Button onClick={(event)=>props.onSubmitHandle(event)}>ส่งข้อมูล</Button>
                    </div>
                </div>
            </form>
        </div>

    </div>
)

export default class AuditPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            date: null,
            victory: false,
            resultStatus: 'WAITING',
            resultData: {
                national_id: '',
                id: null,
                name: ''
            },
            dialogMsg: ''
        }
    }

    onInputIdChange(event){
        let value = event.target.value
        if(value.match(/^[0-9]*$/)){
            this.setState({
                id: value,
                firstname: '',
                lastname: ''
            })
        }
    }

    showModal(){
        Modal.warning({
            title: 'การแจ้งเตือน',
            content: this.state.dialogMsg,
        });
    }

    onInputNameChange(event){
        let value = event.target.value
        if(value.match(/^([^0-9]*)$/)){
            this.setState({
                id: '',
                [event.target.name]: value,
            })
        }
        
    }

    onInputPlaceChange(event){
        let { victory} = this.state
        this.setState({
            victory: (!victory)
        })
    }

    onTimePickerChange(value){
        if(value){
            this.setState({
                date: value.format(format)
            })
        }else{
            this.setState({
                date: null
            })
        }
    }

    setResponseData(response){
        try {
            if (response.data == null) {
                this.setState({
                    resultStatus: 'NOT_FOUND',
                    resultData: null
                })
            } else {
                this.setState({
                    resultStatus: 'FOUND',
                    resultData: {
                        national_id : response.data.national_id,
                        id: response.data.order_id,
                        name: response.data.name + ' ' + response.data.lastname
                    }
                })
            }
        } catch (e) {
            this.setState({
                resultStatus: 'ERROR'
            })
        }
    }

    onCheckDataFormSubmit(event){
        event.preventDefault()
        let {id, firstname, lastname} = this.state

        if(id===''&&firstname===''&&lastname===''){
            this.setState({
                dialogMsg: 'กรุณากรอกข้อมูลเพื่อตรวจสอบรายชื่อ'
            }, () => {
                this.showModal()
            })
        }else{
            if(id!==''){
                SearchApi.searchById(id).then((response) => {
                    this.setResponseData(response)
                }).catch((e) => {
                    this.setState({
                        resultStatus: 'ERROR'
                    })
                })

                this.setState({
                    id: '',
                    firstname: '',
                    lastname: ''
                })
            }else{
                if(firstname===''||lastname===''){
                    this.setState({
                        dialogMsg: 'กรุณากรอกชื่อและนามสกุล'
                    },()=>{
                        this.showModal()
                    })
                }else{
                    SearchApi.searchByName(firstname, lastname).then((response)=>{
                        this.setResponseData(response)
                    }).catch((e)=>{
                        this.setState({
                            resultStatus: 'ERROR'
                        })
                    })

                    this.setState({
                        id: '',
                        firstname: '',
                        lastname: ''
                    })
                }
            }
        }
    }

    onSendDataFormSubmit(event){
        event.preventDefault()
        let {date, victory, resultData} = this.state
        
        if(date==null&&victory==false){
            this.setState({
                dialogMsg: 'กรุณาใส่ข้อมูลหมายเหตุ'
            },()=>{
                this.showModal()
            })
        }else{
            let place = (victory==true) ? 'อนุเสาวรีย์ชัยสมรภูมิ' : null
            StudentApi.updateGoBackHome(resultData.national_id, date , place).then((response)=>{
                try{
                    if(response.data!=null){
                        this.setState({
                            resultStatus: 'SUCCESS'
                        }) 
                    }else{
                        this.setState({
                            resultStatus: 'ERROR'
                        }) 
                    }
                }catch(e){
                    this.setState({
                        resultStatus: 'ERROR'
                    }) 
                }
                
                this.setState({
                    date: null,
                    victory: false
                })
            }).catch((e)=>{
                this.setState({
                    resultStatus: 'ERROR'
                })
                this.setState({
                    date: null,
                    victory: false
                })
            })
        }
    }

    getResultElement(){
        let { resultStatus, resultData, victory} = this.state
        switch(resultStatus){
            case 'LOADING'          : return <LOADING/>
            case 'WAITING'          : return <STATUS msg='กรุณากรอกข้อมูลเพื่อตรวจสอบรายชื่อ'/>
            case 'FOUND'            : return <FOUND id={resultData.id} name={resultData.name} victory={victory} timePickerHandle={(event)=>this.onTimePickerChange(event)} inputPlaceHandle={(event)=>this.onInputPlaceChange(event)} onSubmitHandle={(event)=>{this.onSendDataFormSubmit(event)}}/>
            case 'NOT_FOUND'        : return <NOT_FOUND/>
            case 'SUCCESS'          : return <STATUS msg='บันทึกข้อมูลแล้ว'/>
            case 'ERROR'            : return <STATUS msg='พบข้อผิดพลาด กรุณาลองอีกครั้ง'/>
            default                 : return null
        }
    }

    render() {
        return (
            <div className='audit-panel'>
                <div className='header'><h1>งานรับเพื่อนใหม่ 2560</h1></div>
                <p>ตรวจสอบรายชื่อผู้มีสิทธิ์เข้าร่วมกิจกรรม</p><br/>

               
                    <form>
                        
                        <div className='input'>
                            <label className='title'>เลขบัตรประชาชน 13 หลัก / Citizen ID / Passport ID :</label>
                            <Input value={this.state.id} onChange={(event) => this.onInputIdChange(event)}/>
                        </div>

                        <div className='input'>
                            <label className='title'>หรือ</label>
                        </div>

                        <div className='input'>
                            <label className='title'>ชื่อนักศึกษา / First Name :</label>
                            <Input name='firstname' value={this.state.id} value={this.state.firstname} onChange={(event) => this.onInputNameChange(event)}/>
                        </div>

                        <div className='input'>
                            <label className='title'>นามสกุลนักศึกษา / Last Name :</label>
                            <Input name='lastname' value={this.state.id} value={this.state.lastname} onChange={(event) => this.onInputNameChange(event)}/>
                        </div>

                        <div className='button'>
                        <Button onClick={(event) => { this.onCheckDataFormSubmit(event) }}>ตรวจสอบ</Button>
                        </div>
                    </form>


                    <div className='card-result'>
                        <div className='card-result-data'>
                            {
                                this.getResultElement()
                            }
                        </div>
                    </div>
             
            </div>
        )
    }
}