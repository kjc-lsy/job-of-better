import {Line} from "react-chartjs-2";

const Chart = require("chart.js");

const currentDate = new Date();
const oneDay = 24 * 60 * 60 * 1000;
const todayBefore = new Date(currentDate.getTime());
const oneDayBefore = new Date(currentDate.getTime() - oneDay);
const twoDayBefore = new Date(currentDate.getTime() - oneDay * 2);
const threeDayBefore = new Date(currentDate.getTime() - oneDay * 3);
const fourDayBefore = new Date(currentDate.getTime() - oneDay * 4);
const fiveDayBefore = new Date(currentDate.getTime() - oneDay * 5);
const sixDayBefore = new Date(currentDate.getTime() - oneDay * 6);

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    //${year}-
    return `${year}-${month}-${day}`;
}


const lineSet = (canvasId ,data) => {
    /*const canvas = document.getElementById(canvasId);*/
    let dateArray = [formatDate(fourDayBefore), formatDate(threeDayBefore), formatDate(twoDayBefore), formatDate(oneDayBefore), formatDate(currentDate)];

    const dataArray = dateArray.map(date => {
        const found = data.find(item => item.regDate === date);
        return found ? found.regCount : 0;
    });

    console.log(data);

    /*let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors*/

    return {
        labels: dateArray,
        datasets: [
            {
                label: "일별 신청자 수",
                fill: true,
                //backgroundColor: gradientStroke,
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: dataArray,
                backgroundColor: [
                    'rgba(0, 0, 0, 0)'
                ],
            },
        ],
    };

}

const options = {
    maintainAspectRatio: false,
    legend: {
        display: false,
    },
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
    },
    responsive: true,
    scales: {
        yAxes: [{
            barPercentage: 1.6,
            gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.0)",
                zeroLineColor: "transparent",
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 10,
                padding: 20,
                fontColor: "#9a9a9a",
            },
        }],
        xAxes: [{
            barPercentage: 1.6,
            gridLines: {
                drawBorder: false,
                color: "rgba(29,140,248,0.1)",
                zeroLineColor: "transparent",
            },
            ticks: {
                padding: 20,
                fontColor: "#9a9a9a",
            },
        }],
    },
}

export default function LineChart({canvasId,data}) {
    return (
        <Line
            id={canvasId}
            data={lineSet(canvasId,data)}
            options={options}
            width="400px"
            height="200px"
        />
    )
}