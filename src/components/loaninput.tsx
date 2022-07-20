import { Col, Form, Row } from "react-bootstrap";

interface LoanInputProps {
	totalLoan: number
	numberOfYears: number
	interestRate: number
	initialAmortizationRate: number
	changeTotalLoan(loan: number): void
	changeNumberOfYears(numberOfYears: number): void
	changeInterestRate(interestRate: number): void
	changeInitialAmortizationRate(initialAmortizationRate: number): void
}

export default function LoanInput(props: LoanInputProps) {
	const handleTotalLoanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.changeTotalLoan(+e.target.value)
	}

	const handleNumberOfYearsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.changeNumberOfYears(+e.target.value)
	}

	const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.changeInterestRate(+e.target.value)
	}

	const handleInitialAmortizationRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.changeInitialAmortizationRate(+e.target.value)
	}

	return(
		<Form>
			<Row className="mb-3">
				<Form.Group as={ Col }>
					<Form.Label>Total Loan</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter ammount in €"
						defaultValue={ props.totalLoan }
						onChange={ handleTotalLoanChange }/>
				</Form.Group>
				<Form.Group as={ Col}>
					<Form.Label>Duration</Form.Label>
					<Form.Select onChange={ handleNumberOfYearsChange } defaultValue={ props.numberOfYears }>
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
					<Form.Control
						placeholder="Enter your interest rate in %"
						type="number"
						min="0" max="100" step="0.01"
						defaultValue={ props.interestRate}
						onChange={ handleInterestRateChange }/>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Initial Ammortization Rate in %</Form.Label>
					<Form.Control
						placeholder="Enter your initial rate in %"
						type="number"
						min="0"
						max="100"
						step="0.01"
						defaultValue={ props.initialAmortizationRate }
						onChange={ handleInitialAmortizationRateChange }/>
				</Form.Group>
			</Row>
		</Form>
	)
}
