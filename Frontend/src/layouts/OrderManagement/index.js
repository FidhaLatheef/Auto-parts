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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/OrderManagement/data/orderList";
import SoftButton from "components/SoftButton";
import { Grid } from "@mui/material";

function Tables() {
    const { columns, rows } = authorsTableData();

    // const handleCreate = () => {
    //     window.location.href = '/addUser';
    // };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox display="flex" justifyContent="flex-end" alignItems="center" p={3}>
                {/* <SoftButton variant="gradient" color="secondary" onClick={handleCreate}>
                    Create
                </SoftButton> */}
            </SoftBox>
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
                                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3} style={{backgroundColor: "#74c3ed"}}>
                                    <SoftTypography variant="h6" color="white">Order Details</SoftTypography>
                                </SoftBox>
                                <SoftBox
                                    sx={{
                                        "& .MuiTableRow-root:not(:last-child)": {
                                            "& td": {
                                                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                                    `${borderWidth[1]} solid ${borderColor}`,
                                            },
                                        },
                                    }}
                                >
                                    <Table columns={columns} rows={rows} />
                                </SoftBox>
                            </Card>
                        </Grid>
                    </Grid>
                </SoftBox>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Tables;
