import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { styles } from '../theme/appTheme'

interface Props {
    texto: String
    color?: String
    ancho?: boolean
    accion: ( numeroTexto: String ) => void
}

const BotonCalc = (props: Props) => {

    const { 
        texto, 
        color = '#2d2d2d', 
        ancho = false ,
        accion,
    } = props

    return (
        <TouchableOpacity
            onPress={ () => accion( texto ) }
        >
            <View 
                style={[
                    styles.boton,
                    {
                        backgroundColor: `${color}`,
                        width: ancho ? 140 : 60
                    }
                ]}
            >
                <Text 
                    style={{
                        ...styles.botonTexto,
                        color: color === '#9b9b9b' ? 'black' : 'white'
                    }}
                >
                    { texto }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default BotonCalc
