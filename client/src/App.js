import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);

  const addFriend = () => {
    /**
     * Axios.post() : permet d'envoyer des datas à notre serveur
     * Axios.get(): permet de recuperer les datas de notre serveur
     * Axios prend 2 parm : Axios('', {})
     * Param(1) : correspond à l'url plus la root de notre serveur
     * Param(2) : correspond à nos datas à envoyer
     */
    Axios.post('http://localhost:3001/addfriend', {
      name: name,
      age: age,
    }).then(() => {
      alert('yey, it worked')
    }).catch(() => {
      alert('nope, it didn\'t work')
    })
  }

  return (
    <div className="App">
      <div className='inputs'>
        <input type='text' placeholder='Friend name...' onChange={(e) => { setName(e.target.value) }} />
        <input type='number' placeholder='Friend age...' onChange={(e) => { setAge(e.target.value) }} />
        <button onClick={() => addFriend()}>Add Friend</button>
      </div>
    </div>
  );
}

export default App;
