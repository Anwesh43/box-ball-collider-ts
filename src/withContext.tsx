import React from 'react'
import BBCProps from './BBCProps'
import {useAnimatedScale, useDimension} from './hooks'

const withContext = (MainComponent: React.FC<BBCProps>) : React.FC<any> => {
    return () => {
        const {scale, start : onClick} = useAnimatedScale()
        const {w, h} = useDimension()
        const props : BBCProps = {
            w, 
            h, 
            scale,
            onClick
        }
        return (
            <MainComponent {...props}>
            </MainComponent>
        )
    }
}

export default withContext