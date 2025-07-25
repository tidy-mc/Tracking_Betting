import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BetProvider } from './context/BetContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Bets } from './pages/Bets';
import { Statistics } from './pages/Statistics';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <BetProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bets" element={<Bets />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BetProvider>
    </Router>
  );
}

export default App;
