import axios from 'axios'
//Open weather api
const myAPIKey = process.env.MY_API_KEY


const GetWeather =async (Country:String) =>{
    const Response = await(axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${Country}&appid${myAPIKey}&units=metric`).then(
        res => res.data
    )).then((Res) =>{
        console.log(Res)
    })
    return Response
}   

export default GetWeather