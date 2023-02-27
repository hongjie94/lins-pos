import axios from 'axios';
import drawerIcon from '../../imgs/icons/drawer.png';
import {useState} from 'react';
import Spinner from 'react-bootstrap/Spinner';


const CurrentOrder = ({ curOrder, setCurOrder, subTotal, setSubTotal, setSaleTax, ativeTableItem, setAtiveTableItem }) => {
  const [loading, setloading] = useState(false);


  const orderDatePrefix = ()=> {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const orderDate = (currentDate.getMonth() + 1).toString().padStart(2, '0') + currentDay.toString().padStart(2, '0') +  currentDate.getFullYear().toString().slice(-2);
    return orderDate;
  }

  const saveOrderNum = ()=> {
    const localStorageOrderNum = localStorage.getItem('orderNum');
    if(localStorageOrderNum) {
      const LSorderDate = localStorageOrderNum.substring(0,6);
      const LSorderNum = localStorageOrderNum.substring(6);
      if(LSorderDate === orderDatePrefix()) {
        const updateOrderNum = parseInt(LSorderNum) + 1;
        localStorage.setItem("orderNum", (orderDatePrefix() + updateOrderNum))
      }else {
        localStorage.setItem("orderNum", orderDatePrefix() + 1);
      }
    }else {
      localStorage.setItem("orderNum", (orderDatePrefix() + 1));
    }
  }
 
  const clearOrder = () => {
     setCurOrder(null);
     setSubTotal(0);
     setSaleTax(0);
     localStorage.removeItem("curOrder");
     localStorage.removeItem("OrderSubTotal");
     localStorage.removeItem("SaleTax");
  };

  const settleOrder = async (p_subTotal, p_tax, p_total) => {
    // await axios
    // save order number
    saveOrderNum();
    // clear orders from state and local storage
    clearOrder();
    
    let today = new Date().toLocaleString();
    const baseUrl = 'http://localhost:8888/sendRecepit'
    const localStorageOrderNum = localStorage.getItem('orderNum');
    const sendReceipt = async () =>{
      await axios({
        method: "POST",
        url: baseUrl,
        data: {
          orderNumber: localStorageOrderNum,
          order: curOrder,
          subTotal: p_subTotal,
          tax: p_tax,
          total: p_total,
          today: today
        }
      }).then((res) => {
        if(res.data === 'ok') {
          // alert('ok')
        }
      }).catch((err)=> {
        console.error(err);
      });
    };
    sendReceipt();
    // Todo: replace alert and add loading Animation
    // alert("ok");
  };

  const openDrawer = async () => {
    setloading(true);
    const baseUrl = 'http://localhost:8888/openCashDrawer';
    const runCommand = async () =>{
      await axios({
        method: "POST",
        url: baseUrl
      }).then((res) => {
        if(res.data === 'ok') {
        }
      }).catch((err)=> {
        console.error(err);
      });
    };
    runCommand();
    setTimeout(() => {  
      setloading(false);
    }, 500);
  }

  const updateQty = (index, order, method) => {
    if(method === "Add"){
      curOrder[index].qty = Number(order.qty + 1);
      localStorage.setItem("curOrder", JSON.stringify(curOrder));
      setCurOrder(curOrder);
      let newTotal = Number(subTotal) +  Number(order.price);
      localStorage.setItem("OrderSubTotal", newTotal);
      setSubTotal(newTotal);
      let calSaleTax =  Number(newTotal * 0.08)
      localStorage.setItem("SaleTax", calSaleTax);
      setSaleTax(calSaleTax);
    }

    if(method === "Remove"){   
      if(curOrder[index].qty === 1){
        if(curOrder.length === 1){
          return clearOrder();
        }
        let newOrderArr = curOrder.filter((e)=>{
          return order !== e;
        })
        if(newOrderArr !== null){
          localStorage.setItem("curOrder", JSON.stringify(newOrderArr));
          setCurOrder(newOrderArr);
          let newTotal = Number(subTotal - order.price);
          let calSaleTax =  Number(newTotal * 0.08)
          localStorage.setItem("OrderSubTotal", newTotal);
          localStorage.setItem("SaleTax", calSaleTax);
          setSubTotal(newTotal);
          setSaleTax(calSaleTax);
        }
      }else {
        curOrder[index].qty--;
        localStorage.setItem("curOrder", JSON.stringify(curOrder));
        setCurOrder(curOrder);
        let newTotal =  Number(subTotal - order.price);
        let calSaleTax =  Number(newTotal * 0.08);
        localStorage.setItem("OrderSubTotal", newTotal);
        localStorage.setItem("SaleTax", calSaleTax);
        setSubTotal(newTotal);
        setSaleTax(calSaleTax);
      }
    }
  };

  return (
    <>
      {loading && <div className="LoadingPage">
        <Spinner animation="border" role="status">
        </Spinner>
      </div>
      }
      <h1 className="mt-0 mb-0">Current Order</h1>
      <h1 className="mb-3">
        # {localStorage.getItem('orderNum') ? 
        (parseInt(localStorage.getItem('orderNum').substring(6)) + 1).toString().padStart(3,0) 
        : "001"}
      </h1>
      <div className="totalBox">
        <div className="tableDiv">
          {/* Body */}
          
          <table className="table table-hover">
            <tbody>
              {curOrder &&
                curOrder.map((order, index) => (
                  <tr key={index} className={ativeTableItem === index ? "table-active" : ""}
                  onClick={()=>{setAtiveTableItem(index)}}
                    >
                    <td id={`row_${index}`}>
                      { ( order.orderNum.substring(0, 4) === "drin" || 
                          order.orderNum.substring(0, 4) === "side" ||
                          order.orderNum.substring(0, 4) ==="part") ? 
                        <>
                          { order.orderNum.substring(0, 7) === "side_3p" ?
                            <>
                              { order.itemName.includes("Lo Mein") && order.orderNum.substring(0, 7) === "side_3p" ? 
                                <>
                                  Lo Mein (w. 3 protein)
                                  <span className="choices">{order.itemName.replace("Lo Mein (w. 3 proteins)", "")}</span>
                                </> 
                                :
                                <>
                                  Fried Rice (w. 3 protein)
                                  <span className="choices">{order.itemName.replace("Fried Rice (w. 3 proteins)", "")}</span>
                                </> 
                              }             
                            </>
                            :
                            <>{order.itemName}</>
                          }
                         
                        </>
                        :
                        <div>
                          {(order.itemName.slice(-15) === "(w. White Rice)") && (order.orderNum !== "h7" && order.orderNum !== "L7") ?
                            <>
                              {order.orderNum}. {order.itemName.slice(0, -15)}
                              <span className="withWr">
                                {order.itemName.slice(-15)}
                              </span>
                            </>
                            :
                            <>
                           
                            {order.orderNum === "b9" && 
                              <>
                                {order.itemName.substring(0,24)}
                                <span className="choices">{order.itemName.replace(order.itemName.substring(0,24), '')}</span>
                              </>
                            }
                            
                            { order.orderNum === "c9" && 
                              <>
                                { order.itemName.includes("Lo Mein") ? 
                                  <>
                                    c9. Lo Mein (w. 2 protein)
                                    <span className="choices">{order.itemName.replace("Lo Mein (w. 2 proteins) ", "")}</span>
                                  </> 
                                  :
                                  <>
                                    c9. Fried Rice (w. 2 protein)
                                    <span className="choices">{order.itemName.replace("Fried Rice (w. 2 proteins) ", "")}</span>
                                  </> 
                                }             
                              </>
                            }

                        
                            {order.orderNum === "L7" && 
                              <>
                                L7. {order.itemName.substring(0,27)}
                                {order.itemName.includes("(w. White Rice)") ?
                                <>
                                  <span className="choices">{order.itemName.replace("Lunch Hibachi Choice of Two", "").replace("(w. White Rice)", "")}</span>
                                  <span className="withWr">
                                    (w. White Rice)
                                  </span>
                                </>
                                  :
                                  <span className="choices">{order.itemName.replace("Lunch Hibachi Choice of Two", "")}</span>
                                }
                              </>
                            }

                            {order.orderNum === "h7" && 
                              <>
                                h7. {order.itemName.substring(0,28)}
                                {order.itemName.includes("(w. White Rice)") ?
                                <>
                                  <span className="choices">{order.itemName.replace("Dinner Hibachi Choice of Two", "").replace("(w. White Rice)", "")}</span>
                                  <span className="withWr">
                                    (w. White Rice)
                                  </span>
                                </>
                                  :
                                  <span className="choices">{order.itemName.replace("Dinner Hibachi Choice of Two", "")}</span>
                                }
                              </>
                            }

                            {  
                              (order.orderNum !== "b9" &&
                              order.orderNum !== "c9" &&
                              order.orderNum !== "side_3p" &&
                              order.orderNum !== "L7" &&
                              order.orderNum !== "h7")
                              &&
                              <>
                               {order.orderNum}. {order.itemName}
                              </>
                            } 
                            
                            </>
                           }
                        </div>
                      }
                       {(order.price) !== "0.00"  &&
                        <div>${order.price}</div>
                       }
                    </td>
                    {(order.price) !== "0.00" ?
                    <td className="itemNumDiv">
                      <div className="itemNumWrap">
                        <span
                          className="addItem"
                          onClick={() => {
                            updateQty(index, order, "Add");
                          }}
                        >
                          +
                        </span>
                        <span className="qty">{order.qty}</span>
                        <span
                          className="removeItem"
                          onClick={() => {
                            updateQty(index, order,"Remove");
                          }}>
                          -
                        </span>
                      </div>
                    </td>
                    :
                    <td className="itemNumDiv">
                    <div className="itemNumWrap">
                      <span
                        className="h3 removeItem"
                        onClick={() => {
                          updateQty(index, order,"Remove");
                        }}>
                       -
                      </span>
                    </div>
                  </td>
                  }
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="totalFooter px-3">
          <div className="preSubDiv">
            <h6 className="text-muted">Subtotal</h6>
            <strong>${subTotal && subTotal > 0 ? Number(subTotal).toFixed(2) : "0.00"}</strong>
          </div>
          <div className="preSubDiv">
            <h6 className="text-muted">Total sales tax (8.00%)</h6>
            <strong>${ subTotal?  (Number(subTotal)*0.08).toFixed(2): "0.00" }</strong>
          </div>
          <hr />
          <div className="h3 totalubDiv">
            <span>Total</span>

            <span>
              ${subTotal && subTotal > 0 ? (Number(subTotal) + (Number(subTotal)*0.08)).toFixed(2) : "0.00"}
            </span>
          </div>
          <div className='curOrderBtns'>
          <div className={`icon openDrawerIcon`}
              onClick={() => {
                openDrawer();
              }}>
              <img src={drawerIcon} alt="logo" />
            </div>
            <button
              type="button"
              disabled={ !subTotal }
              className="btn btn-outline-danger mt-2 settleBtn"
              onClick={() => {
                window.confirm('Settle Current Order ?')
                && settleOrder(
                  Number(subTotal).toFixed(2),
                  (Number(subTotal)*0.08).toFixed(2),
                  (Number(subTotal) + (Number(subTotal)*0.08)).toFixed(2)
                );
              }}
            >
              <strong>Settle</strong>
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
};
export default CurrentOrder;
