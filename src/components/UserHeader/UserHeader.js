import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { renameUser } from '../../features/renameUser/renameUser'
import {
	fetchOrUpdateUserInfos,
	selectUserInfos,
} from '../../features/user/user'

export default function UserHeader() {
	const dispatch = useDispatch()
	const userInfos = useSelector(selectUserInfos)

	const [editMode, setEditMode] = useState(false)
	const [inputFirstname, setInputFirstname] = useState(userInfos.firstName)
	const [inputLastname, setInputLastname] = useState(userInfos.lastName)

	const toogleEdit = (e) => {
		setEditMode(!editMode)
	}

	const handleSave = async (e) => {
		dispatch(renameUser(inputFirstname, inputLastname))
		setEditMode(false)
	}

	useEffect(() => {
		dispatch(fetchOrUpdateUserInfos)
	}, [dispatch])

	const textInputs = (
		<div>
			<input
				name="firstName"
				placeholder="Firstname"
				value={inputFirstname}
				onChange={(e) => setInputFirstname(e.target.value)}
			/>
			<input
				name="lastName"
				placeholder="Lastname"
				value={inputLastname}
				onChange={(e) => setInputLastname(e.target.value)}
			/>
		</div>
	)

	const SaveCancelButtons = (
		<div className="button-container">
			<button className="save-button" onClick={handleSave}>
				Save
			</button>
			<button className="cancel-button" onClick={toogleEdit}>
				Cancel
			</button>
		</div>
	)

	const editButton = (
		<button className="edit-button" onClick={toogleEdit}>
			Edit Name
		</button>
	)

	return (
		<div className="header">
			<h1>
				Welcome back
				<br />
				{editMode
					? textInputs
					: `${userInfos.firstName} ${userInfos.lastName}!`}
			</h1>
			{editMode ? SaveCancelButtons : editButton}
		</div>
	)
}
