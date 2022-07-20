import './app.css';
import { useSearchParams } from 'react-router-dom'
import ResultTable from './result-table';
import React, { useEffect, useState } from 'react';
import { Month } from '../types';
import Summary from './summary';
import Chart from './chart';
import LoanInput from './loaninput';

const defaultNumberOfYears = 10
const kTotalLoanParam = "loan"
const kNumberOfYearsParam = "years"
const kInterestRateParam = "interest"
const kInitialAmortizationRateParam = "rate"

export default function App(props: any) {
	const [searchParams, setSearchParams] = useSearchParams();

	const numberFromUrlParam = (param: string, _default = 0) => {
		const value = searchParams.get(param) ?? ""
		return Number(value) || _default
	}

	const [totalLoan, setTotalLoan] = useState(numberFromUrlParam(kTotalLoanParam))
	const [numberOfYears, setNumberOfYears] = useState(numberFromUrlParam(kNumberOfYearsParam, defaultNumberOfYears))
	const [interestRate, setInterestRate] = useState(numberFromUrlParam(kInterestRateParam))
	const [initialAmortizationRate, setInitialAmortizationRate] = useState(numberFromUrlParam(kInitialAmortizationRateParam))
	const [data, setData] = useState<Month[]>([])

	const changeTotalLoan = (value: number) => {
		searchParams.set(kTotalLoanParam, value.toString())
		setSearchParams(searchParams)
		setTotalLoan(value)
	}

	const changeNumberOfYears = (value: number) => {
		searchParams.set(kNumberOfYearsParam, value.toString())
		setSearchParams(searchParams)
		setNumberOfYears(value)
	}

	const changeInterestRate = (value: number) => {
		searchParams.set(kInterestRateParam, value.toString())
		setSearchParams(searchParams)
		setInterestRate(value)
	}

	const changeInitialAmortizationRate = (value: number) => {
		searchParams.set(kInitialAmortizationRateParam, value.toString())
		setSearchParams(searchParams)
		setInitialAmortizationRate(value)
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
		<React.Fragment>
			<LoanInput
				totalLoan={ totalLoan } changeTotalLoan={ changeTotalLoan }
				numberOfYears={ numberOfYears } changeNumberOfYears={ changeNumberOfYears }
				interestRate={ interestRate } changeInterestRate={ changeInterestRate }
				initialAmortizationRate= { initialAmortizationRate } changeInitialAmortizationRate={ changeInitialAmortizationRate } />
			<Summary data={ data } />
			<Chart data={ data } />
			<ResultTable data={ data } />
		</React.Fragment>
	)
}
