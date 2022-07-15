import { GraphQLObjectType, GraphQLSchema } from 'graphql';


const Schema = new GraphQLSchema({
    types: null,
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields:{}
    }),

    mutation: new GraphQLObjectType({
        name: "RootMutation",
        fields:{}
    })
});


export default Schema