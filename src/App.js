import { Alchemy, Network } from 'alchemy-sdk';
import './App.css';
import HomePage from './HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllBlocksPage from './Blocks/AllBlocksPage';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
    return (
        <div className='app'>
            <h2 className='p-2'>Ethereum block explorer</h2>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage alchemy={alchemy} />}/>
                    <Route path='/blocks' element={<AllBlocksPage alchemy={alchemy}/>}/>
                </Routes>
            </Router>
        </div>);
}

export default App;
