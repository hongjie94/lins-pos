
import NavBar from './components/Nav/NavBar'
import MenuItems from './components/Menu/MenuItems';

import Main from './components/Tabs/Main';
import Lunch from './components/Tabs/Lunch';
import Add from './components/Tabs/Add';
import CurrentOrder from './components/Settle/CurrentOrder';
import { useState, useEffect } from 'react';

import './App.css';

function App() {

const [ActiveTab, setActiveTab] = useState('Main');
const [Category, setCategory] = useState(null);
const [activeItems, setActiveItems] = useState(null);
const [curOrder, setCurOrder] = useState(null);
const [subTotal, setSubTotal] = useState(0);

useEffect(() => {
  setCurOrder(JSON.parse(localStorage.getItem('curOrder')))
  setSubTotal(JSON.parse(localStorage.getItem('OrderSubTotal')))
}, []);

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
              curOrder = {curOrder}
            />
          }
          { ActiveTab === "Add" && Category === null && 
            <Add 
              setCategory = {setCategory}
              setActiveItems={setActiveItems}
              setActiveTab={setActiveTab}
              curOrder = {curOrder}
            />
          }

        { Category !== null && 
          <MenuItems
            Category={Category}
            menuDatas={activeItems}
            ActiveTab={ActiveTab}
            setActiveTab={setActiveTab}
            setCategory = {setCategory}
            setCurOrder={setCurOrder}
            curOrder = {curOrder}
            setSubTotal={setSubTotal}
          />
        }
        </div>

        <div className="col-4 totalDiv">
          <h1>Current Order</h1>
          <CurrentOrder 
            curOrder = {curOrder}
            setCurOrder={setCurOrder}
            setSubTotal={setSubTotal}
            subTotal={subTotal}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
