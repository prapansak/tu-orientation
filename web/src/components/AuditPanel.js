import React from 'react'
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import axios from 'axios'
import SearchApi from '../api/SearchApi'
import StudentApi from '../api/StudentApi'

const format = 'h:mm a';

const MODAL = (props) => (
    <dialog className="mdl-dialog">
        <div className="mdl-dialog__content">
            <p>{props.msg}</p>
        </div>
        <div className="mdl-dialog__actions">
            <button type="button" className="mdl-button close" onClick={()=>props.closeHandle()}>ปิด</button>
        </div>
    </dialog>
)

const LOADING = (props) => (
    <div className='status'>
        <div className="mdl-spinner mdl-js-spinner is-active"></div>
    </div>
)

const STATUS = (props) => (
    <div className='status'>
        <h5>{props.msg}</h5>
    </div>
)

const PENDING = () => (
    <div className='pending'>
        <h5>กรุณากรอกข้อมูลเพื่อตรวจสอบ</h5>
    </div>
)

const NOT_FOUND = () => (
    <div className='notfound'>
        <h5>เสียใจด้วยค่ะ คุณลงทะเบียนในลำดับที่เกิน 4,500</h5>
        <div>หากมีข้อผิดพลาดหรือข้อสงสัย กรุณาติดต่อ:</div>
        <div>E-mail: regdomesu@gmail.com</div>
    </div>
)


