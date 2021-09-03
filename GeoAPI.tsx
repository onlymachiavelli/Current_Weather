import axios from "axios"
const DetectGeo = async  () => {
    const Response = await axios.get(`http://ip-api.com/json`).then(r => r.data)
    return Response.country
    
    
}

export default DetectGeo



/*
const Request = await fetch("http://ip-api.com/json")
    const Response = await Request.json()
    return Response
*/