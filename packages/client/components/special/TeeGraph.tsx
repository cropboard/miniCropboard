import React, { FunctionComponent, useEffect, useState } from "react";

import { TeeGraph as tg } from "../../utils/teegraph";

interface TeeGraphProps {
    data: Array<any>
    value: string
    width: number
    thickness: number
    cardWidth: number
}

const TeeGraph: FunctionComponent<TeeGraphProps> = ({ data, value, width, thickness, cardWidth }) => {
    // const color: string = randomColor();
    const dataValue: Array<any> = data.map(d => ({ value: d[value], date: "" }));

    let width_: number;
    useEffect(() => {
        width_ = window.innerWidth - 100;
    }, []);

    const chart: tg = new tg({ data: dataValue }, width, thickness * 2);

    const result: any = chart.render();
    // console.log(`${result}`)

    // console.log(`Data Value -> ${dataValue}`)

    return (
        <div style={{ width: `${width}px` }} dangerouslySetInnerHTML={{ __html: result }}>

        </div>
    )
}

export default TeeGraph;