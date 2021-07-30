
class TeeGraph {
    // typing
    data: Array<number>;
    date: Array<string>;
    width: number;
    thickness: number;
    offsets: Array<number>;

    constructor(config, width, thickness) {

        // set chart attributes
        this.data = config.data.map(d => d.value);
        this.date = config.data.map(d => d.date);
        this.width = width;
        this.thickness = thickness;

        // set offsets
        this.offsets = [0];
    }

    reduceData(data: Array<number>): Array<Array<number>> {
            // const width = window.innerWidth;

            // data = data.sort((a, b) => a-b);
            const sumOfData: number = data.length !== 0 ? data.reduce((total, current) => total + current) : 0;

            const proportionalData: Array<number> = data.map(unitData => {
                return Math.floor((unitData/sumOfData)*this.width);
            });


            const sumOfProportion: number = data.length !== 0 ? data.reduce((total, current) => total + current) : 0;
            const percentileData = data.map(unitData => {
                return Math.floor((unitData/sumOfProportion)*100);
            })

            console.table([proportionalData, percentileData]);

            let ard__: Array<number> = data.map(unitData => {
                return Math.floor((unitData/sumOfProportion)*sumOfData);
            });

            return [proportionalData, percentileData, ard__];
        }



    randomColor(): string {
        let randomRed: number = Math.floor(Math.random() * 255);
        let randomGreen: number = Math.floor(Math.random() * 255);
        let randomBlue: number = Math.floor(Math.random() * 255);
        return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    }

    renderSVG(svgText) {
        let svgEl = `
            <svg id="chart" width="${this.width}" height="${this.thickness}" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
                ${svgText}
            </svg>
        `;

        return svgEl;
    }

    prepareRects(): string {
        // the rects array
        let rects__: any = [];
        let dataPercentile = this.reduceData(this.data)[0];
        for (let d: number = 0; d < this.data.length; d++) {
            let color = this.randomColor();
            let offsetsSum: number = this.offsets.reduce((total, current) => total + current);
            rects__.push(`<rect x="${this.offsets[this.offsets.length - 1]}" y="0" width="${dataPercentile[d]}%" height="10%" fill="${color}" />\n`);
            this.offsets.push(dataPercentile[d] + offsetsSum);
            console.log(this.offsets);

        }

        rects__ = rects__.join("");

        const rects: string = `<g>\n ${rects__} </g>`;

        return rects;

    }

    prepareLabels(): string {
        // chart labels container
        let chartLabels__: any = [];
        let chartLabels: any;
        for (let d = 0; d < this.data.length; d++) {
            // let offsetsSum = offsets.reduce((total, current) => total + current);
            chartLabels__.push(`<text font-size="50%" font-family="sans-serif" x="${this.offsets[d] + d*8}" y="25" fill="rgb(0,0,0)"> ${this.data[d]} </text>\n`);

            /* `            
            <text font-size="50%" font-family="sans-serif" text-align="center" x="${this.offsets[d] + d*this.offsets[d]/40}" y="35" fill="rgb(0,0,0)"> ${this.date[d]} </text>` */
        }

        chartLabels__ = chartLabels__.join("");

        chartLabels = `<g>\n ${chartLabels__} </g>`;

        return chartLabels;
    }

    render(): any {
        let rects: string = this.prepareRects();
        let labels: string = this.prepareLabels();

        let chartContents: string = `${rects} ${labels}`;

        let svgResult: any = this.renderSVG(chartContents);

        // initialize container element
        const container: HTMLDivElement = document.createElement("div");
        container.innerHTML = svgResult;

        return svgResult;
    }
}

export { TeeGraph }