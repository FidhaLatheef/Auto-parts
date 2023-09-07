/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import { useState } from "react";

function ProfileInfoCard({ title, description, info, social, action }) {
  const fetchadminProfile=JSON.parse(localStorage.getItem("adminProfile"))
  const [adminProfile,setAdminProfile]=useState(fetchadminProfile)
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key into this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <SoftBox key={label} display="flex" py={1} pr={2}>
      <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </SoftTypography>
      <SoftTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </SoftTypography>
    </SoftBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <SoftBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </SoftBox>
  ));
  const handleEdit=async(id)=>{

  }

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        <SoftTypography component={Link} to={`/editProfile/${adminProfile.id}`} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon component={Link}
            to={`/editProfile/${adminProfile.id}`}>edit</Icon>
          </Tooltip>
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox mb={2} lineHeight={1}>
          <SoftTypography variant="button" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        </SoftBox>
        <SoftBox opacity={0.3}>
          <Divider />
        </SoftBox>
        <SoftBox>
          {renderItems}
          <SoftBox display="flex" py={1} pr={2}>
            <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </SoftTypography>
            {renderSocial}
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    id: PropTypes.string.isRequired, // Assuming id is a string, adjust the type if necessary
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileInfoCard;
