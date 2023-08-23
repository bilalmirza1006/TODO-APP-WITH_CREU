import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, CircularProgress, List, TextField, Typography } from '@mui/material';
import TodoListItem from '../components/TodoListItem';
import axios from 'axios';





function ToDo() {
	const [productname, setProductname] = useState('');
	const [enableButton, setEnableButton] = useState(false);
	const [category, setCategory] = useState('')
	const [price, setPrice] = useState('')
	const [id, setId] = useState('')
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true)
		axios.get("http://localhost:3009/product-list")
			.then(res => setData(res.data))
			.catch(error => console.log(error.message))
		setLoading(false)
	}, [])
	const handelAddProduct = () => {
		setLoading(true)

		if ((productname.trim() && category.trim() && price.trim()) === "") {
			alert("Please complete all fields.")
			setLoading(false)

		} else {
			setProductname('')
			setCategory('')
			setPrice('')
			const fetchApi = () => {
				axios.get("http://localhost:3009/product-list")
					.then(res => setData(res.data))
					.catch(error => console.log(error.message))
				setLoading(false)

			}
			axios.post("http://localhost:3009/add-product", {
				productname: productname,
				category: category,
				price: price,

			})
				.then((response) => {
					setLoading(true)

					// alert('Product Add')
					fetchApi()
					console.log("hi", response)
				})
		}
	}
	const handelEdit = () => {
		if ((productname.trim() && category.trim() && price.trim()) === "") {
			alert('Please complete all fields.')
			setLoading(false)

		} else {
			setProductname('')
			setCategory('')
			setPrice('')

			console.log("edit api")
			const fetchApi = () => {
				axios.get("http://localhost:3009/product-list")
					.then(res => setData(res.data))
					.catch(error => console.log(error.message))
				setLoading(false)

			}
			axios.put(`http://localhost:3009/product-update/${id}`, {
				productname: productname,
				category: category,
				price: price,
			})
				.then((response) => {
					setLoading(true)

					// alert('Product Edit')
					fetchApi()
					console.log("hi", response)
				})
			setEnableButton(false)

		}
	}
	const handelDelete = (item) => {
		console.log('fofof', item);
		// setId(listItem._id)
		// console.log("delete api", id)
		// return
		const fetchApi = () => {
			axios.get("http://localhost:3009/product-list")
				.then(res => setData(res.data))
				.catch(error => console.log(error.message))
			setLoading(false)

		}
		axios.delete(`http://localhost:3009/delete_product/${item._id}`)
			.then((response) => {
				setLoading(true)

				// alert('Product delete')
				fetchApi()
				console.log("hi", response)
			})
	}
	return (
		<Container maxWidth='xl'>
			<Box
				sx={{ background: 'linear-gradient(to right bottom, #3E5151, #DECBA4)', height: "100vh" }}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}>
				<Box sx={{ mt: 2 }}>
					<Typography variant='h3'>TO DO APP</Typography>
				</Box>
				<Box sx={{ width: '80%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '16px', mt: 2 }}>
					<TextField
						sx={{ m: 2 }}
						id="outlined-basic"
						label="productname"
						variant="outlined"
						value={productname}
						onChange={(e) => setProductname(e.target.value)}
					/>
					<TextField
						sx={{ m: 2 }}
						id="outlined-basic"
						label="category"
						variant="outlined"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					/>
					<TextField
						sx={{ m: 2 }}
						id="outlined-basic"
						label="price"
						variant="outlined"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
					<Button
						size="medium"
						sx={{ m: 2, width: '150px' }}
						variant="contained"
						onClick={!enableButton ? handelAddProduct : handelEdit}
					>
						{enableButton ? "Edit" : "Add "}
					</Button>
				</Box>

				<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '16px', mt: 2 }}>
					<nav aria-label="main mailbox folders">
						{loading ? <CircularProgress /> :
							<List>
								{data?.map((item) => {
									console.log('item', item)
									return (
										<TodoListItem
											itemKey={item.id}
											item={item}
											handleCallback={(listItem) => {
												setEnableButton(true);
												setProductname(listItem.productname);
												setCategory(listItem.category);
												setPrice(listItem.price);
												setId(listItem._id);

											}}
											deleteCallback={(item) => handelDelete(item)}
										/>
									)
								})
								}
							</List>}
					</nav>
				</Box>
			</Box>
		</Container>
	)
}

export default ToDo