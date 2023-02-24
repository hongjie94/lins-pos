
import NavBar from './components/Nav/NavBar'
import MenuItems from './components/Menu/MenuItems';

import Main from './components/Tabs/Main';
import Lunch from './components/Tabs/Lunch';
import Drinks from './components/Tabs/Drinks';
import Others from './components/Tabs/Others';
import CurrentOrder from './components/Settle/CurrentOrder';
import { useState, useEffect } from 'react';

import './App.css';

function App() {

const [ActiveTab, setActiveTab] = useState('Main');
const [Category, setCategory] = useState(null);
const [activeItems, setActiveItems] = useState(null);
const [curOrder, setCurOrder] = useState(null);
const [subTotal, setSubTotal] = useState(0);
const [saleTax, setSaleTax] = useState(0);
const [ativeTableItem, setAtiveTableItem] = useState(null);

useEffect(() => {
  setCurOrder(JSON.parse(localStorage.getItem('curOrder')));
  setSubTotal((localStorage.getItem('OrderSubTotal')));
  setSaleTax((localStorage.getItem('SaleTax')));
}, []);

  return (
    <div className="App container-fluid">
      <div className="row">
        
        <nav className="col-1 leftNav py-4">
          <NavBar 
            setActiveTab={setActiveTab}
            ActiveTab={ActiveTab}
            setCategory = {setCategory}
          />
        </nav>

        <main className="col-7 menuItem py-4 scroller">
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

          { ActiveTab === "Drinks" && Category === null && 
            <Drinks 
              setCategory = {setCategory}
              setActiveItems={setActiveItems}
              setActiveTab={setActiveTab}
            />
          }

          { ActiveTab === "Others" && Category === null && 
            <Others 
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
              setCurOrder={setCurOrder}
              curOrder = {curOrder}
              setSubTotal={setSubTotal}
              setSaleTax={setSaleTax}
              ativeTableItem ={ativeTableItem}
              setAtiveTableItem ={setAtiveTableItem}
            />
          }
        </main>

        <aside className="col-4 totalDiv">
          <CurrentOrder 
            curOrder = {curOrder}
            setCurOrder={setCurOrder}
            setSubTotal={setSubTotal}
            subTotal={subTotal}
            saleTax={saleTax}
            setSaleTax={setSaleTax}
            ativeTableItem ={ativeTableItem}
            setAtiveTableItem ={setAtiveTableItem}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
