import AccountRepositories from '../repositories/accountRepository.js'
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function creatAccount(account) {
    return await AccountRepositories.insertAccount(account);
};

async function getAccounts() {
    return await AccountRepositories.getAccounts();
};

async function getAccount(id) {
    return await AccountRepositories.getAccount(id);
};

async function deleteAccount(id) {
    return await AccountRepositories.deleteAccount(id);
};


async function updateAccount(account) {
    return await AccountRepositories.updateAccount(account);
};

async function updateBalance(account) {
    const acc = await AccountRepositories.getAccount(account.id);
    acc.balance = account.balance;
    
    return await AccountRepositories.updateAccount(acc);
}

export default {
    creatAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance,
}