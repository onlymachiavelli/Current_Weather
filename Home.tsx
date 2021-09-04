import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    View, Text, ScrollView, TextInput, TouchableOpacity
} from 'react-native'
import { Style } from './style'
import { Current_svg, Search, Loc, NightCloudy } from './svg'
import DetectGeo from './GeoAPI'








const Checkinp = (value:String) => {
    let res = value[0].toUpperCase()
    for (let i = 1; i < value.length; i++) res += value[i].toLowerCase()
    return res
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

    const [WeatherStats, setWeatherStats] = useState({
        Temp:String,
        Hum:String,
        Prec:String,
        Wind:String
    })
    

}

const Home = () => {
    
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
                    <Text style={Style.apitxt}>API CALL Time : 18.06</Text>
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
                    <NightCloudy />
                </View>
                <Text style={Style.type}>Night Cloudy</Text>
            </ScrollView>
        </View>
    )
}

export default Home