const FOUND = (props) => (
    <div className='found'>
        <div className='sec-1'>
            <h5 className='title'>ยินดีด้วย คุณ {props.name}</h5>
            <h5>ลงทะเบียนในอันดับที่ {props.id} มีสิทธิ์เข้าร่วมกิจกรรม</h5>
            <div>กิจกรรมงานรับเพื่อนใหม่เวลา 17.00 น. - 23.30 น. ลงทะเบียนได้ตั้งแต่ 15.30 น. - 17.00 น.</div>
            <div className='detail' onClick={()=>{window.location='/'}}><u>อ่านรายละเอียดเพิ่มเติมที่หน้าแรก</u></div>
        </div>

        <div className='sec-2'>
            <div><u>หมายเหตุ</u></div>
            <form onSubmit={(event)=>props.onSubmitHandle(event)}>
                <div className='sub-1'>
                    <label >ไม่สะดวกอยู่จนจบกิจกรรม กลับเวลาประมาณ : </label>
                    <TimePicker
                        showSecond={false}
                        className="xxx"
                        onChange={(event)=>props.timePickerHandle(event)}
                        format={format}
                        use12Hours
                    />
                </div>
                <div className='sub-2'>
                    <div>
                        <label >เดินทางกลับด้วยรถโดยสาร ขสมก. (ทางมหาวิทยาลัยจัดเตรียมไว้ให้) : </label>
                    </div>
                    <div className='radio'>
                        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="victory">
                            <input name='victory' type="checkbox" id="victory" className="mdl-checkbox__input"  checked={props.victory} onChange={(event)=>props.inputPlaceHandle(event)}/>
                            <span className="mdl-checkbox__label">ไปอนุเสาวรีย์ชัยสมรภูมิ</span>
                        </label>
                        <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="future">
                            <input name='future' type="checkbox" id="future" className="mdl-checkbox__input"  checked={props.future} onChange={(event)=>props.inputPlaceHandle(event)} />
                            <span className="mdl-checkbox__label">ไปฟิวเจอร์พาร์ครังสิต</span>
                        </label>
                    </div>
                    <button className="check-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">ส่งข้อมูล</button>
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
            future: false,
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
        if(value.match(/^[0-9]*$/)&&value.length<=13){
            this.setState({
                id: value,
                firstname: '',
                lastname: ''
            })
        }
    }

    onInputNameChange(event){
        let value = event.target.value
        if(value.match(/^([^0-9 ]*)$/)){
            this.setState({
                id: '',
                [event.target.name]: value,
            })
        }
        
    }

    onInputPlaceChange(event){
        let { future, victory} = this.state
        let name = event.target.name

        if(name=='future'){
            if(victory==true&&future==false){
                this.setState({
                    future: (!future),
                    victory: false
                })
            }else{
                this.setState({
                    future: (!future)
                })
            }
        }else{
            if(future==true&&victory==false){
                this.setState({
                    future: false,
                    victory: (!victory)
                })
            }else{
                this.setState({
                    victory: (!victory)
                })
            }
        }
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
                this.dialog.showModal()
            })
        }else{
            if(id!==''){
                if(id.length<13){
                    this.setState({
                        dialogMsg: 'กรุณากรอกตัวเลข 13 หลัก'
                    },()=>{
                        this.dialog.showModal()
                    })
                }else{
                    SearchApi.searchById(id).then((response)=>{
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
            }else{
                if(firstname===''||lastname===''){
                    this.setState({
                        dialogMsg: 'กรุณากรอกชื่อและนามสกุล'
                    },()=>{
                        this.dialog.showModal()
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
        let {date, future, victory, resultData} = this.state
        
        if(date==null&&future==false&&victory==false){
            this.setState({
                dialogMsg: 'กรุณาใส่ข้อมูลหมายเหตุ'
            },()=>{
                this.dialog.showModal()
            })
        }else{
            let place = (future==true) ? 'ฟิวเจอร์พาร์ครังสิต' : ((victory==true) ? 'อนุเสาวรีย์ชัยสมรภูมิ' : null)

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
                    future: false,
                    victory: false
                })
            }).catch((e)=>{
                this.setState({
                    resultStatus: 'ERROR'
                })
                this.setState({
                    date: null,
                    future: false,
                    victory: false
                })
            })
        }
    }

    getResultElement(){
        let { resultStatus, resultData, future, victory} = this.state
        switch(resultStatus){
            case 'LOADING'          : return <LOADING/>
            case 'WAITING'          : return <STATUS msg='กรุณากรอกข้อมูลเพื่อตรวจสอบรายชื่อ'/>
            case 'FOUND'            : return <FOUND id={resultData.id} name={resultData.name} future={future} victory={victory} timePickerHandle={(event)=>this.onTimePickerChange(event)} inputPlaceHandle={(event)=>this.onInputPlaceChange(event)} onSubmitHandle={(event)=>{this.onSendDataFormSubmit(event)}}/>
            case 'NOT_FOUND'        : return <NOT_FOUND/>
            case 'SUCCESS'          : return <STATUS msg='บันทึกข้อมูลแล้ว'/>
            case 'ERROR'            : return <STATUS msg='พบข้อผิดพลาด กรุณาลองอีกครั้ง'/>
            default                 : return null
        }
    }

    componentDidMount(){
        this.dialog = document.querySelector('dialog');
        if (!this.dialog.showModal) {
            dialogPolyfill.registerDialog(this.dialog);
        }
    }

    render() {
        return (
            <div className='audit-panel'>
                <div className="mdl-grid">
                    <div className="mdl-cell mdl-cell--12-col">
                        <h3>งานรับเพื่อนใหม่ 2560</h3>
                        <div className="mdl-card">
                            <div className="mdl-card__title">
                                <p>ตรวจสอบรายชื่อผู้มีสิทธิ์เข้าร่วมกิจกรรม</p>
                            </div>
                            <div className="mdl-card__supporting-text">
                                <form onSubmit={(event)=>{this.onCheckDataFormSubmit(event)}}>
                                    <div className='input'>
                                        <label className='title'>เลขบัตรประชาชน 13 หลัก / Citizen ID / Passport ID :</label>
                                        <div className="mdl-textfield mdl-js-textfield">
                                            <input className="mdl-textfield__input" type="text" id="citizen-id" value={this.state.id} onChange={(event)=>this.onInputIdChange(event)}/>
                                            <label className="mdl-textfield__label" htmlFor="citizen-id"></label>
                                        </div>
                                    </div>

                                    <div className='input'>
                                        <label className='title'>หรือ</label>
                                        <div className="mdl-textfield mdl-js-textfield"></div>
                                    </div>

                                    <div className='input'>
                                        <label className='title'>ชื่อนักศึกษา / First Name :</label>
                                        <div className="mdl-textfield mdl-js-textfield">
                                            <input name='firstname' className="mdl-textfield__input" type="text" value={this.state.firstname} onChange={(event)=>this.onInputNameChange(event)} id="firstname" />
                                            <label className="mdl-textfield__label" htmlFor="firstname"></label>
                                        </div>
                                    </div>

                                    <div className='input'>
                                        <label className='title'>นามสกุลนักศึกษา / Last Name :</label>
                                        <div className="mdl-textfield mdl-js-textfield">
                                            <input name='lastname' className="mdl-textfield__input" type="text" value={this.state.lastname} onChange={(event)=>this.onInputNameChange(event)}  id="lastname" />
                                            <label className="mdl-textfield__label" htmlFor="lastname"></label>
                                        </div>
                                    </div>

                                    <button className="check-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                                        ตรวจสอบ
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className='card-result'>
                            <div className='card-result-data'>
                                {
                                    this.getResultElement()
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <MODAL msg={this.state.dialogMsg} closeHandle={()=>this.dialog.close()}/>
            </div>
        )
    }
}