import { useMemo, useState } from 'react';
import './App.css';
import { useUsersData } from './hook/useUsersData';

function App() {
	const { dataUsers } = useUsersData();
	const usersData = useMemo(() => {
		console.log('Recalculando usersData'); // Esto se imprime solo si dataUsers cambia
		return dataUsers;
	}, [dataUsers]);

	const [withColor, setWithColor] = useState(false);

	const handleColor = () => {
		setWithColor(!withColor);
	};

	console.log('Renderizando App'); // Esto se imprime cada vez que el componente se renderiza

	return (
		<>
			<section className='container'>
				<header>
					<div>
						<h1>Users</h1>
					</div>
					<div className='actions'>
						<button onClick={handleColor}>Row Colors</button>
						<button>Sort by country </button>
						<button>Restore State</button>
						<input
							type='text'
							placeholder='Filter by country'
						/>
					</div>
				</header>
				<div>
					{usersData.length > 0 ? (
						<table className='users-table'>
							<thead>
								<tr>
									<th>Picture</th>
									<th>Name</th>
									<th>LastName</th>
									<th>Country</th>
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
											<button>Delete</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>Loading...</p>
					)}
				</div>
			</section>
		</>
	);
}

export default App;
