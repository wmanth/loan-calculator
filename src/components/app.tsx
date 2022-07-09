import './app.css';
import { Col, Form, Row } from 'react-bootstrap'
import ResultTable from './result-table';
import { useEffect, useState } from 'react';
import { Month } from '../types';
import Summary from './summary';

const defaultNumberOfYears = 10

export default function App() {
	const [totalLoan, setTotalLoan] = useState(0)
	const [numberOfYears, setNumberOfYears] = useState(defaultNumberOfYears)
	const [interestRate, setInterestRate] = useState(0)
	const [initialAmortizationRate, setInitialAmortizationRate] = useState(0)
	const [data, setData] = useState<Month[]>([])

	const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTotalLoan(+e.target.value)
	}

	const handleNumberOfYearsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setNumberOfYears(+e.target.value)
	}

	const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInterestRate(+e.target.value)
	}

	const handleInitialAmortizationRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInitialAmortizationRate(+e.target.value)
	}

	useEffect(() => {
		const numberOfMonths = numberOfYears * 12
		const monthlyRate = (totalLoan * initialAmortizationRate + totalLoan * interestRate) / 100 / 12
		let allMonths = new Array<Month>(numberOfMonths)
		let lastMonth: Month = {
			amortizationAbsolute: 0,
			amortizationRelative: 0,
			amortizationTotal: 0,
			interestPaidAbsolute: 0,
			interestPaidTotal:0,
			loanRemaining: totalLoan
		}

		for (let i = 0; i < numberOfMonths; i++) {
			const interest = lastMonth.loanRemaining * interestRate / 100 / 12
			const amortization = monthlyRate - interest

			const thisMonth: Month = {
				amortizationAbsolute: amortization,
				amortizationRelative: amortization * 12 / totalLoan,
				amortizationTotal: lastMonth.amortizationTotal + amortization,
				interestPaidAbsolute: interest,
				interestPaidTotal: lastMonth.interestPaidTotal + interest,
				loanRemaining: lastMonth.loanRemaining - amortization
			}
			allMonths[i] = thisMonth
			lastMonth = thisMonth
		}
		setData(allMonths)
	}, [totalLoan, numberOfYears, interestRate, initialAmortizationRate])

	return(
		<Form>
			<Row className="mb-3">
				<Form.Group as={ Col }>
					<Form.Label>Total Loan</Form.Label>
					<Form.Control type="number" placeholder="Enter ammount in €" onChange={ handleTotalChange }/>
				</Form.Group>
				<Form.Group as={ Col}>
					<Form.Label>Duration</Form.Label>
					<Form.Select onChange={ handleNumberOfYearsChange } defaultValue={ defaultNumberOfYears }>
						<option value={5}>5 years</option>
						<option value={10}>10 years</option>
						<option value={15}>15 years</option>
						<option value={20}>20 years</option>
					</Form.Select>
				</Form.Group>
			</Row>
			<Row className="mb-3">
				<Form.Group as={Col}>
					<Form.Label>Interest Rate in %</Form.Label>
					<Form.Control type="number" min="0" max="100" step="0.01" placeholder="Enter your interest rate in %" onChange={ handleInterestRateChange }/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Initial Ammortization Rate in %</Form.Label>
					<Form.Control type="number" min="0" max="100" step="0.01" placeholder="Enter your initial rate in %" onChange={ handleInitialAmortizationRateChange }/>
				</Form.Group>
			</Row>

			<Summary data={ data } />

			<ResultTable data={ data } />
		</Form>
	)
}
