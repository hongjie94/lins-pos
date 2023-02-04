import data from "../../data.json";
import lunchIcon from '../../imgs/icons/lunchIcon.svg';

const Lunch = ({setCategory, setActiveItems, setActiveTab}) => {
    const categories = ["Chinese Entrees", "Hibachi Entrees"]
    const itemClicked = (name) => {
      setCategory(name);
      setActiveTab("Lunch");
      switch (name) {
        case "Hibachi Entrees":
          setActiveItems(data.lunchSpecil_hibachi);
        break;
        case "Chinese Entrees":
          setActiveItems(data.lunchSpecil_chinese);
        break;
        default:
          setActiveItems(null);
        break;
      };
    };
    return (
      <>
        <div className="menuItemHeader m-4 px-2">
          <img className="me-3" src={lunchIcon} alt="logo" />
          <h1 className="main">Lunch Specil</h1>
        </div>
        <div className="allItemsDiv row m-4">
          {categories.map((name, index) => (
            <div className="col-3 singleItem p-0" key={index}>           
            <div className='itemName' onClick={() => {
                itemClicked(name)
              }} >
              <span className="lead">{name}</span>
            </div>
          </div>
          ))}
        </div>
      </>
    )
}
export default Lunch;