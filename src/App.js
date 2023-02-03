
import NavBar from './components/Nav/NavBar'
import MenuItems from './components/Menu/MenuItems';

import Main from './components/Tabs/Main';
import Lunch from './components/Tabs/Lunch';
import Add from './components/Tabs/Add';
import CurrentOrder from './components/Settle/CurrentOrder';
import { useState } from 'react'

import './App.css';

function App() {

const [ActiveTab, setActiveTab] = useState('Main');
const [Category, setCategory] = useState(null);
const [activeItems, setActiveItems] = useState(null);

  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-1 leftNav py-4">
          <NavBar 
            setActiveTab={setActiveTab}
            ActiveTab={ActiveTab}
            setCategory = {setCategory}
          />
        </div>

        <div className="col-7 menuItem py-4">
          { ActiveTab === "Main" && Category === null && 
            <Main 
              setCategory = {setCategory}
              setActiveItems={setActiveItems}
              setActiveTab={setActiveTab}
            />
          }
          { ActiveTab === "Lunch" && Category === null && 
            <Lunch 
              setCategory = {setCategory}
              setActiveItems={setActiveItems}
              setActiveTab={setActiveTab}
            />
          }
          { ActiveTab === "Add" && Category === null && 
            <Add 
              setCategory = {setCategory}
              setActiveItems={setActiveItems}
              setActiveTab={setActiveTab}
            />
          }

        { Category !== null && 
          <MenuItems
            Category={Category}
            menuDatas={activeItems}
            ActiveTab={ActiveTab}
            setActiveTab={setActiveTab}
            setCategory = {setCategory}
          />
        }
        </div>

        <div className="col-4 totalDiv">
          <h1>Current Order</h1>
          <CurrentOrder />
        </div>

      </div>
    </div>
  );
}

export default App;
