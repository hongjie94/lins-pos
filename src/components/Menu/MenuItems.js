import homeIcon from '../../imgs/icons/homeIcon.svg';
import addIcon from '../../imgs/icons/extraIcon.svg';
import lunchIcon from '../../imgs/icons/lunchIcon.svg';
import drinkIcon from '../../imgs/icons/drinkIcon.svg';

const MenuItems = ({Category, menuDatas, ActiveTab, setActiveTab, setCategory}) => { 
  const tabClicked = (tab) => {
    setActiveTab(tab);
    setCategory(null);
  }
    let curIcon = null;
    switch (ActiveTab) {
      case "Main":
        curIcon = homeIcon;
      break;
      case "Lunch":
        curIcon = lunchIcon;
      break;
      case "Drinks":
        curIcon = drinkIcon;
      break;
      case "Add":
        curIcon = addIcon;
      break;
      default:
        curIcon = null;
      break;
    };
    return (
    <>
      { 
        Category && 
        <>
          <div className="menuItemHeader m-4 px-2">
          <img className="me-3" src={curIcon} alt="logo" />
          <h1 className="main activeM" onClick={() => {
                tabClicked(ActiveTab)
              }} >{ActiveTab} </h1>
            <h1 className="menuCat mx-2">
              / {Category}
            </h1>
          </div>
        <div className="allItemsDiv row m-4">
            {menuDatas.map((item, index) => (
              <div className="col-3 singleItem p-0" key={item.item_num}>           
              <div className='itemName'>
                <h6 className="lead m-0">{item.item_num}</h6>
                <span className="lead">{item.name}</span>
              </div>
            </div>
            ))}
          </div>
        </>
      }
    </>
    )
}
export default MenuItems;
