import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10/12 h-16 md:h-20 bg-gradient-to-r from-[#0D1321] via-[#152033] to-[#1D2D44] text-white shadow-2xl flex items-center z-[9999] border-b border-[#2E455D]/50 rounded-xl">
      {/* Logo Section */}
      <div className="px-4 md:px-8 border-r border-[#2E455D]/50 h-full flex items-center bg-gradient-to-r from-[#0D1321] to-[#152033] min-w-fit rounded-l-xl">
        <div className="text-xl md:text-3xl font-bold tracking-wide whitespace-nowrap">
          <span className="text-[#BFcad9]">Blogic</span>
          <span className="text-[#FFFFFF]"> CRM</span>
        </div>
      </div>
      
      {/* Navigation Section */}
      <nav className="ml-auto flex items-center gap-6 md:gap-10 pr-4 md:pr-8">
        <NavLink
          to="/smlouvy"
          className="group relative px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium text-base md:text-xl hover:bg-gradient-to-r hover:from-[#2E455D] hover:to-[#3E5C76] focus:outline-none transition-all duration-200 transform hover:scale-105 text-white hover:shadow-md whitespace-nowrap no-underline visited:text-white"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 rounded-full bg-[#BFcad9] group-hover:bg-white transition-colors"></div>
            <span>Smlouvy</span>
          </div>
        </NavLink>

        <NavLink
          to="/klienti"
          className="group relative px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium text-base md:text-xl hover:bg-gradient-to-r hover:from-[#2E455D] hover:to-[#3E5C76] focus:outline-none transition-all duration-200 transform hover:scale-105 text-white hover:shadow-md whitespace-nowrap no-underline visited:text-white"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 rounded-full bg-[#BFcad9] group-hover:bg-white transition-colors"></div>
            <span>Klienti</span>
          </div>
        </NavLink>

        <NavLink
          to="/poradci"
          className="group relative px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium text-base md:text-xl hover:bg-gradient-to-r hover:from-[#2E455D] hover:to-[#3E5C76] focus:outline-none transition-all duration-200 transform hover:scale-105 text-white hover:shadow-md whitespace-nowrap no-underline visited:text-white"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 rounded-full bg-[#BFcad9] group-hover:bg-white transition-colors"></div>
            <span>Poradci</span>
          </div>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
