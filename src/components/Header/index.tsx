import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.scss';

import gitHubLogo from '../../assets/github.svg';
import backButton from '../../assets/back-button.svg';

interface IHome {
  title: string;
  showBackButton: boolean;
  logoUser?: string;
}

const Home: React.FC<IHome> = ({ title, showBackButton, logoUser }) => {
  const history = useHistory();

  return (
    <div className="header-container">
      {logoUser && <img src={logoUser} alt="Logo do usuário" className="logo-user" />}
      {!logoUser && <img src={gitHubLogo} alt="GitHub" />}
      <div className="title">
        {showBackButton && <img src={backButton} alt="Voltar" onClick={() => history.goBack()} />}
        <h1>{title}</h1>
      </div>
    </div>
  )
}

export default Home;