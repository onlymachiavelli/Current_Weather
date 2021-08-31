import React, { } from 'react'
import {
    View, Text, ScrollView
} from 'react-native'
import { Style } from './style'
import { Current_svg } from './svg'
import DetectGeo from './Geo'
let Current_Country = DetectGeo()
Current_Country += (Current_Country === "Tunisia" || "tunis" || "Tunis" || "tunisia" ? " Lkalba" : "")
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
        </View>
    )
}

export default Home