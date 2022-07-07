import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

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
      // affiche automatiquement la liste des amis si il ya une nouvelle data
      setListOfFriends([...listOfFriends, { name: name, age: age }]);
    }).catch(() => {
      alert('nope, it didn\'t work')
    })
  }

  const updateFriend = (id) => {
    const newAge = prompt('Enter new age');
    Axios.put('http://localhost:3001/update', { newAge: newAge, id: id }).then(() => {
      setListOfFriends(listOfFriends.map((val) => {
        return val._id === id ? { _id: id, name: val.name, age: newAge } : val;
      }))
    })
  };


  useEffect(() => {
    // On récupère tous les amis de la base de données et les affiches
    //on a juste besion de l'url etle roote 
    Axios.get('http://localhost:3001/read').then(res => {
      setListOfFriends(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      <div className='inputs'>
        <input type='text' placeholder='Friend name...' onChange={(e) => { setName(e.target.value) }} />
        <input type='number' placeholder='Friend age...' onChange={(e) => { setAge(e.target.value) }} />
        <button onClick={() => addFriend()}>Add Friend</button>
      </div>

      <div className='listOfFriends'>
        {
          listOfFriends.map((val, index) => {
            return (
              <div className='friendContainer'>
                <div key={index} className='friend'>
                  <h3>Name: {val.name}</h3>
                  <h3>Age: {val.age}</h3>
                </div>
                <button onClick={() => { updateFriend(val._id) }}>Update</button>
                <button>X</button>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
