import {Pie} from "react-chartjs-2";

const pieSet = (data,label) => {
        return {
            labels: ['미작성', '작성완료', '작성중'],
            datasets: [
                {
                    label: label,
                    data:data,
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        }
    }

const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            labels: {
                render: 'percentage',
                fontColor: ['red', 'blue', 'yello'],
                precision: 2,
                fontsize: 15
            },

        },
        legend:{
            display: true,
            position: 'right',
        },
        /*pieceLabel: {
          mode:"label",
          fontSize: 11,
          fontStyle: 'bold',
          fontColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
        }*/
}

export default function PieChart({data,label}) {
    return (
        <Pie
            data={pieSet(data,label)}
            options={options}
            width="400px"
            height="200px"
        />
    )
}