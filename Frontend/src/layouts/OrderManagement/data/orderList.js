/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import SoftButton from "components/SoftButton";
import { Dialog, DialogTitle, TableContainer, TableRow } from "@mui/material";
import { DialogContent } from "@material-ui/core";
import { Table } from "react-bootstrap";

function data() {
  const [order, setOrder] = useState([]);
  const [open,setOpen]=useState(false)

  useEffect(() => {
    fetchOrderLists();
  }, []);

  const fetchOrderLists = async () => {
    axios.get("http://localhost:8000/user/orderLists")
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        if (error.response.status == "401") {
          window.location.href = "authentication/sign-in";
        }
      });
  }

  // const handleDelete = async (id) => {
  //   const confirmed = window.confirm('Are you sure want to delete?');
  //   if (confirmed) {
  //     try {
  //       await axios.delete(`http://localhost:8000/admin/delete/${id}`);
  //       console.log('deleted');
  //       fetchAdminUsers();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  const Date = ({ date }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {date}
      </SoftTypography>
    </SoftBox>
  );

  const OrderID = ({ orderId }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {orderId}
      </SoftTypography>
    </SoftBox>
  );
  const Name = ({ name }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {name}
      </SoftTypography>
    </SoftBox>
  );
  const Items = ({ items }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {items}
      </SoftTypography>
    </SoftBox>
  );

  const Quantity = ({ quantity }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {quantity}
      </SoftTypography>
    </SoftBox>
  );
  const Total = ({ total }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h5" color="text">
        {total}
      </SoftTypography>
    </SoftBox>
  );
  const DateFromOrderId = (orderId) => {
    const year = orderId.substring(0, 4);
    const month = orderId.substring(4, 6);
    const day = orderId.substring(6, 8);

    return `${year}-${month}-${day} `;
  };
  const handleopen =()=>{
    setOpen(true)
  }
  


  return {

    columns: [
      { name: "date", align: "left" },
      { name: "orderId", align: "left" },
      { name: "name", align: "left" },
      { name: "items", align: "center" },
      { name: "quantity", align: "center" },
      { name: "total", align: "center" },
      { name: "action", align: "center" },
    ],

    rows: order.map((item) => ({
      date: <Date date={DateFromOrderId(item.orderId)} />,
      orderId: <OrderID orderId={item.orderId} />,
      name: <Name name={item.billingDetails.name} />,
      items: <Items items={item.cartItem.length} />,
      quantity: (
        <Quantity
          quantity={
            item.cartItem.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0)
          }
        />
      ),
      total: <Total total={item.total} />,
      action: (
        <SoftBox>
          <SoftButton color="info" size="small" 
           onClick={handleopen}
            style={{ marginRight: '8px' }}>
            View
          </SoftButton>
          <Dialog
          open={open}
          close={close}
          fullWidth
          >
            <DialogTitle>
              Order Details
            </DialogTitle>
            <DialogContent>
              
            </DialogContent>

          </Dialog>

        </SoftBox>
      ),

    })),
  };

}


export default data;
