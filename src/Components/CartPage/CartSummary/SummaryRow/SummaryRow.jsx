const SummaryRow = ({ title, value }) => {
  return (
    <div className="summary-row">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}

export default SummaryRow