import React, {ReactElement} from "react";
import {ChartCanvas, Chart} from "react-stockcharts";
import {
    CandlestickSeries,
} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";
import {timeFormat} from "d3-time-format";
import {format} from "d3-format";

import {discontinuousTimeScaleProvider} from "react-stockcharts/lib/scale";
import {fitWidth} from "react-stockcharts/lib/helper";
import {HoverTooltip} from "react-stockcharts/lib/tooltip";
import {
    EdgeIndicator,
} from "react-stockcharts/lib/coordinates"


const dateFormat = timeFormat("%d-%m-%Y %H:%M");
const numberFormat = format(".4f");

const CandlesChart = fitWidth(({}, {}): ReactElement => {
    const xScaleProvider = discontinuousTimeScaleProvider
        .inputDateAccessor(d => d.date);
    const {
        data,
        xScale,
        xAccessor,
        displayXAccessor,
    } = xScaleProvider(staticCandles);

    return (
        <ChartCanvas
            height={600}
            width={1000}
            ratio={1}
            margin={{left: 70, right: 70, top: 20, bottom: 30}}
            type={"svg"}
            data={data}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}>
            <Chart id={1} yExtents={d => [d.high, d.low]} padding={{top: 10, bottom: 20}}>
                <XAxis axisAt="bottom" orient="bottom" tickStroke="#FFFFFF"/>
                <YAxis axisAt="right" orient="right" ticks={5} tickStroke="#FFFFFF"/>
                <HoverTooltip
                    tooltipContent={tooltipContent([])}
                    fontSize={15}
                />
                <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                               yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#DB0000"}/>
                <CandlestickSeries/>
            </Chart>
        </ChartCanvas>);
});

const tooltipContent = (ys) => {
    return ({currentItem, xAccessor}) => {
        return {
            x: dateFormat(xAccessor(currentItem)),
            y: [
                {
                    label: "Open",
                    value: currentItem.open && numberFormat(currentItem.open)
                },
                {
                    label: "High",
                    value: currentItem.high && numberFormat(currentItem.high)
                },
                {
                    label: "Low",
                    value: currentItem.low && numberFormat(currentItem.low)
                },
                {
                    label: "Close",
                    value: currentItem.close && numberFormat(currentItem.close)
                }
            ]
                .concat(
                    ys.map(each => ({
                        label: each.label,
                        value: each.value(currentItem),
                        stroke: each.stroke
                    }))
                )
                .filter(line => line.value)
        };
    };
};

const staticCandles: CandleData[] = [
    {
        date: new Date(),
        open: 100,
        high: 120,
        low: 80,
        close: 110,
        volume: 5
    },
    {
        date: new Date(),
        open: 110,
        high: 140,
        low: 90,
        close: 130,
        volume: 5
    },
    {
        date: new Date(),
        open: 130,
        high: 175,
        low: 125,
        close: 170,
        volume: 5
    },
    {
        date: new Date(),
        open: 170,
        high: 250,
        low: 170,
        close: 235,
        volume: 5
    },
    {
        date: new Date(),
        open: 235,
        high: 235,
        low: 150,
        close: 160,
        volume: 5
    },
    {
        date: new Date(),
        open: 160,
        high: 160,
        low: 130,
        close: 140,
        volume: 5
    },
    {
        date: new Date(),
        open: 140,
        high: 140,
        low: 90,
        close: 95,
        volume: 5
    },
    {
        date: new Date(),
        open: 95,
        high: 95,
        low: 60,
        close: 65,
        volume: 5
    },
    {
        date: new Date(),
        open: 65,
        high: 90,
        low: 65,
        close: 80,
        volume: 5
    },
    {
        date: new Date(),
        open: 80,
        high: 120,
        low: 80,
        close: 100,
        volume: 5
    },
];

export type CandlesChartProps = {
    Candles: Array<CandleData>
}

export type CandlesChartState = {
    Candles: Array<CandleData>
}
export type CandleData = {
    date: Date,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number
}

export default CandlesChart;
