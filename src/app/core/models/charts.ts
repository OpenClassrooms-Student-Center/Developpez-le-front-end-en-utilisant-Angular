export interface ChartsPie {
    extra: number,
    name: string,
    value: number
}

export interface ChartsLine {
    name: string,
    series: Array<ChartsLineSeries>
}

export interface ChartsLineSeries {
    name: string,
    value: number
}