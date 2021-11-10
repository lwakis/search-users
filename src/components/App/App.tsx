import React from 'react';
import './App.css';
import { Photo, Users } from '../../interface';
import Preloader from '../Preloader/Preloader';


const App: React.FC = () => {
  const [users, setUsers] = React.useState<Users[]>([]);
  const [photo, setPhoto] = React.useState<Photo[]>([]);
  const [searchFound, setSearchFound] = React.useState<Users[] | null>(null);
  const [searchText, setSearchText] = React.useState<string>("");
  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      return response.json();
    })
    .then((data) => {    
      setUsers(data);
    });
  }, [users])

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then((response) => {
      return response.json();
    })
    .then((data) => {      
      setPhoto(data);
    });
  }, [photo])

  React.useEffect(() => {    
    setSearchFound(null);
    const timeOutId = setTimeout(() => setSearchFound(users.filter((element: Users) => element.name.toLowerCase().includes(searchText.toLowerCase()))), 500);
    return () => clearTimeout(timeOutId);       
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  
  return (
    <div className="App">
      <div className="container">
        <div className="container__search">
          <input onChange={(e) => setSearchText(e.target.value)} 
                    placeholder="Search"
                    value={searchText} type="text"/>
        </div>
        {searchText.length > 0 && searchFound && searchFound?.length !== 0 && <div className="container__users">
          {searchFound.map(u => 
            <div key={u.id} className="user__card">
                <div className="card">
                  <img src={photo[u.id].thumbnailUrl} alt="user" />
                  <div>
                    <div className="user__card-name">{u.name}</div>
                    <div className="user__card-username">@{u.username}</div>
                  </div>
              </div>
            </div>
          )}
        </div>}
        {searchText.length > 0 && !searchFound && <Preloader />}
      </div>
    </div>
  );
}

export default App;
