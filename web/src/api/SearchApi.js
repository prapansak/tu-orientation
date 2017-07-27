import { SEARCH_ENDPOINT } from '../config/endpoints'
import axios from 'axios'

export default class SearchApi {
    static searchById(id){
        return axios.get(SEARCH_ENDPOINT+'/'+id)
    }

    static searchByName(firstname, lastname){
        return axios.get(SEARCH_ENDPOINT+'/'+firstname+'/'+lastname)
    }
}