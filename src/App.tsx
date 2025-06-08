import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
// Contracts
import ContractList from './pages/Contracts/ContractList';
import ContractForm from './pages/Contracts/ContractForm';
import ContractDetail from './pages/Contracts/ContractDetail';
import { ContractProvider } from './pages/Contracts/ContractContext';
// clients
import ClientList from './pages/Clients/ClientList';
import { ClientProvider } from './pages/Clients/ClientContext';
import ClientDetail from './pages/Clients/ClientDetail';
import ClientForm from './pages/Clients/ClientForm';
// advisors
import AdvisorList from './pages/Advisors/AdvisorList';
import { AdvisorProvider } from './pages/Advisors/AdvisorContext';
import AdvisorDetail from './pages/Advisors/AdvisorDetail';
import AdvisorForm from './pages/Advisors/AdvisorForm';

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
              <Route path='/klienti/:id' element={<ClientDetail />} />
              <Route path='/klienti/novy' element={<ClientForm />} />
              <Route path="/poradci" element={<AdvisorList />} />
              <Route path="/poradci/:id" element={<AdvisorDetail />} />
              <Route path='/poradci/novy' element={<AdvisorForm />}/>
            </Routes>
          </Router>
        </AdvisorProvider>
      </ClientProvider>
    </ContractProvider>
  );
};

export default App;