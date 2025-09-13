import React, { useState } from 'react';
import { Menu, Bell, GraduationCap, User } from 'lucide-react';
import CadastroDeCursoPage from '../../components/ListagemDeCurso.jsx';
import '../../styles/home.css';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const navigateHome = () => {
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'cadastro-de-curso':
        return <CadastroDeCursoPage onNavigateHome={navigateHome} />;
      default:
        return <MainHomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="home-page">
      {currentPage === 'home' && (
        <>
          {/* Header */}
          <div className="home-header">
            <div className="header-content">
              <div className="header-title">
                <button className="menu-btn" onClick={toggleSidebar} data-testid="menu-button">
                  <Menu size={24} />
                </button>

                <GraduationCap size={28} />
                <h1>Gestão dos Cronogramas</h1>
              </div>
              <div className="header-actions">
                <button className="header-btn" title="Notificações">
                  <Bell size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <User size={24} />
              <h2>Menu</h2>
            </div>
            <div className="sidebar-content">
              <div className="user-info">
                <div className="user-avatar">
                  <User size={24} />
                </div>
                <div className="user-name">Administrador</div>
                <div className="user-email">admin@senac.com.br</div>
              </div>
              <nav>
                <ul className="nav-menu">
                  <li className="nav-item">
                    <a
                      href="#"
                      className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
                    >
                      <GraduationCap size={20} />
                      Página Inicial
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#"
                      className={`nav-link ${currentPage === 'cadastro-de-curso' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); navigateTo('cadastro-de-curso'); }}
                    >
                      <GraduationCap size={20} />
                      Cadastro de Curso
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      {renderCurrentPage()}
    </div>
  );
};

const MainHomePage = ({ onNavigate }) => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <div className="logo-container">
          <div className="logo-icon">
            <GraduationCap size={40} />
          </div>
        </div>
        <h1 className="welcome-title">SENAC Catalão</h1>
        <p className="welcome-subtitle">Gestão de Cronogramas</p>
        <div className="welcome-message">
          Bem-vindo ao sistema de gestão de cronogramas
        </div>
      </div>

      <div className="menu-grid">
        {/* Apenas o card de Cadastro de Curso */}
        <div className="menu-card" onClick={() => onNavigate('cadastro-de-curso')}>
          <div className="menu-icon purple">
            <GraduationCap size={28} />
          </div>
          <h3 className="menu-title">Cadastro de Curso</h3>
          <p className="menu-description">
            Cadastre e gerencie os cursos disponíveis
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
