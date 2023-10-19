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

function data() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    axios.get("http://localhost:8000/user/userList")
      .then((response) => {
        setUsers(response.data);

      })
      .catch((error) => {
        if (error.response.status == "401") {
          window.location.href = "authentication/sign-in";
        }
      });
  }
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure want to delete?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/user/delete/${id}`);
        console.log('deleted');
        fetchUsers();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const User = ({ image, name }) => (
    <SoftBox display="flex" alignItems="center" px={1} py={1.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="lg" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="h5" >
          {name}
        </SoftTypography>
        {/* <SoftTypography variant="h6" color="secondary">
          {role}
        </SoftTypography> */}
      </SoftBox>
    </SoftBox>
  );

  const Email = ({ email, mobile }) => (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="h6" color="text">
        {email}
      </SoftTypography>
      <SoftTypography variant="h6" color="secondary">
        {mobile}
      </SoftTypography>
    </SoftBox>
  );
//   const Location = ({ location }) => (
//     <SoftBox display="flex" flexDirection="column">
//       <SoftTypography variant="h5" color="text">
//         {location}
//       </SoftTypography>
//     </SoftBox>
//   );


  return {

    columns: [
      { name: "user", align: "left" },
      { name: "contact", align: "left" },
    //   { name: "location", align: "left" },
      { name: "edit", align: "center" },
      { name: "remove", align: "center" },
    ],

    rows: Users.map((item) => ({
      user: <User image={`http://localhost:8000/${item.image}`} name={item.name} />,
      contact: <Email email={item.email} mobile={item.mobile} />,
    //   location: <Location location={item.location} />,
      edit: (
        <SoftBox>
          <SoftButton  size="small" component={Link}
            to={`/editUser/${item._id}`}
            style={{ marginRight: '8px', backgroundColor:"#a36f77",color:"white" }}>
            Edit
          </SoftButton>
        </SoftBox>
      ),
      remove: (
        <SoftBox>
          <SoftButton style={{backgroundColor:"#9e9d9e",color:"white"}} size="small" onClick={() => handleDelete(item._id)}>
            Remove
          </SoftButton>
        </SoftBox>
      ),
    })),
  };

}


export default data;
