import { GraphQLBoolean, GraphQLInt } from 'graphql';
import OrderResolves from '../resolves/orderResolves';
import Order from '../types/Order';
import OrderInput from '../types/OrderInput.js';

const orderMutations = {
    insertOrder: {
        type: Order,
        args: {
            order: {
                name: "order",
                type: OrderInput
            }
        },
        resolve(_, args) {
            return OrderResolves.insertOrder(args.order)
        }
    },

    updateOrder: {
        type: Order,
        args: {
            order: {
                name: "order",
                type: OrderInput
            }
        },
        resolve(_, args) {
            return OrderResolves.updateOrder(args.order)
        }
    },

    updatedelivery:{
        type:
    },

    deleteOrder: {
        type: GraphQLBoolean,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve(_, args) {
            OrderResolves.deleteOrder(args.id);
        }
    }
}