const graphql = require('graphql');
const Users = require('../models/users');
const Owners = require('../models/owners');
const Items = require('../models/items');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLList
} = graphql;


const UserType = new GraphQLObjectType({
    name : 'User',
    fields : () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        username : { type : GraphQLString },
        password : { type : GraphQLString },
        contact : { type : GraphQLString },
        address : { type : GraphQLString }
    })
});

const OwnerType = new GraphQLObjectType({
    name : 'Owner',
    fields : () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        email : { type : GraphQLString },
        password : { type : GraphQLString },
        mob : { type : GraphQLString },
        restname : { type : GraphQLString },
        restzip : { type : GraphQLString },
        cuisine : { type : GraphQLString }
    })
});

const ItemType = new GraphQLObjectType({
    name : 'Item',
    fields : () => ({
        id : { type : GraphQLID },
        restname : { type : GraphQLString },
        itemname : { type : GraphQLString },
        itemdescription : { type : GraphQLString },
        itemprice : { type : GraphQLFloat },
        section : { type : GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        user : {
            type : new GraphQLList(UserType),
            resolve(parent, args){
                return Users.find()
            }
        },
        owner : {
            type : new GraphQLList(OwnerType),
            resolve(parent, args){
                return Owners.find()
            }
        },
        restaurants : {
            type : new GraphQLList(OwnerType),
            resolve(parent, args){
                return Owners.find()
            }
        },
        item : {
            type : new GraphQLList(ItemType),
            resolve(parent, args){
                return Items.find()
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        signUpUser : {
            type : UserType,
            args : {
                name : { type : GraphQLString },
                username : { type : GraphQLString },
                password : { type : GraphQLString }
            },
            resolve(parent, args){
                let data = new Users({
                    name : args.name,
                    username : args.username,
                    password : args.password
                })
                return data.save();
            }
        },
        signUpOwner : {
            type : OwnerType,
            args : {
                name : { type : GraphQLString },
                email : { type : GraphQLString },
                password : { type : GraphQLString },
                restname : { type : GraphQLString },
                restzip : { type : GraphQLString },
                cuisine : { type : GraphQLString }
            },
            resolve(parent, args){
                let data = new Owners({
                    name : args.name,
                    email : args.email,
                    password : args.password,
                    restname : args.restname,
                    restzip : args.restzip,
                    cuisine : args.cuisine
                })
                return data.save();
            }
        },
        addSection : {
            type : ItemType,
            args : {
                restname : { type : GraphQLString },
                itemname : { type : GraphQLString },
                itemdescription : { type : GraphQLString },
                itemprice : { type : GraphQLFloat },
                section : { type : GraphQLString }
            },
            resolve(parent, args){
                let data = new Items({
                    restname : args.restname,
                    itemname : args.itemname,
                    itemdescription : args.itemdescription,
                    itemprice : args.itemprice,
                    section : args.section
                })
                return data.save();
            }
        },
        updateUserProfile : {
            type : UserType,
            args : {
                name : { type : GraphQLString },
                username : { type : GraphQLString },
                contact : { type : GraphQLString },
                address : { type : GraphQLString }
            },
            resolve(parent, args){
                let data = {
                    name : args.name,
                    username : args.username,
                    contact : args.contact,
                    address : args.address
                }
                let result = Users.findOneAndUpdate({ username : data.username}, data);
                return result;
            }
        },
        updateOwnerProfile : {
            type : OwnerType,
            args : {
                name : { type : GraphQLString },
                email : { type : GraphQLString },
                mob : { type : GraphQLString },
                restname : { type : GraphQLString },
                restzip : { type : GraphQLString },
                cuisine : { type : GraphQLString }
            },
            resolve(parent, args){
                let data = {
                    name : args.name,
                    email : args.email,
                    mob : args.mob,
                    restname : args.restname,
                    restzip : args.restzip,
                    cuisine : args.cuisine
                }
                let result = Owners.findOneAndUpdate({ email : data.email}, data);
                return result;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
})