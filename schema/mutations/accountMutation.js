import Account from "../types/Account.js"
import AccountInput from "../types/AccountInput.js"
import { GraphQLBoolean, GraphQLInt } from 'graphql';
import AccountsResolves from '../resolvs/accountResolvs.js';


const accountMutation = {
    createAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args) {
            return AccountsResolves.creatAccount(args.account)
        }
    },

    deleteAccount: {
        type: GraphQLBoolean,
        args: {
            id: {
                name: 'id',
                type: GraphQLInt
            }
        },
        resolve(_, args) {
            AccountsResolves.deleteAccount(args.id);
        }
    },

    updateAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            },
        },
        resolve(_, args) {
            return AccountsResolves.updateAccount(args.account);
        }
    },
}

export default accountMutation