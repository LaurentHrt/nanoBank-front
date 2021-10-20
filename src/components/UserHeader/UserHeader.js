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

	const toogleEdit = (e) => {
		setEditMode(!editMode)
	}

	const handleSave = async (e) => {
		console.log('click save')
		dispatch(renameUser('azerty', 'teeeqsdfgest'))
		// TODO
	}

	useEffect(() => {
		dispatch(fetchOrUpdateUserInfos)
	}, [dispatch])

	const textInputs = (
		<div>
			<input name="firstName" />
			<input name="lastName" />
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
