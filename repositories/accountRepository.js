import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

async function insertAccount(account) {
    const data = JSON.parse(await readFile(global.fileName));

    account = {
        id: data.nextId++,
        name: account.name,
        balance: account.balance
    };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return account
}

async function getAccounts() {
    const data = JSON.parse(await readFile(global.fileName));
    return data.accounts;
};

async function getAccount(id) {
    const accounts = await getAccounts();
    const accountSelected = accounts.find(item => item.id === id);
    if (accountSelected) {
        return accountSelected
    }
    throw new Error("Registro não encontrado");
};


async function deleteAccount(id) {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(item => item.id !== parseInt(id));
    await writeFile(fileName, JSON.stringify(data, null, 2));
};

async function updateAccount(account) {
    const data = JSON.parse(await readFile(global.fileName));
    let index = data.accounts.findIndex(a => a.id === account.id);

    if (index === -1) {
        throw new Error("Registro não encontrado");
    };

    data.accounts[index] = {
        id: data.accounts[index].id,
        name: account.name,
        balance: account.balance
    }

    await writeFile(fileName, JSON.stringify(data, null, 2));

    return data.accounts[index]
};


export default {
    insertAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
}

