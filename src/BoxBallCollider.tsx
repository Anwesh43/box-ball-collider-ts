import React from 'react'
import BBCProps from './BBCProps'
import withContext from './withContext'
import { useStyle } from './hooks'

const BoxBallCollider : React.FC<BBCProps> = (props : BBCProps) => {
    const {boxStyle, ballStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div style = {boxStyle()} onClick = {() => props.onClick()}>
            </div>
            <div style = {ballStyle()}>
            </div>
        </React.Fragment>
    )
} 
export default BoxBallCollider