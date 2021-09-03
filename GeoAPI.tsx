import "axios"
import axios from "axios"
const DetectGeo = async  () => {
    const Response = await (await axios.get(`http://ip-api.com/json`)).data.country
    return Response
}

export default DetectGeo



/*
const Request = await fetch("http://ip-api.com/json")
    const Response = await Request.json()
    return Response
*/