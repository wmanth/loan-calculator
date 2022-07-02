import { Table } from 'react-bootstrap'
import { Month } from '../types'

interface ResultTableProps {
	data: Month[]
}

const currencyFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
const percentFormatter = new Intl.NumberFormat('de-DE', { style: 'percent', minimumFractionDigits: 2})

export default function ResultTable(props: ResultTableProps) {
	return(
		<Table size="sm" striped bordered>
			<thead>
			<tr>
					<th rowSpan={2}>Month</th>
					<th colSpan={3} className="l1">Loan Amortization</th>
					<th colSpan={2} className="l1">Paid Interest</th>
					<th rowSpan={2}>Remaining Loan</th>
				</tr>
				<tr>
					<th>Absolute</th>
					<th>Rate</th>
					<th>Total</th>
					<th>Absolute</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>{ props.data.map((month, index) =>
					<tr key={ index }>
						<td>{ index+1 }</td>
						<td>{ currencyFormatter.format(month.amortizationAbsolute) }</td>
						<td>{ percentFormatter.format(month.amortizationRelative) }</td>
						<td>{ currencyFormatter.format(month.amortizationTotal) }</td>
						<td>{ currencyFormatter.format(month.interestPaidAbsolute) }</td>
						<td>{ currencyFormatter.format(month.interestPaidTotal) }</td>
						<td>{ currencyFormatter.format(month.loanRemaining) }</td>
					</tr>)}
			</tbody>
		</Table>
	)
}
