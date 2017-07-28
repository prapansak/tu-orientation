import { UPDATE_ENDPOINT, GET_STUDENT_ENDPOINT } from '../config/endpoints'
import axios from 'axios'

export default class StudentApi {
    static updateGoBackHome(id, time, type){
        return axios.get(UPDATE_ENDPOINT+'/'+id+'/'+time+'/'+type)
    }

    static getAllStudent(){
        return axios.get(GET_STUDENT_ENDPOINT)
    }
}