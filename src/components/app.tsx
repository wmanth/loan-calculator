import './app.css';
import { Form } from 'react-bootstrap'
import ResultTable from './result-table';
import { useEffect, useState } from 'react';
import { Month } from '../types';

export default function App() {
	const [totalLoan, setTotalLoan] = useState(0)
	const [numberOfMonths, setNumberOfMonths] = useState(0)
	const [interestRate, setInterestRate] = useState(0)
	const [monthlyRate, setMonthlyRate] = useState(0)
	const [data, setData] = useState<Month[]>([])

	const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTotalLoan(parseInt(e.target.value))
	}

	const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNumberOfMonths(parseInt(e.target.value))
	}

	const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInterestRate(parseFloat(e.target.value))
	}

	const handleFixRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMonthlyRate(parseInt(e.target.value))
	}

	useEffect(() => {
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
			const interest = lastMonth.loanRemaining * interestRate / 100.0 / 12
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
	}, [totalLoan, numberOfMonths, interestRate, monthlyRate])

	return(
		<Form>
			<Form.Group className="mb-3">
				<Form.Label>Total Loan</Form.Label>
				<Form.Control type="number" placeholder="Enter ammount in €" onChange={ handleTotalChange }/>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Duration</Form.Label>
				<Form.Control type="number" placeholder="Duration in months" onChange={ handleMonthsChange }/>
				</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Interest Rate in %</Form.Label>
				<Form.Control type="number" min="0" max="100" step="0.01" placeholder="Enter your interest rate in %" onChange={ handleInterestRateChange }/>
				</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Monthly Payback</Form.Label>
				<Form.Control type="number" placeholder="Enter your monthly payback" onChange={ handleFixRateChange } />
			</Form.Group>

			<ResultTable data={ data } />
		</Form>
	)
}
