import React, { useState, useEffect } from 'react'
import {
    View, Text, ScrollView, TextInput, TouchableOpacity
} from 'react-native'
import { Style } from './style'
import { Current_svg, Search, Loc, ShowerRain, ClearSkyDay, ClearSkyNight, Snow, Thunderstorm, FewCloudsDay, FewCloudsNight, ScatteredClouds, BrokenClouds, Mist, Rain, NightCloudy , Humidity, Wind} from './svg'
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
    0:{title:"clear sky",Svv:[<ClearSkyDay/>, <ClearSkyNight/>]},
    1:{title:"few clouds",Svv:[<FewCloudsDay/>, <FewCloudsNight/>]},
    2:{title:"scattered clouds",Svv:<ScatteredClouds/>},
    3:{title:"broken clouds",Svv:<BrokenClouds/>},
    4:{title:"shower rain" ,Svv:<ShowerRain/>},
    5:{title:"rain",Svv:<Rain/>},
    6:{title:"thunderstorm",Svv:<Thunderstorm/>},
    7:{title:"snow",Svv:<Snow/>},
    8:{title:"mist",Svv:<Mist/>}
}

const ReturnSVG = (type:string, icon:string) =>{
    let select
    for (let i = 0; i<8;i++){
        if(SVGS[i].title === type  ){
            select = i  
            break
        }
    }
    if(typeof(SVGS[select].Svv) === "object") {
        if(IsItAm(icon)) return SVGS[select].Svv[0]
        else return SVGS[select].Svv[1]
    }
    else{
        return SVGS[select].Svv
    }
    
}
const APICALLTIME = () =>{
    let Time
    let date = new Date()
    Time = (date.getHours() < 10 ? String(0+date.getHours()) : String(date.getHours())) + ":" + (date.getMinutes() < 10 ? String(0+date.getMinutes()) : String(date.getMinutes()))
    return Time
}
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
    
    const {ToCountry, setToCountry} = useCountry()

    const [WeatherStats, setWeatherStats] = useState({})
    useEffect(()=>{
        if (ToCountry) {
            GetWeather(ToCountry).then(
                Response =>{
                    setWeatherStats(
                        {
                            Temp:Response.main.temp,
                            Hum:Response.main.humidity,
                            Wind:Response.wind.speed,
                            Description:Response.weather[0].description,
                            Icon:Response.weather[0].icon,
                        }
                    )
                }
            )
        }
        
    }, [ToCountry])
    return {ToCountry, setToCountry, WeatherStats, setWeatherStats}
}

const Home = () => {
    const { WeatherStats, } = useWeather()
    console.log({ WeatherStats})
    let [apiTime, setapiTime] = useState(APICALLTIME())
    let Current_Country = useCountry().Currentcountry
    Current_Country += (Current_Country === "Tunisia" ? " Lkalba" : "")
    const Location = useCountry().ToCountry
    let SVVGG = ReturnSVG(WeatherStats.Description, WeatherStats.Icon)


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
                    {
                        
                        SVVGG
                    }
                </View>
                <Text style={Style.type}>Night Cloudy</Text>
                <View style={Style.descicons}> 
                    <View style={Style.d}>
                        <Humidity/>
                        <Text  style={Style.dtext}>Humidity: {WeatherStats?.Hum + " %"}</Text>
                    </View>
                    <View style={Style.d}>
                        <Wind/>
                        <Text  style={Style.dtext}>Wind : {WeatherStats?.Wind + "KM/H"}</Text> 
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Home