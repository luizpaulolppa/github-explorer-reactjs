import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './styles.scss';

import api from '../../services/api';

import Header from '../../components/Header';

interface RepositoryParams {
  username: string;
}

const User: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [user, setUser] = useState<any>();
  const [repos, setRepos] = useState<any>();
  const [stars, setStars] = useState<any>();
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState(getDefaultOptions);

  useEffect(() => {
    setMessage('Carregando...');
    loadUser();
    loadRepos();
    loadStarreds();
  }, []);

  function getDefaultOptions() {
    return [
      {
        id: uuidv4(),
        name: 'Repos',
        length: 10,
        status: 'active'
      },
      {
        id: uuidv4(),
        name: 'Stars',
        length: 0,
        active: ''
      }
    ]
  }

  function loadUser() {
    api.get(`https://api.github.com/users/${params.username}`)
      .then((response) => {
        setMessage('');
        setUser(response.data);
      })
      .catch((_error) => {
        setMessage('Usuário não encontrado!');
      });
  }

  function markLengthOption(name: string, size: number) {
    const newOptions = options.map((option) => {
      if (option.name === name) {
        option.length = size;
      }

      return option;
    });

    setOptions(newOptions);
  }

  function loadRepos() {
    api.get(`https://api.github.com/users/${params.username}/repos`)
      .then((response) => {
        setMessage('');
        const repos = response.data || [];
        setRepos(repos);
        markLengthOption('Repos', repos.length);
      })
      .catch((_error) => {
        setMessage('Repositórios não encontrado!');
      });
  }

  function loadStarreds() {
    api.get(`https://api.github.com/users/${params.username}/starred`)
      .then((response) => {
        setMessage('');
        const stars = response.data || [];
        setStars(stars);
        markLengthOption('Stars', stars.length);
      })
      .catch((_error) => {
        setMessage('Repositórios marcados não foram encontrado!');
      });
  }

  function handleOption(id: string) {
    const newOptions = options.map((option) => {
      option.status = '';

      if (option.id === id) {
        option.status = 'active';
      }

      return option;
    });

    setOptions(newOptions);
  }

  function getRepos(): any {
    const option = options.find(option => option.status === 'active');
    if (option?.name === 'Stars') {
      return stars;
    } else {
      return repos;
    }
  }

  return (
    <div className="user-container">
      <Header title={user?.name} showBackButton={true} logoUser={user?.avatar_url} />
      <div className="box-options">
        {
          options.map(option => (
            <div className={`box-option ${option.status}`} key={option.id} onClick={() => handleOption(option.id)}>
              <strong>{option.length}</strong>
              <p>{option.name}</p>
            </div>
          ))
        }
      </div>
      {
        getRepos()?.map((repo: any) => (
          <a href={repo.html_url} className="item-repo" key={repo.id} target="blank">
            <div>
              <h3>{repo.name}</h3>
              <p>{repo.full_name}</p>
            </div>
          </a>
        ))
      }
    </div>
  )
}

export default User;
