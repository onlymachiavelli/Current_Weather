import React, { useState, useEffect } from 'react'
import {
    View, Text, ScrollView, TextInput, TouchableOpacity
} from 'react-native'
import { Style } from './style'
import { Current_svg, Search, Loc, ShowerRain, ClearSkyDay, ClearSkyNight, Snow, Thunderstorm, FewCloudsDay, FewCloudsNight, ScatteredClouds, BrokenClouds, Mist, Rain, NightCloudy } from './svg'
import DetectGeo from './GeoAPI'
import  GetWeather  from './WeatherAPI'
const Checkinp = (value:String) => {
    let res = value[0].toUpperCase()
    for (let i = 1; i < value.length; i++) res += value[i].toLowerCase()
    return res
}

const IsItAm = (icon:String) =>{
    if(icon[2] === "n") return false
    return true
}
const SVGS ={
    0:{"clear sky":[<ClearSkyDay/>, <ClearSkyNight/>]},
    1:{"few clouds":[<FewCloudsDay/>, <FewCloudsNight/>]},
    2:{"scattered clouds":<ScatteredClouds/>},
    3:{"broken clouds":<BrokenClouds/>},
    4:{"shower rain" :<ShowerRain/>},
    5:{"rain":<Rain/>},
    6:{"thunderstorm":<Thunderstorm/>},
    7:{"snow":<Snow/>},
    8:{"mist":<Mist/>}
}
const APICALLTIME = () =>{
    let Time
    let date = new Date()
    Time = (date.getHours() < 10 ? String(0+date.getHours()) : String(date.getHours())) + ":" + (date.getMinutes() < 10 ? String(0+date.getMinutes()) : String(date.getMinutes()))
    return Time
}
console.log(APICALLTIME())
const useCountry = () =>{
    const [Currentcountry, setCurrentCountry] = useState("")
    const [ToCountry, setToCountry] = useState("")
    useEffect(()=>{
        DetectGeo().then(res => {
            setCurrentCountry(res)
            setToCountry(res)
        })

    }, [])
    return {Currentcountry,ToCountry, setCurrentCountry, setToCountry}
}
const useWeather = () =>{
    
    const [WeatherGeo, SetWeatherGeo] = useState(useCountry().ToCountry)

    const [WeatherStats, setWeatherStats] = useState({
        Temp:"",
        Hum:"",
        Wind:"",
        Time:0,
        Description:""
    })
    useEffect(()=>{
        GetWeather(WeatherGeo).then(
            Response =>{
                setWeatherStats(
                    {
                        Temp:Response.main.temp,
                        Hum:Response.main.humidity,
                        Wind:Response.wind,
                        Time:0,
                        Description:Response.weather[0].description
                    }
                )
            }
        )
    }, [])
    return {WeatherGeo, SetWeatherGeo, WeatherStats, setWeatherStats}
}

const Home = () => {
    let [apiTime, setapiTime] = useState(APICALLTIME())
    let Current_Country = useCountry().Currentcountry
    Current_Country += (Current_Country === "Tunisia" ? " Lkalba" : "")
    const Location = useCountry().ToCountry

    return (
        <View style={Style.Home_container} >
            <View style={Style.header}>
                <View style={{ marginLeft: 20, }}>
                    <Current_svg />
                </View>
                <Text style={Style.coutrytext}>
                    {Current_Country}
                </Text>

                <View style={Style.api}>
                    <Text style={Style.apitxt}>API CALL Time : {apiTime}</Text>
                </View>
            </View>
            <ScrollView style={Style.main}>
                <View style={Style.input}>
                    <View style={Style.inpLogo}>
                        <Search />
                    </View>
                    <TextInput
                        placeholder="Search Country"
                        style={Style.inp}
                        placeholderTextColor="#fff"
                    ></TextInput>
                </View>
                <TouchableOpacity style={Style.button}>
                    <Text style={Style.buttontxt}>Search</Text>
                </TouchableOpacity>
                <View style={Style.current_block}>
                    <Loc />
                    <Text style={{ color: "#fff", marginTop: 5, fontSize: 18, }}>{Location}</Text>
                </View>
                <View style={Style.status_svg}>
                    {SVGS[1]['few clouds'][1]}
                </View>
                <Text style={Style.type}>Night Cloudy</Text>
            </ScrollView>
        </View>
    )
}

export default Home