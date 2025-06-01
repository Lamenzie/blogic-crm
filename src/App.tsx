import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import ContractList from './pages/Contracts/ContractList';
import ContractForm from './pages/Contracts/ContractForm';
import ContractDetail from './pages/Contracts/ContractDetail';
import ClientList from './pages/Clients/ClientList';
import AdvisorList from './pages/Advisors/AdvisorList';
import { ContractProvider } from './pages/Contracts/ContractContext';
import { ClientProvider } from './pages/Clients/ClientContext';
import { AdvisorProvider } from './pages/Advisors/AdvisorContext';

const App = () => {
  return (
    <ContractProvider>
      <ClientProvider>
        <AdvisorProvider>
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Navigate to="/smlouvy" replace />} />
              <Route path="/smlouvy" element={<ContractList />} />
              <Route path="/smlouvy/novy" element={<ContractForm />} />
              <Route path="/smlouvy/:id" element={<ContractDetail />} />
              <Route path="/klienti" element={<ClientList />} />
              <Route path="/poradci" element={<AdvisorList />} />
            </Routes>
          </Router>
        </AdvisorProvider>
      </ClientProvider>
    </ContractProvider>
  );
};

export default App;