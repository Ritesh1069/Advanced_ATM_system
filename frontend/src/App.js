import logo from './logo.svg';
import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Deposit from './pages/Deposit';
import Transaction from './pages/Transaction';
import Withdraw from './pages/Withdraw';
import { AuthProvider } from './routing/Authcont';
import ProtectedRoute from './routing/Protected';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/Deposit" element={<Deposit/>} />
        <Route path="/Transaction" element={<Transaction/>} />
        <Route path="/Withdraw" element={<Withdraw/>} />
        <Route path="/protected" element={
          <ProtectedRoute>


          
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
