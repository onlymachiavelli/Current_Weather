import React, { } from 'react'
import {
    View, Text, ScrollView, TextInput
} from 'react-native'
import { Style } from './style'
import { Current_svg, Search } from './svg'
import DetectGeo from './Geo'
let Current_Country = DetectGeo()
Current_Country += (Current_Country === "Tunisia" || "tunis" || "Tunis" || "tunisia" ? " Lkalba" : "")
const Checkinp = (value) => {
    let res = value[0].toUpperCase()
    for (let i = 1; i < value.length; i++) res += value[i].toLowerCase()
    return res
}

const Home = () => {
    return (
        <View style={Style.Home_container} >
            <View style={Style.header}>
                <View style={{ marginLeft: 20, }}>
                    <Current_svg />
                </View>
                <Text style={Style.coutrytext}>
                    {Current_Country}
                </Text>
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
            </ScrollView>
        </View>
    )
}

export default Home