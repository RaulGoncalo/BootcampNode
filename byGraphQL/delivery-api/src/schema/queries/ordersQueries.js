import { GraphQLList, GraphQLInt, GraphQLString, GraphQLFloat } from 'graphql';
import Order from '../types/Order';
import OrderResolves from '../resolves/orderResolves.js';

const orderQueries = {
    getOrders: {
        type: new GraphQLList(Order),
        resolve: () => OrderResolves.getOrders()
    },

    getOrder: {
        type: Order,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve: (_, args) => OrderResolves.getOrder(args.id)
    },

    amountOrderClient: {
        type: GraphQLFloat,
        args: {
            client: {
                name: "client",
                type: GraphQLString
            }
        },
        resolve: (_, args) => OrderResolves.amountOrderClient(args.client)
    },

    amountOrderFood: {
        type: GraphQLFloat,
        args: {
            food: {
                name: "food",
                type: GraphQLString
            }
        },
        resolve: (_, args) => OrderResolves.amountOrderFood(args.food)
    },

    rankingFood: {
        type: GraphQLString,
        resolve: () => OrderResolves.rankingFood()
    }
}