import React from "react";
import { Table } from "react-bootstrap";
import { currencyFormatter } from "../formatter";
import { Month } from "../types";

interface SummaryProps {
	data: Month[]
}

export default function Summary(props: SummaryProps) {
	const firstMonth = props.data[0]
	const lastMonth = props.data[props.data.length-1]

	return( firstMonth && lastMonth ?
			<Table className="d-sm-inline-flex" size="sm" borderless>
				<tbody>
					<tr>
						<th>Montly Rate:</th>
						<td>{ currencyFormatter.format(firstMonth.amortizationTotal + firstMonth.interestPaidTotal) }</td>
					</tr>
					<tr>
						<th>Remaining:</th>
						<td>{ currencyFormatter.format(lastMonth.loanRemaining) }</td>
					</tr>
					<tr>
						<th>Paid in Total:</th>
						<td>{ currencyFormatter.format(lastMonth.amortizationTotal + lastMonth.interestPaidTotal) }</td>
					</tr>
				</tbody>
			</Table>
		: <React.Fragment />
	)
}
