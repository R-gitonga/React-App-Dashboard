import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik"; 
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { SAVE_USER } from "../../mutations/mutations"; 
import { useMutation, useQuery } from "@apollo/client"; // Import hooks for mutations and queries
import { GET_ALL_USERS_WITH_ROLES } from "../../queries/queries"; // Import the query to fetch all users


// Function to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const initialValues = {
    userId: 0,
    userName: "",
    email: "",
    phone: "",
    userPassword: "",
    created_at: getCurrentDate(),
    updated_at: getCurrentDate(),
    lastLogin: getCurrentDate(),
    registrationDate: getCurrentDate(),
    createdBy: 0,
    updatedBy: 0,
    roleId: 0,
};

const phoneRegExp =  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    userName: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    userPassword: yup.string().required("required"),
    createdBy: yup.string().required("required"),
    updatedBy: yup.string().required("required"),
    roleId: yup.string().required("required"),

});
const Form = () => {
        const isNonMobile = useMediaQuery("(min-width:600px)");
    
        // Use the useMutation hook to execute the SAVE_USER mutation
        const [saveUserMutation] = useMutation(SAVE_USER);
        //fetch list of all users after creating new user
        const {refetch: refetchUsers } = useQuery(GET_ALL_USERS_WITH_ROLES, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "network-only",
        });

    
        const handleFormSubmit = async (values, {resetForm}) => {
        try {
            // Execute the SAVE_USER mutation to save the new user
            const response = await saveUserMutation({
            variables: {
                userId: values.userId,
                userName: values.userName,
                email: values.email,
                phone: values.phone,
                userPassword: values.userPassword,
                created_at: values.created_at,
                updated_at: values.updated_at,
                lastLogin: values.lastLogin,
                registrationDate: values.registrationDate,
                createdBy: values.createdBy,
                updatedBy: values.updatedBy,
                roleId: values.roleId,
                },
            });
            console.log(response);
            // Refetch the list of users after creating a new user
        const { data: updatedUsersData } = await refetchUsers();

        // Log the updated list of users to the console
        console.log("Updated Users Data:", updatedUsersData);
        resetForm();

        // Handle any further actions after successful user creation
    } catch (error) {
        // Handle error if the mutation fails
        console.error("Error creating user:", error);
    }

};


    return <Box m="20px">
        <Header title="CREATE USER" subtitle="Create a New User Profile" />
    
        <Formik 
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
            <Box 
                display="grid" 
                gap="30px" 
                gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
                sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
            >
                <TextField 
                fullWidth
                variant="filled"
                type="number"
                label="User Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userId}
                name="userId"
                error={!!touched.userId && !!errors.userId}
                helperText={touched.userId && errors.userId}
                sx={{ gridColumn: "span 4" }}
                />
                <TextField 
                fullWidth
                variant="filled"
                type="text"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 4" }}
                />
                <TextField 
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
                />
                <TextField 
                fullWidth
                variant="filled"
                type="text"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
                />
                <TextField 
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userPassword}
                name="userPassword"
                error={!!touched.userPassword && !!errors.userPassword}
                helperText={touched.userPassword && errors.userPassword}
                sx={{ gridColumn: "span 4" }}
                />
                <TextField 
                fullWidth
                variant="filled"
                type="number"
                label="Created By"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.createdBy}
                name="createdBy"
                error={!!touched.createdBy && !!errors.createdBy}
                helperText={touched.createdBy && errors.createdBy}
                sx={{ gridColumn: "span 4" }}
                />
                <TextField 
                fullWidth
                variant="filled"
                type="number"
                label="Updated By"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.updatedBy}
                name="updatedBy"
                error={!!touched.updatedBy && !!errors.updatedBy}
                helperText={touched.updatedBy && errors.updatedBy}
                sx={{ gridColumn: "span 4" }}
                />
                <TextField 
                fullWidth
                variant="filled"
                type="number"
                label="Role Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roleId}
                name="roleId"
                error={!!touched.roleId && !!errors.roleId}
                helperText={touched.roleId && errors.roleId}
                sx={{ gridColumn: "span 4" }}
                />
                {/* Add additional fields here as needed */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                Create New User
                </Button>
            </Box>
            </form>
        )}
        </Formik>
    </Box>
}

export default Form;