import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import { GET_ALL_USERS_WITH_ROLES, GET_ALL_ROLES } from "../../../queries/queries";
import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { BULK_DELETE_USERS } from "../../../mutations/mutations";

const TeamWithDatabase = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [adminRoleId, setAdminRoleId] = useState(null);
    const [error, setError] = useState("");

    const { data: rolesData, loading: rolesLoading, error: rolesError } = useQuery(GET_ALL_ROLES);
    const [bulkDeleteUsers] = useMutation(BULK_DELETE_USERS, {
        refetchQueries: [{ query: GET_ALL_USERS_WITH_ROLES }],
    });

    // Fetch the Admin role ID once roles data is loaded
    useEffect(() => {
        if (rolesData && rolesData.userRole) {
            const adminRole = rolesData.userRole.find(roleData => roleData.role.roleName === "Admin");
            if (adminRole) {
                setAdminRoleId(adminRole.role.roleId);
            }
        }
    }, [rolesData]);

    const handleDeleteClick = async () => {
        const enteredRoleId = prompt("Enter your role ID:");
        if (enteredRoleId && parseInt(enteredRoleId) === adminRoleId) {
            const enteredUserIds = prompt("Enter the list of user IDs to delete (comma separated):");
            if (enteredUserIds) {
                const userIdArray = enteredUserIds.split(",").map(id => parseInt(id.trim()));
                try {
                    await bulkDeleteUsers({ variables: { userIds: userIdArray } });
                    alert("Users deleted successfully!");
                } catch (error) {
                    console.error("Error deleting users:", error);
                    setError("Error deleting users");
                }
            } else {
                setError("Invalid input for user IDs");
            }
        } else {
            setError("Invalid role ID");
        }
    };

    // Fetch users data
    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(GET_ALL_USERS_WITH_ROLES);

    if (usersLoading || rolesLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error: {usersError.message}</p>;
    if (rolesError) return <p>Error: {rolesError.message}</p>;

    const columns = [
        { field: "userId", headerName: "User ID" },
        { field: "userName", headerName: "User Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phone", headerName: "Phone Number", flex: 1 },
        { field: "userPassword", headerName: "Password", align: "left" },
        { field: "created_at", headerName: "Created At", align: "left" },
        { field: "updated_at", headerName: "Updated At", align: "left" },
        { field: "lastLogin", headerName: "Last Login", align: "left" },
        { field: "registrationDate", headerName: "Registration Date", align: "left" },
        { field: "createdBy", headerName: "Created By", type: "number", align: "center" },
        { field: "updatedBy", headerName: "Updated By", type: "number", align: "center" },
        {
            field: "role",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row }) => {
                const { role } = row;

                let icon;
                let backgroundColor;

                if (!role) {
                    return (
                        <Box
                            width="60%"
                            m="0 auto"
                            p="5px"
                            justifyContent="center"
                            backgroundColor={colors.grey[100]}
                            borderRadius="4px"
                        >
                            <Typography color={colors.grey[500]} sx={{ ml: "5px" }}>
                                Unknown
                            </Typography>
                        </Box>
                    );
                }

                switch (role.roleName) {
                    case "Admin":
                        icon = <AdminPanelSettingsOutlinedIcon />;
                        backgroundColor = colors.greenAccent[600];
                        break;
                    case "Organizer":
                        icon = <SecurityOutlinedIcon />;
                        backgroundColor = colors.greenAccent[700];
                        break;
                    case "Attendee":
                        icon = <LockOpenOutlinedIcon />;
                        backgroundColor = colors.greenAccent[800];
                        break;
                    default:
                        icon = null;
                        backgroundColor = colors.grey[100];
                }
                return (
                    <Box
                        width="70%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor={backgroundColor}
                        borderRadius="4px"
                    >
                        {icon}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {role.roleName}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members from Database" />
            <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
                Delete
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .name-column--cell": { color: colors.greenAccent[300] },
                    "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[500]} !important` },
                }}
            >
                <DataGrid rows={usersData.userRole} columns={columns} getRowId={(row) => row.userId} slots={{ toolbar: GridToolbar }} />
            </Box>
        </Box>
    );
};

export default TeamWithDatabase;
