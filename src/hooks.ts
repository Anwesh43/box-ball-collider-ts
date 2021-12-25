import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.01
const delay : number = 20 
export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)
const parts : number = 2 
const sizeFactor : number = 11.2 
export const useStyle = (w : number, h : number, scale : number) => {
    const sc1 : number = divideScale(sinify(scale), 0, parts)
    const sc2 : number = divideScale(sinify(scale), 1, parts)
    const position  = 'absolute'
    const background = 'indigo'
    const size : number = Math.min(w, h) / sizeFactor 
    const midX : number = w / 2 
    const midY : number = h / 2 
    return {
        boxStyle() : CSSProperties {
            const left : string = `${midX + (midX - size) * sc2}px`
            const top : string = `${midY - size / 2}px`
            const width = `${size}px`
            const height = `${size}px`
            const transform = `rotate(${180 * sc2}deg)`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                background, 
                transform 
            }
        },
        ballStyle() : CSSProperties {
            const left : string = `${-size + midX * sc1}px`
            const top : string = `${midY - size / 2}px`
            const width = `${size}px`
            const height = `${size}px`
            const borderRadius = `50%`
            return {
                position, 
                left, 
                top, 
                background, 
                width, 
                height, 
                borderRadius 
            }
        }
    }
}