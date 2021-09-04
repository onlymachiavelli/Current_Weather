import axios from 'axios'
//Open weather api
const myAPIKey = "6cba2f8ad49e4b6a296f9dbede110e2e"


const GetWeather =async (Country:String) =>{
    const Response = await(axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${Country}&units=metric&appid=${myAPIKey}`).then(
        res => res.data
    ))
    return Response
}   

export default GetWeather