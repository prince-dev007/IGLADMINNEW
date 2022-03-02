const PageHead = ({ title = "pageTitle" }) => {
	return (
		<div className="row">
			<div className="col-12 d-flex align-items-center">
				<div>
					<h4 style={{ fontSize: "32px", fontWeight: 30 }}>{title}</h4>
				</div>
				<div className="spinner-border text-primary ml-3 " role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		</div>
	);
};
export default PageHead;
