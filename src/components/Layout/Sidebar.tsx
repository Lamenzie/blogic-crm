import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <header className="w-full bg-navyBlue text-lightBeige p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Blogic CRM</h1>
        <nav className="flex gap-6">
          <NavLink
            to="/smlouvy"
            className={({ isActive }) =>
              `hover:text-white transition ${
                isActive ? 'font-semibold text-white' : 'text-lightBeige'
              }`
            }
          >
            Smlouvy
          </NavLink>
          <NavLink
            to="/klienti"
            className={({ isActive }) =>
              `hover:text-white transition ${
                isActive ? 'font-semibold text-white' : 'text-lightBeige'
              }`
            }
          >
            Klienti
          </NavLink>
          <NavLink
            to="/poradci"
            className={({ isActive }) =>
              `hover:text-white transition ${
                isActive ? 'font-semibold text-white' : 'text-lightBeige'
              }`
            }
          >
            Poradci
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Sidebar;
