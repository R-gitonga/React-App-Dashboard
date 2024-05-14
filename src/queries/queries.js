import { gql } from "@apollo/client";

export const GET_ALL_USERS_WITH_ROLES = gql`
    query {
        userRole {
            userId
            userName
            email
            phone
            userPassword
            created_at
            updated_at
            lastLogin
            registrationDate
            createdBy
            updatedBy
            roleId
            role {
                roleId
                roleName
            }
        }
    }
`;
