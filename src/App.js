import "./App.css";
import { DayForcast } from "./Components/DayForcast";
import Wheather from "./Components/Wheather";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Wheather />
			</header>
		</div>
	);
}

export default App;
