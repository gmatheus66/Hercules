import axios from "axios";

export const http = axios.create({
    baseURL: 'http://herculestock.herokuapp.com/',
    headers: { 'Content-Type': 'application/json',
    post: { 'Content-type': 'application/x-www-form-urlencoded'} }
})