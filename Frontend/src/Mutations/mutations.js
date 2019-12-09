import { gql } from 'apollo-boost';

const addUserMutation = gql`
    mutation AddUser($name : String, $username : String, $password : String){
        signUpUser(name : $name, username : $username, password : $password){
            name
            id
            username
        }
    }
`
const addOwnerMutation = gql`
    mutation AddOwner($name : String, $email : String, $password : String, $restname : String, $restzip : String, $cuisine : String){
        signUpOwner(name : $name, email : $email, password : $password, restname : $restname, restzip : $restzip, cuisine : $cuisine){
            name
            id
            email
            restname
            restzip
            cuisine
        }
    }
`

const updateUserMutation = gql`
    mutation UpdateUser($name : String, $username : String, $address : String, $contact : String){
        updateUserProfile(name : $name, username : $username, address : $address, contact : $contact){
            name
            id
            username
        }
    }
`

const updateOwnerMutation = gql`
    mutation UpdateOwner($name : String, $email : String, $mob : String, $restname : String, $restzip : String, $cuisine : String){
        updateOwnerProfile(name : $name, email : $email, mob : $mob, restname : $restname, restzip : $restzip, cuisine : $cuisine){
            name
            id
            email
            restname
        }
    }
`

const addSectionMutation = gql`
    mutation AddSection($restname : String, $itemname : String, $itemdescription : String, $itemprice : Float, $section : String){
        addSection(restname : $restname, itemname : $itemname, itemdescription : $itemdescription, itemprice : $itemprice, section : $section){
            restname
            itemname
            itemdescription
            itemprice
            section
        }
    }
`

export {
    addUserMutation,
    addOwnerMutation,
    updateUserMutation,
    updateOwnerMutation,
    addSectionMutation
}