import React, { FunctionComponent, useEffect, useState } from "react";

import { TeeGraph as tg } from "../../utils/teegraph";

interface TeeGraphProps {
    data: Array<any>
    value: string
    width: number
    thickness: number
}

const TeeGraph: FunctionComponent<TeeGraphProps> = ({ data, value, width, thickness }) => {
    // const color: string = randomColor();
    const dataValue: Array<any> = data.map(d => ({ value: d[value], date: "" }));

    const chart: tg = new tg({ data: dataValue }, width, thickness);

    const result: any = chart.render();
    console.log(`${result}`)

    console.log(`Data Value -> ${dataValue}`)

    return (
        <div dangerouslySetInnerHTML={{ __html: result }}>

        </div>
    )
}

export default TeeGraph;