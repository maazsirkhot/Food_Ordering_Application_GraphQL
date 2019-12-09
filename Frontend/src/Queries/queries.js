import { gql } from 'apollo-boost';

const getUserQuery = gql`
    {
        query getUser($username : String) {
            user(username : $username){
                id
                name
                username
                password
                contact
                address
            }
        }
    }    
`
const getOwnerQuery = gql`
    {
        query getOwner($email : String) {
            owner(email : $email){
                id
                name
                email
                password
                mob
                restname
                restzip
                cuisine
            }
        }
    }    
`
const getRestaurantsQuery = gql`
    {
        query getRestaurants{
            restaurants{
                restname
                restzip
                cuisine
            }
        }
    }
`

const getItemsQuery = gql`
    {
        query getItems($restname : String){
            item(restname : $restname){
                id
                restname
                section
                itemname
                itemprice
                itemdescription
            }
        }
    }
`
export {
    getUserQuery,
    getOwnerQuery,
    getRestaurantsQuery,
    getItemsQuery
}