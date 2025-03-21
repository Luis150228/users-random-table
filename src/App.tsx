import { useMemo, useState } from 'react';
import './App.css';
import { useUsersData } from './hook/useUsersData';
import { UserList } from './components/UserList';

function App() {
	const { dataUsers, renewUsers } = useUsersData();
	const usersData = useMemo(() => {
		console.log('Recalculando usersData'); // Esto se imprime solo si dataUsers cambia
		return dataUsers;
	}, [dataUsers]);

	const [withColor, setWithColor] = useState(false);
	const [sortByCountry, setSortByCountry] = useState(false);

	const handleColor = () => {
		setWithColor(!withColor);
	};

	const handleSortByCountry = () => {
		setSortByCountry((prevState) => !prevState);
	};

	const sortedUsers = sortByCountry //Recuerda que sort modifica el array original
		? usersData.slice().sort((a, b) => a.location.country.localeCompare(b.location.country))
		: usersData;

	const handleDeleteRow = (_uuid: string) => {
		console.log('Delete row with uuid:', _uuid);
		const sortedUsers = usersData.filter((user) => user.login.uuid !== _uuid);
		renewUsers(sortedUsers);
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
						<button onClick={handleSortByCountry}>{sortByCountry ? 'Not Sort by country' : 'Sort by country'}</button>
						<button>Restore State</button>
						<input
							type='text'
							placeholder='Filter by country'
						/>
					</div>
				</header>
				<main>
					{usersData.length > 0 ? (
						<UserList
							deleteRow={handleDeleteRow}
							usersData={sortedUsers}
							withColor={withColor}
						/>
					) : (
						<p>Loading...</p>
					)}
				</main>
			</section>
		</>
	);
}

export default App;
