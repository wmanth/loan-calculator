import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Month } from '../types';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	plugins: {
		title: {
			display: true,
			text: 'Total Costs',
		},
	},
	responsive: true,
	interaction: {
		mode: 'index' as const,
		intersect: false,
	},
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
}

interface ChartProps {
	data: Month[]
}

export default function Chart(props: ChartProps) {
	const labels = props.data.map( (_, index) => index+1 )
	const data = {
		labels,
		datasets: [
			{
				label: 'Loan',
				data: props.data.map( (month, index) => month.loanRemaining ),
				backgroundColor: 'rgb(53, 162, 235)',
				stack: 'Stack 0',
			},
			{
				label: 'Interest',
				data: props.data.map( (month, index) => month.interestPaidTotal ),
				backgroundColor: 'rgb(255, 99, 132)',
				stack: 'Stack 0',
			},
			{
				label: 'Amortized',
				data: props.data.map( (month, index) => month.amortizationTotal ),
				backgroundColor: 'rgb(75, 192, 192)',
				stack: 'Stack 0',
			},
		],
	}

	return <Bar options={ options } data={ data } />;
}
