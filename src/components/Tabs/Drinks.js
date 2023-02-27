import data from "../../data.json";

const Drinks = ({setCategory, setActiveItems, setActiveTab}) => {
  setCategory('drinks');
  setActiveTab("Drinks");
  setActiveItems(data.drinks);               
}
export default Drinks;