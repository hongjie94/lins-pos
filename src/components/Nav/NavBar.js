import logo from '../../imgs/logo.svg';
import homeIcon from '../../imgs/icons/homeIcon.svg';
import lunchIcon from '../../imgs/icons/lunchIcon.svg';
import drinkIcon from '../../imgs/icons/drinkIcon.svg';
import extraIcon from '../../imgs/icons/extraIcon.svg';

const NavBar = ({ ActiveTab, setActiveTab, setCategory}) => {
  const tabClicked = (tab) => {
    setActiveTab(tab);
    setCategory(null);
  }

  return (
    <nav className="col-1 leftNav py-4">
      <div className="logo">
        <img src={logo} alt="logo" className="w-100" />
      </div>

      <div className={`icon mt-5 ${ActiveTab === "Main" ? "icon_active" : ""}`} 
      onClick={() => {
        tabClicked("Main")
      }}
      >
        <img src={homeIcon} alt="logo" />
        <span>MAIN</span>
      </div>

      <div className={`icon ${ActiveTab === "Lunch" ? "icon_active" : ""}`}
       onClick={() => {
        tabClicked("Lunch")
      }}>
        <img src={lunchIcon} alt="logo" />
        <span>LUNCH</span>
      </div>

      <div className={`icon  ${ActiveTab === "Drinks" ? "icon_active" : ""}`}

       onClick={() => {
        tabClicked("Drinks")
      }}>
        <img src={drinkIcon} alt="logo" />
        <span>DRINKS</span>
      </div>

      <div className={`icon  ${ActiveTab === "Others" ? "icon_active" : ""}`}
       onClick={() => {
        tabClicked("Others")
      }}>
        <img src={extraIcon} alt="logo" />
        <span>OTHERS</span>
      </div>
    </nav>
  );
};
export default NavBar;
