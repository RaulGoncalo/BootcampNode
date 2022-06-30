import {GraphQLList, GraphQLInt} from 'graphql';
import Account from '../types/Account.js';
import AccountsResolves from '../resolvs/accountResolvs.js';


const accountQueries ={
    getAccounts:{
        type: new GraphQLList(Account),
        resolve: ()=> AccountsResolves.getAccounts()
    },
    getAccount: {
        type: Account,
        args:{
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve: (_, args) => AccountsResolves.getAccount(args.id)
    }
}

export default accountQueries