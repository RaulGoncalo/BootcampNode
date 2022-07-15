import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } from "graphql";

const Order = new GraphQLObjectType({
    name: "Order",
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        client: {
            type: GraphQLString
        },
        food: {
            type: GraphQLString
        },
        value: {
            type: GraphQLFloat
        },
        delivery: {
            type: GraphQLBoolean
        },
        timestamp:{
            type: GraphQLString
        }
    })
});


export default Order;