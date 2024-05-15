import { gql } from "@apollo/client";

export const SAVE_USER = gql`
mutation SaveUser (
    $userId: Int!
    $userName: String!
    $email: String!
    $phone: String!
    $userPassword: String!
    $created_at: DateTime
    $updated_at: DateTime
    $lastLogin: DateTime
    $registrationDate: DateTime
    $createdBy: Int!
    $updatedBy: Int!
    $roleId: Int!
) {
    saveUser(
        user: {
            userId: $userId
            userName: $userName
            email: $email
            phone: $phone
            userPassword: $userPassword
            created_at: $created_at
            updated_at: $updated_at
            lastLogin: $lastLogin
            registrationDate: $registrationDate
            createdBy: $createdBy
            updatedBy: $updatedBy
            roleId: $roleId
        }
    )
}
`;

export const BULK_DELETE_USERS = gql`
mutation BulkDeleteUsers($userIds: [Int!]!) {
    bulkDeleteUsers(userIds: $userIds)
}
`;