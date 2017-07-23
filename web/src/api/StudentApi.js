import { UPDATE_ENDPOINT } from '../config/endpoints'
import axios from 'axios'

export default class StudentApi {
    static updateGoBackHome(id, time, type){
        return axios.get(UPDATE_ENDPOINT+'/'+id+'/'+time+'/'+type)
    }
}