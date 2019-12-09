import { gql } from 'apollo-boost';

const getUserQuery = gql`
    {
        user{
            id
            name
            username
            password
            contact
            address
        }
    } 
`;

const getOwnerQuery = gql`
{   owner{
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
`;

const getRestaurantsQuery = gql`
{    restaurants{
        restname
        restzip
        cuisine
    }
}
`;

const getItemsQuery = gql` 
{    item{
        id
        restname
        section
        itemname
        itemprice
        itemdescription
    }
}
`;

export {
    getUserQuery,
    getOwnerQuery,
    getRestaurantsQuery,
    getItemsQuery
}