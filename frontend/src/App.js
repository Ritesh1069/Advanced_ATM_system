import logo from './logo.svg';
import './App.css';
import Auth from './pages/Auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Deposit from './pages/Deposit';
import Transaction from './pages/Transaction';
import Withdraw from './pages/Withdraw';
import { AuthProvider } from './routing/Authcont';
import ProtectedRoute from './routing/Protected';
import Moneydeposit from './pages/Moneydepo';
import Moneywithdraw from './pages/MoneyWithdraw';
import Face from './pages/Face';
import TransactionHistory from './pages/TransactionHistory';
import AccountBalance from './pages/Accountbalance';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/Auth" element={<Auth/>} />
        <Route path="/" element={<Deposit/>} />
        <Route path="/Transaction" element={<Transaction/>} />
        <Route path="/Withdraw" element={<Withdraw/>} />
        <Route path="/Deposit" element={<Moneydeposit/>} />
        <Route path="/MoneyWithdraw" element={<Moneywithdraw/>} />
        <Route path="/Face" element={<Face/>} />
        <Route path="/History" element={<TransactionHistory/>} />
        <Route path="/balance" element={<AccountBalance/>} />

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
