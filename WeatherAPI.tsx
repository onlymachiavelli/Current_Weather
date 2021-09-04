import axios from 'axios'
//Open weather api
const myAPIKey = process.env.MY_API_KEY


export const GetWeather =async (Country:String) =>{
    const Response = await(axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${Country}&appid${myAPIKey}&units=metric`).then(
        res => res.data
    ))
    return Response
}   


/*
let Response
    try{
        Response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${Country}&appid${myAPIKey}&units=metric`
        ).then((Response) => Response.json())
    }
    catch(e){
        console.log(e)
    }
    return Response
* */