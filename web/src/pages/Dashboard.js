import React from 'react'
import {CSVLink} from 'react-csv'
import { Layout, Table, Card, Row, Col, Button, Spin } from 'antd'
import StudentApi from '../api/StudentApi'
const { Header, Content } = Layout

export default class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.columns = [{
            title: 'ลำดับที่จอง',
            dataIndex: 'order_id',
            sorter: (a, b) => a.order_id - b.order_id
        }, {
            title: 'เลขที่บัตร ปชช./Citizen ID/Passport ID',
            dataIndex: 'national_id',
            sorter: (a, b) => a.national_id - b.national_id
        }, {
            title: 'ชื่อ - นามสกุล',
            dataIndex: 'name'
        }, {
            title: 'ประเภทการเดินทาง',
            dataIndex: 'goback'
        }, {
            title: 'เวลาเดินทางกลับ',
            dataIndex: 'time',
            sorter: (a, b) => a.time.length - b.time.length
        }]

        this.state = {
            csv: [],
            data: [],
            goback: 0,
            confirm: 0,
            timegoback: 0,
            loading: true,
        }
    }

    stopLoading(){
        this.setState({
            loading: false
        })
    }

    componentWillMount(){
        let data = []
        let countTime = 0
        let countGoback = 0
        let confirm = 0

        StudentApi.getAllStudent().then((response)=>{
            try{
                response.data.map((student,key)=>{
                    let goback = '-'
                    let time = '-'

                    if(student.goBackType){
                        goback = (student.goBackType!='null') ? student.goBackType : '-'
                        time = (student.goBackTime!='null') ? student.goBackTime : '-'
                        if(goback!=='-'){
                            countGoback++
                        }
                        if(time!=='-'){
                            countTime++
                        }
                        confirm++
                    }

                    data.push({
                        key: key,
                        order_id: student.order_id,
                        national_id: student.national_id,
                        name: `${student.name_type} ${student.name} ${student.lastname}`,
                        goback: goback,
                        time: time
                    })
                })

                this.setState({
                    csv: response.data,
                    data: data,
                    goback: countGoback,
                    timegoback: countTime,
                    loading: false,
                    confirm: confirm
                })
            }catch(e){
                this.stopLoading()
            }
        }).catch((e)=>{
            this.stopLoading()
        })
    }

    render(){
        return(
            <div>
                 <Layout>
                    <Header><h2 style={{'color':'#FFFFFF'}}>Dashboard</h2></Header>
                    <Content style={{'backgroundColor':'#FFFFFF'}}>
                        <div>
                            <Row style={{'width':'883px'}}>
                                <div>
                                    <Col span={8}>
                                        <Spin spinning={this.state.loading}>
                                            <Card title="เดินทางไปอนุเสาวรีย์ชัยสมรภูมิ" style={{ width: 300 }}>
                                                <div>
                                                    <h2 style={{'textAlign':'center'}}>{this.state.goback} คน</h2>
                                                </div>
                                            </Card>
                                        </Spin>
                                    </Col>
                                    <Col span={8}>
                                        <Spin spinning={this.state.loading}>
                                            <Card title="กลับก่อนเวลา" style={{ width: 300 }}>
                                                <div>
                                                    <h2 style={{'textAlign':'center'}}>{this.state.timegoback} คน</h2>
                                                </div>
                                            </Card>
                                        </Spin>
                                    </Col>
                                    <Col span={8}>
                                        <Spin spinning={this.state.loading}>
                                            <Card title="ยืนยันแล้ว" style={{ width: 300 }}>
                                                <div>
                                                    <h2 style={{'textAlign':'center'}}>{this.state.confirm} / 4,500 คน</h2>
                                                </div>
                                            </Card>
                                        </Spin>
                                    </Col>
                                </div>
                            </Row>
                        </div>

                        <div>
                            <Table loading={this.state.loading} columns={this.columns} dataSource={this.state.data} size="middle" pagination={{ pageSize: 20 }}/>
                        </div>

                        <div>
                            <CSVLink data={this.state.csv} filename={"students.csv"}>
                                <Button type="primary" icon="download" size={'default'} style={{'marginBottom':'20px'}} disabled={this.state.data.length<=0}>Download CSV</Button>
                            </CSVLink>
                        </div>
                    </Content>
                </Layout> 
            </div>
        )
    }
}