import data from "../../data.json";
import homeIcon from '../../imgs/icons/homeIcon.svg';

const Main = ({setCategory, setActiveItems, setActiveTab}) => {
    const categories = data.categories
    const itemClicked = (name) => {
      setCategory(name);
      setActiveTab("Main")
      switch (name) {
        case "Appetizers":
          setActiveItems(data.appetizers);
        break;
        case "Soups & Salads":
          setActiveItems(data.soups_salads);
        break;
        case "Baked Rice":
          setActiveItems(data.bakeRice);
        break;
        case "Chinese Dinner":
          setActiveItems(data.chineseDinner);
        break;
        case "Hibachi Dinner":
          setActiveItems(data.hibachiDinner);
        break;
        case "Specil Roll":
          setActiveItems(data.specilRoll);
        break;
        case "Sushi or Sashimi":
          setActiveItems(data.sushi_sashimi);
        break;
        case "Sushi Combination":
          setActiveItems(data.sushi_combo);
        break;
        case "Classic Rolls":
          setActiveItems(data.classicRolls);
        break;
      
        default:
          setActiveItems(null);
        break;
      };
    };
    return (
      <>
        <div className="menuItemHeader m-4 px-2">
          <img className="me-3" src={homeIcon} alt="logo" />
          <h1 className="main">Main</h1>
        </div>
        <div className="allItemsDiv row m-4">
          {categories.map((name, index) => (
            <div className="col-3 singleItem p-0" key={index}>           
            <div className='itemName' onClick={() => {
                itemClicked(name)
              }} >
              <span className="lead mainSpan">{name}</span>
            </div>
          </div>
          ))}
        </div>
      </>
    )
}
export default Main;