import axios from "axios"
const DetectGeo = async  () => {
    const Response = await axios.get(`http://ip-api.com/json`).then(
        res => res.data
        )
    return Response.country
    
    
}

export default DetectGeo


