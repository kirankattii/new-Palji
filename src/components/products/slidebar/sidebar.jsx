
import React, { useEffect, useState } from "react"
import "../../../pages/CSS/product/sidebar.css"
import Allproduct from "../allproduct"

import { useNavigate } from "react-router-dom"
import { makeApi } from "../../../api/callApi"
import { IoSearch } from "react-icons/io5"
import FilterDropdown from "./FilterPopup"
import { RiArrowDropDownLine } from "react-icons/ri"

const ProductSidebar = () => {
	const history = useNavigate()

	const [minPrice, setMinPrice] = useState(0)
	const [maxPrice, setMaxPrice] = useState(5000)
	const [categories, setCategories] = useState([])
	const [search, setSearch] = useState("")
	const [category, setCategory] = useState("")
	const [showDropdown, setShowDropdown] = useState(false)

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await makeApi("/api/get-all-categories", "GET")
				if (response.status === 200) {
					setCategories(response.data.categories)
				}
			} catch (error) {
				console.log("Error fetching categories:", error)
			}
		}
		fetchCategories()
	}, [])

	const handleApplyFilter = (filterData) => {
		setMinPrice(Number(filterData.minPrice))
		setMaxPrice(Number(filterData.maxPrice))
		setCategory(filterData.selectedCategory)
	}

	const handleLogout = () => {
		localStorage.removeItem("token")
		history("/auth/login")
	}

	const handleMinPriceChange = (e) => {
		const value = Number(e.target.value)
		if (value <= maxPrice) {
			setMinPrice(value)
		}
	}

	const handleMaxPriceChange = (e) => {
		const value = Number(e.target.value)
		if (value >= minPrice) {
			setMaxPrice(value)
		}
	}

	return (
		<>
			<div className="main_product_sidebar_top_parent_div">
				<div className="main_product_sidebar_div">
					{/* search */}
					<div className="product_sliderbar_options">
						<div className="proudct_sidebar_heading product-heading1">
							Product Search:
						</div>
						<div>
							<input
								type="text"
								placeholder="Search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="input_for_search_sidebar"
							/>
						</div>
					</div>
					{/* product category */}
					<div className="product_sliderbar_options a_product_sliderbar_options">
						<div className="proudct_sidebar_heading"> Product Category:</div>
						{/* drop down */}
						<div>
							<select
								name="category"
								id="category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className="input_for_category_sidebar a_input_for_category_sidebar "
							>
								<option
									value=""
									disabled={true}
								>
									Select Category
								</option>
								<option value="">All</option>
								{categories.map((category) => (
									<option
										key={category._id}
										value={category._id}
										className="sidebar_options"
									>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>
					{/* filter by price */}
					<div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
						<div className="proudct_sidebar_heading">Filter By Price:</div>
						<div className="main_price_range_product_sidebar">
							<div>
								<span>Min Price</span>
								<input
									type="range"
									min={0}
									max={1000}
									value={minPrice}
									className="input-ranges input_for_min_price"
									onChange={handleMinPriceChange}
								/>
								<div>₹{minPrice}</div>
							</div>
							<div className="SidebarMAXPRICE">
								<span>Max Price</span>
								<input
									type="range"
									min={0}
									max={1000}
									value={maxPrice}
									className="input-ranges input_for_max_price"
									onChange={handleMaxPriceChange}
								/>
								<div className="text-end">₹{maxPrice}</div>
							</div>
						</div>
					</div>
					{/* more */}
					<div className="product_sliderbar_options more_icon_sidebar">
						<div className="proudct_sidebar_heading"> More:</div>
						{/* drop down */}
						<div
							className="more_icon_sidebar_div"
							onClick={() => setShowDropdown(!showDropdown)}
							style={{ cursor: "pointer" }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-three-dots-vertical"
								viewBox="0 0 16 16"
							>
								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
							</svg>
						</div>
					</div>
				</div>
				<div className="media_product_sidebar">
					<div className="media_all_product_search">
						<input
							type="text"
							placeholder="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div>
							<IoSearch />
						</div>
					</div>
					<div
						className="media_filter"
						onClick={() => setShowDropdown(!showDropdown)}
					>
						Filter{" "}
						<span>
							<RiArrowDropDownLine />
						</span>
					</div>
				</div>
				<hr className="line_btn_sidebar_products" />
				<div
					className="w-100"
					style={{ zIndex: 1 }}
				>
					<Allproduct
						search={search}
						category={category}
						minPrice={minPrice}
						maxPrice={maxPrice}
					/>
				</div>
			</div>
			<FilterDropdown
				show={showDropdown}
				onClose={() => setShowDropdown(false)}
				onApply={handleApplyFilter}
			/>
		</>
	)
}

export default ProductSidebar





// import React, { useEffect, useState } from "react"
// import "../../../pages/CSS/product/sidebar.css"
// import Allproduct from "../allproduct"

// import { useNavigate, useLocation } from "react-router-dom"
// import { makeApi } from "../../../api/callApi"
// import { IoSearch } from "react-icons/io5"
// import FilterDropdown from "./FilterPopup"
// import { RiArrowDropDownLine } from "react-icons/ri"

// const ProductSidebar = () => {
// 	const history = useNavigate()
// 	const location = useLocation()

// 	const [minPrice, setMinPrice] = useState(0)
// 	const [maxPrice, setMaxPrice] = useState(5000)
// 	const [categories, setCategories] = useState([])
// 	const [search, setSearch] = useState("")
// 	const [category, setCategory] = useState("")
// 	const [showDropdown, setShowDropdown] = useState(false)

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET")
// 				if (response.status === 200) {
// 					setCategories(response.data.categories)
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error)
// 			}
// 		}
// 		fetchCategories()
// 	}, [])


// 	// Update history replace with query params to avoid reloading or issues with navigation
// 	const handleCategoryChange = (newCategory) => {
// 		setCategory(newCategory);

// 		const queryParams = new URLSearchParams(location.search);
// 		queryParams.set("category", newCategory || "");

// 		history(`${location.pathname}?${queryParams.toString()}`, { replace: true }); // Update URL without reloading
// 	};


// 	const handleApplyFilter = (filterData) => {
// 		setMinPrice(Number(filterData.minPrice))
// 		setMaxPrice(Number(filterData.maxPrice))
// 		setCategory(filterData.selectedCategory)
// 	}

// 	const handleLogout = () => {
// 		localStorage.removeItem("token")
// 		history("/auth/login")
// 	}

// 	const handleMinPriceChange = (e) => {
// 		const value = Number(e.target.value)
// 		if (value <= maxPrice) {
// 			setMinPrice(value)
// 		}
// 	}

// 	const handleMaxPriceChange = (e) => {
// 		const value = Number(e.target.value)
// 		if (value >= minPrice) {
// 			setMaxPrice(value)
// 		}
// 	}

// 	// Sync category state with URL query params when the component mounts or the URL changes
// 	useEffect(() => {
// 		const queryParams = new URLSearchParams(location.search);
// 		const selectedCategory = queryParams.get("category");

// 		if (selectedCategory) {
// 			setCategory(selectedCategory);
// 		}
// 	}, [location.search]);


// 	return (
// 		<>
// 			<div className="main_product_sidebar_top_parent_div">
// 				<div className="main_product_sidebar_div">
// 					{/* search */}
// 					<div className="product_sliderbar_options">
// 						<div className="proudct_sidebar_heading product-heading1">
// 							Product Search:
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								placeholder="Search"
// 								value={search}
// 								onChange={(e) => setSearch(e.target.value)}
// 								className="input_for_search_sidebar"
// 							/>
// 						</div>
// 					</div>
// 					{/* product category */}
// 					<div className="product_sliderbar_options a_product_sliderbar_options">
// 						<div className="proudct_sidebar_heading"> Product Category:</div>
// 						{/* drop down */}
// 						<div>
// 							<select
// 								name="category"
// 								id="category"
// 								value={category}
// 								onChange={(e) => handleCategoryChange(e.target.value)}
// 								className="input_for_category_sidebar a_input_for_category_sidebar "
// 							>
// 								<option value="" disabled={true}>
// 									Select Category
// 								</option>
// 								<option value="">All</option>
// 								{categories.map((category) => (
// 									<option key={category._id} value={category.name}>
// 										{category.name}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>
// 					{/* filter by price */}
// 					<div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
// 						<div className="proudct_sidebar_heading">Filter By Price:</div>
// 						<div className="main_price_range_product_sidebar">
// 							<div>
// 								<span>Min Price</span>
// 								<input
// 									type="range"
// 									min={0}
// 									max={1000}
// 									value={minPrice}
// 									className="input-ranges input_for_min_price"
// 									onChange={handleMinPriceChange}
// 								/>
// 								<div>₹{minPrice}</div>
// 							</div>
// 							<div className="SidebarMAXPRICE">
// 								<span>Max Price</span>
// 								<input
// 									type="range"
// 									min={0}
// 									max={1000}
// 									value={maxPrice}
// 									className="input-ranges input_for_max_price"
// 									onChange={handleMaxPriceChange}
// 								/>
// 								<div className="text-end">₹{maxPrice}</div>
// 							</div>
// 						</div>
// 					</div>
// 					{/* more */}
// 					<div className="product_sliderbar_options more_icon_sidebar">
// 						<div className="proudct_sidebar_heading"> More:</div>
// 						{/* drop down */}
// 						<div
// 							className="more_icon_sidebar_div"
// 							onClick={() => setShowDropdown(!showDropdown)}
// 							style={{ cursor: "pointer" }}
// 						>
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								width="20"
// 								height="20"
// 								fill="currentColor"
// 								className="bi bi-three-dots-vertical"
// 								viewBox="0 0 16 16"
// 							>
// 								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
// 							</svg>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="media_product_sidebar">
// 					<div className="media_all_product_search">
// 						<input
// 							type="text"
// 							placeholder="Search"
// 							value={search}
// 							onChange={(e) => setSearch(e.target.value)}
// 						/>
// 						<div>
// 							<IoSearch />
// 						</div>
// 					</div>
// 					<div
// 						className="media_filter"
// 						onClick={() => setShowDropdown(!showDropdown)}
// 					>
// 						Filter{" "}
// 						<span>
// 							<RiArrowDropDownLine />
// 						</span>
// 					</div>
// 				</div>
// 				<hr className="line_btn_sidebar_products" />
// 				<div
// 					className="w-100"
// 					style={{ zIndex: 1 }}
// 				>
// 					<Allproduct
// 						search={search}
// 						category={category}
// 						minPrice={minPrice}
// 						maxPrice={maxPrice}
// 					/>
// 				</div>
// 			</div>
// 			<FilterDropdown
// 				show={showDropdown}
// 				onClose={() => setShowDropdown(false)}
// 				onApply={handleApplyFilter}
// 			/>
// 		</>
// 	)
// }

// export default ProductSidebar
