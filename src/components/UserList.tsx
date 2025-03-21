import { Result } from '../usersType.d';
interface UserListProps {
	withColor?: boolean;
	deleteRow: (_uuid: string) => void;
	usersData: Result[];
	sortListUsers: (e: React.MouseEvent<HTMLElement>) => void;
}

export const UserList = ({ withColor, deleteRow, usersData, sortListUsers }: UserListProps) => {
	return (
		<table className='users-table'>
			<thead>
				<tr>
					<th>Picture</th>
					<th
						className='sort-control'
						data-sort={'name'}
						onClick={sortListUsers}>
						Name
					</th>
					<th
						className='sort-control'
						data-sort={'lastname'}
						onClick={sortListUsers}>
						LastName
					</th>
					<th
						className='sort-control'
						data-sort={'country'}
						onClick={sortListUsers}>
						Country
					</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{usersData.map((user) => (
					<tr
						key={user.login.uuid}
						className={withColor ? 'color-row' : ''}>
						<td>
							<img
								className='user-image'
								src={user.picture.thumbnail}
								alt={`imagen de ${user.name.first} ${user.name.last}`}
							/>
						</td>
						<td>{`${user.name.first}`}</td>
						<td>{user.name.last}</td>
						<td>{user.location.country}</td>
						<td>
							<button onClick={() => deleteRow(user.login.uuid)}>Delete</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
