import React,{ useState } from 'react'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import  Switch  from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip  from '@mui/material/Tooltip';
import './Manager.css'

function Manager() {

	const [details,setDetails] = useState({
		website:"",
		username:"",
		password:""
      })

	const [list,setList] = useState([])
	const [togglePassword,setTogglePassword] = useState(false)
	const [cpassword,setCpassword] = useState('')
	
	
	//Function used to Handle the enter details in the form.
	const changeHandler = (e) => {

		const {name,value} = e.target

		setDetails((previousState)=>{
			return(
				{...previousState,[name]:value}
			)
		})
	}
		
	
	// Function used to add the password to the table when we clicked the Add Button adn convert the object data type into list.
	const addPassword = (e) => {

		e.preventDefault()

		if(details.website && details.password && details.username){

		setList((previousList) => [...previousList, {details}])
		setDetails("")
		console.log("Details:", details);
		console.log("List:", list);
		}
		else{
			alert('Please enter correct details..!!!')
		}
	  }


	// Function used to delete the entire details from password Wallet
	const deleteEntirePassword = (index) => {

		setList((previousList) => previousList.filter((item, i) => i !== index))
		alert("Password Details Deleted..!!..!")

	  }

	// Function used to toggle Password to show password from Password Manager Wallet
	  const showTogglePassword = () => {
		 setTogglePassword((previousState)=>!previousState)
	  }

   // Function used to Copy Password from Password Manager Wallet
	  const copyPassword = (password) =>{
		navigator.clipboard.writeText(password)
		.then(()=>{setCpassword('Password Copied')
		    alert('Password Copied ..!!!..!!')
			setTimeout(()=>{
				setCpassword('')
			},2000)
		})
		.catch((error)=>console.log(error))
		
	  }

	// Function used to delete password field in the Password Manager Wallet

	// Function used to edit the Password in Password Manager Wallet
	  
  return (
	
	<div>
		{/** Password Wallet */}
		<h2>Your Passwords</h2>
		<div className='password-container'>
        
				<div className='password-render'>
					<table className='list' border={1}>
						<thead>
							<tr>
								<th>Website</th>
								<th>Username</th>
								<th>Password</th>
								<th>Password-Action</th>
								<th>Complete-Action</th>
							</tr>
						</thead>
						<tbody>
							{list.map((val,key)=>{
								return(
									
										<tr className='list-item' key={key}>
												<td><input type='text' value={val.details.website} readOnly/></td>
												<td><input type='text' value={val.details.username} readOnly/></td>
												<td>
													<input type={togglePassword?"text":"password"} defaultValue={val.details.password} />
													<Switch size='small' checked={togglePassword} onChange={showTogglePassword} />
												</td>
										
												<td>
													
													<div><Tooltip title='Copy' placement='right'><ContentCopyIcon  size='small' onClick={()=>{copyPassword(val.details.password)}} /></Tooltip></div>
													{/*<div>
														<Tooltip title='Delete' placement='right'><DeleteIcon size='small' /></Tooltip>
													</div> 
								                    <div><Tooltip title='Edit' placement='right'><EditIcon size='small' /></Tooltip></div> 
													*/}
												</td>
												<td>
													<Button variant="contained" startIcon={<DeleteIcon />} onClick={()=>deleteEntirePassword(key)}>Delete</Button>
												</td>
										</tr>
									)
							})}
						</tbody>	
					</table>
				</div>
				
		</div>

		{/** Password fetching form */}
		<div className='input-form'>
			<h2>Add your Password</h2>
			<form onSubmit={addPassword}>
				<input type="url" placeholder='website' name='website' onChange={changeHandler} autoComplete='off'  />
				<input type="text" placeholder='username' name='username' onChange={changeHandler}  autoComplete='off' />
				<input type="password" placeholder='password' name='password' onChange={changeHandler}  autoComplete='off' />
				<input type="submit" value='Add Password'/>
			</form>
		</div>
	</div>
   
  )
}

export default Manager