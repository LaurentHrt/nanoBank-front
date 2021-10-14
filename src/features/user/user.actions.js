export const FETCHING = 'user/fetching'
export const UPDATING = 'user/updating'
export const RESOLVED = 'user/resolved'
export const REJECTED = 'user/rejected'

export const userFetching = () => ({
	type: FETCHING,
})

export const userUpdating = () => ({
	type: FETCHING,
})

export const userResolved = (data) => ({
	type: RESOLVED,
	payload: data,
})

export const userRejected = (error) => ({
	type: REJECTED,
	payload: error,
})
