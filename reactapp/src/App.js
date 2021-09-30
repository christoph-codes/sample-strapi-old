import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [titles, setTitles] = useState([]);
	const [newTitle, setNewTitle] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:1337/posts')
			.then((response) => {
				console.log(response.data[0].Title);

				setTitles(response.data);
			})
			.then((data) => console.log(data));

		console.log('Ran...');
	}, []);

	const updateTitle = (e) => {
		e.preventDefault();
		console.log(newTitle);
		const customDateString = Date.now().toString();
		console.log('customDateString', customDateString);
		axios.post(`http://localhost:1337/posts`, {
			Title: newTitle,
			published: true,
		});
	};

	return (
		<div className='App'>
			{titles.map((title, index) => {
				return <h1 key={index}>{title.Title}</h1>;
			})}
			<input
				type='text'
				onChange={(e) => setNewTitle(e.target.value)}
				value={newTitle}
			/>
			<button onClick={updateTitle}>Update Title</button>
		</div>
	);
}

export default App;
