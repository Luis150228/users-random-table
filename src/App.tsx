import { useMemo, useState } from 'react';
import './App.css';
import { useUsersData } from './hook/useUsersData';
import { UserList } from './components/UserList';

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
				<main>
					{usersData.length > 0 ? (
						<UserList
							usersData={usersData}
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
