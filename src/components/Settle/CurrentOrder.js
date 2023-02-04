import { useState } from "react";

const CurrentOrder = ({ curOrder, setCurOrder, subTotal, setSubTotal }) => {
  const [discount, setDiscount] = useState(0);
  const [saleTax, setSaleTax] = useState(0);

  const settleOrder = () => {
    localStorage.removeItem("curOrder");
    localStorage.removeItem("OrderSubTotal");
    setCurOrder(null);
    setSubTotal(0);
    // Todo: replace alert and add loading Animation
    alert("ok");
  };

  const updateQty = (index, order, method) => {
    if(method === "Add"){
      curOrder[index].qty++;
      localStorage.setItem("curOrder", JSON.stringify(curOrder));
      setCurOrder(curOrder);
      localStorage.setItem("OrderSubTotal", subTotal+ order.price);
      setSubTotal(subTotal+ order.price);
    }
    if(method === "Remove"){
      if(curOrder[index].qty === 1){
        let newOrderArr = curOrder.filter((e)=>{
          return order !== e;
        })
        localStorage.setItem("curOrder", JSON.stringify(newOrderArr));
        setCurOrder(newOrderArr);
        localStorage.setItem("OrderSubTotal", subTotal - order.price);
        setSubTotal(subTotal - order.price);
      }else {
        if( subTotal - order.price <= 0 ){
          localStorage.removeItem("curOrder");
          localStorage.removeItem("OrderSubTotal");
          setCurOrder(null);
          setSubTotal(0);
        }else {
          curOrder[index].qty--;
          localStorage.setItem("curOrder", JSON.stringify(curOrder));
          setCurOrder(curOrder);
          localStorage.setItem("OrderSubTotal", subTotal - order.price);
          setSubTotal(subTotal - order.price);
        }
      }
    }
  };
  return (
    <>
      <div className="totalBox">
        <div className="tableDiv">
          <table className="table table-hover">
            <tbody>
              {curOrder &&
                curOrder.map((order, index) => (
                  <tr key={index} className={curOrder.length -1 === index ? "table-active": ""}>
                    <td id={`row_${index}`}>
                      {order.orderNum}. {order.itemName}
                      <div>${order.price}</div>
                    </td>
                    <td className="itemNumDiv">
                      <div className="itemNumWrap">
                        <span
                          className="h3 addItem"
                          onClick={() => {
                            updateQty(index, order, "Add");
                          }}
                        >
                          +
                        </span>
                        <span className="qty">{order.qty}</span>
                        <span
                          className="h3 removeItem"
                          onClick={() => {
                            updateQty(index, order,"Remove");
                          }}>
                          -
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="totalFooter px-3">
          <div className="preSubDiv">
            <h6 className="text-muted">Subtotal</h6>
            <strong>${subTotal && subTotal > 0 ? subTotal.toFixed(2) : "0.00"}</strong>
          </div>
          <div className="preSubDiv">
            <h6 className="text-muted"> Discount sales</h6>
            <strong> - ${discount.toFixed(2)}</strong>
          </div>
          <div className="preSubDiv">
            <h6 className="text-muted">Total sales tax</h6>
            <strong>${saleTax.toFixed(2)}</strong>
          </div>
          <hr />
          <div className="h3 totalubDiv">
            <span>Total</span>

            <span>
              ${subTotal && subTotal > 0 ? (subTotal + saleTax - discount).toFixed(2) : "0.00"}
            </span>
          </div>
          <button
            type="button"
            className="btn btn-outline-danger w-100 mt-2"
            onClick={() => {
              window.confirm('Settle Current Order ?') && settleOrder();
            }}
          >
            <strong>Settle</strong>
          </button>
        </div>
      </div>
    </>
  );
};
export default CurrentOrder;
