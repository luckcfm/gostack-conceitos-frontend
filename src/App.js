import React, {useState,useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories')
    .then(response => {
      setRepositories(response.data);
    })
  },[])
  async function handleAddRepository() {
    const repository = {
      title: `Repository ${Date.now()}`,
      techs: [],
      url: 'http://github.com'
    }
    api.post('repositories', repository)
    .then(response => {
      setRepositories([...repositories, response.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete('repositories/' + id)
    .then(response => {
      const oldRepo = [...repositories];
      const indexRepo = oldRepo.findIndex(repository => repository.id === id);
      oldRepo.splice(indexRepo, 1);
      setRepositories(oldRepo);
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        })}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
