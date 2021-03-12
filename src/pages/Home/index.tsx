import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.scss';

import api from '../../services/api';
import { saveUser, getUsers } from '../../services/userService';

import Header from '../../components/Header';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  function handleForm(event: any) {
    event.preventDefault();
    loadUser();
  }

  function loadUser() {
    setMessage('')
    api.get(`https://api.github.com/users/${search}`)
      .then((response) => {
        saveUser(response.data);
        setUsers(getUsers());
      })
      .catch((error) => {
        setMessage('Usuário não encontrado, tente novamente!')
      });
  }

  return (
    <div className="home-container">
      <Header title="Explore usuários no GitHub" showBackButton={false} />
      <form className="search-container" onSubmit={handleForm}>
        <div>
          <input
            type="text"
            placeholder="Digite o nome do usuário"
            value={search}
            onChange={(event: any) => setSearch(event.target.value)} />
          {message && <span>{message}</span>}
        </div>
        <button type="submit">Pesquisar</button>
      </form>
      {
        users.map((user: any) => (
          <div className="user-container" key={user.id} onClick={() => history.push(`/${user.login}`)}>
            <div className="circle">
              <img src={user.avatar_url} alt="Avatar" />
            </div>
            <p>{user.name}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Home;
