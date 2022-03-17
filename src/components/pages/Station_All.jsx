import { useContext, useEffect, useState } from "react";

// Animation
import { motion } from "framer-motion";
import Animation from "../../common/Animation";

// Context
import { AppContext } from "../../Context/Context";

// Common
import { callAPI } from "../../common/common";
import { Form, Pagination } from "react-bootstrap";

export default function Station_All() {
	// Context
	const { contextDispatch } = useContext(AppContext);

	// All Stations hooks
	const [searchStr, setSearchStr] = useState("");
	const triggerGetAll = () => setRandom(Math.random());
	const [random, setRandom] = useState(0);
	const [dataArr, setDataArr] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(50);
	const [total, setTotal] = useState(0);

	// init component
	useEffect(() => {
		// set headings, title
		contextDispatch({
			type: "SET_PAGE_TITLE",
			payload: "All Stations",
		});
		contextDispatch({
			type: "SET_ACTIVE_PAGE_HEAD",
			payload: "All Stations",
		});

		// get stations
		const getAllStation = async () => {
			setDataArr(null);
			const response = await callAPI({
				URL: "stations/all?page=" + currentPage + "&limit=" + limit + "&search=" + searchStr,
				abort: true,
			});
			if (response.status !== 200 && response.status !== 404) return;
			setTotal(response.total);
			setDataArr(response.status === 200 ? response.data : []);
		};
		getAllStation();

		// Unmount Component
		return () => {
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: true,
			});
		};
	}, [currentPage, limit, random, searchStr, contextDispatch]);

	return (
		<>
			<div className="page-wrapper station-all">
				<div className="page-content-wrapper">
					<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
						<div className="card">
							<div className="card-body">
								<div className="card-head">
									<div className="row">
										<div className="col-lg-6">
											<Form.Control type="text" placeholder="Search" />
										</div>
										<div className="col-lg-6">
											<div className="pagination">
												<Pagination>
													<Pagination.Prev />
													<Pagination.Item>10 - 10 of 200</Pagination.Item>
													<Pagination.Next />
												</Pagination>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
}
