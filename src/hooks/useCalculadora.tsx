import { useState, useRef } from 'react';

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {

    const [numeroAnterior, setNumeroAnterior] = useState('0')
    const [numero, setNumero] = useState('0')

    const ultimaOperacion = useRef<Operadores>()

    const limpiar = () => {
        setNumero('0')
        setNumeroAnterior('0')
    }

    const armarNumero = (numeroTexto: String) => {
        // no aceptar doble punto
        if (numero.includes('.') && numeroTexto === '.') return

        if (numero.startsWith('0') || numero.startsWith('-0')) {
            console.log("veamos")
            console.log(numeroTexto)

            // punto decimal
            if (numeroTexto === '.') {
                setNumero(numero + numeroTexto)  

            // evaluar si hay otro cero y hay punto   
            } else if(numeroTexto === '0' && numero.includes('.')) {
                setNumero(numero + numeroTexto)  
                // si es diferente de cero y no tiene punto
            } else if(numeroTexto != '0' && !numero.includes('.')){
                setNumero( `${numeroTexto}` )
                // evitar el 000.0
            } else if(numeroTexto === '0' && !numero.includes('.')){
                setNumero(numero)
            } else {
                setNumero(numero + numeroTexto)  
            }
        }else{
            setNumero( numero + numeroTexto)
        }

    }

    const positivoNegativo = () => {
        if (numero.includes('-')) {
            setNumero( numero.replace('-',''))
        }else {
            setNumero('-' + numero)
        }
    }
    const btnDelete = () => {
        let negativo = ''
        let numberTemp = numero
        if (numero.includes('-')) {
            negativo = '-'
            numberTemp = numero.substr(1)
        }

        if (numberTemp.length > 1) {
            setNumero(negativo + numberTemp.slice(0,-1))
        } else {
            setNumero('0')
        }
    }

    const cambiarNumeroPorAnterior = () => {
        if(numero.endsWith('.')){
            setNumeroAnterior(numero.slice(0,-1))
        }else{
            setNumeroAnterior(numero)
        }
        setNumero('0')
    }

    const btnDividir = () => {
        cambiarNumeroPorAnterior()
        ultimaOperacion.current = Operadores.dividir
    }

    const btnMultiplicar = () => {
        cambiarNumeroPorAnterior()
        ultimaOperacion.current = Operadores.multiplicar
    }

    const btnRestar = () => {
        cambiarNumeroPorAnterior()
        ultimaOperacion.current = Operadores.restar
    }

    const btnSumar = () => {
        cambiarNumeroPorAnterior()
        ultimaOperacion.current = Operadores.sumar
    }

    const calcular = () => {
        const num1 = Number ( numero )
        const num2 = Number ( numeroAnterior )
        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero(`${ num1 + num2}`)
                setNumeroAnterior('0')
                break;
            case Operadores.restar:
                setNumero(`${ num2 - num1}`)
                setNumeroAnterior('0')
                break;
            case Operadores.multiplicar:
                setNumero(`${ num1 * num2}`)
                setNumeroAnterior('0')
                break;
            case Operadores.dividir:
                setNumero(`${ num2 / num1}`)
                setNumeroAnterior('0')
                break;
        }
        setNumeroAnterior('0')
    }

    return {
        numeroAnterior,
        numero,
        limpiar,
        positivoNegativo,
        btnDelete,
        btnDividir,
        armarNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
    }

}