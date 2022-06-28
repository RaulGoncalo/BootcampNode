
import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs

//atividade 1
export const findBrandMoreModels = async () => {
    const listCars = JSON.parse(await readFile(global.fileName));

    let brandSelected = [];
    let aux = 0;

    //popula o atributo models com a quantidade de modelos que a marca tem
    listCars.map((_, index) => {
        listCars[index].models = listCars[index].models.length;
    });

    //organiza de forma crescente as marcas pelo modelo
    listCars.sort((a, b) => {
        return a.models < b.models ? -1 : a.models > b.models ? 1 : 0;
    });

    //pega o ultimo elemento e depois o adiciona de volta
    aux = listCars.pop();
    listCars.push(aux);

    //filtra pela mesma quantidade de modelos
    brandSelected = listCars.filter(item => {
        return item.models === aux.models;
    })


    if (brandSelected.length > 1) {
        brandSelected = brandSelected.map((_, index) => {
            return brandSelected[index].brand;
        });
    } else {
        brandSelected[0] = brandSelected[0].brand;
    }


   
    return brandSelected;

};

//atividade 2
export const findBrandLessModels = async () => {
    const listCars = JSON.parse(await readFile(global.fileName));

    let brandSelected = [];
    let aux = 0;

    //popula o atributo models com a quantidade de modelos que a marca tem
    listCars.map((_, index) => {
        listCars[index].models = listCars[index].models.length;
    });

    //organiza de forma crescente as marcas pelo modelo
    listCars.sort((a, b) => {
        return a.models < b.models ? -1 : a.models > b.models ? 1 : 0;
    });

    //pega o primeiro elemento e depois o adiciona de volta
    aux = listCars.shift();
    listCars.unshift(aux);

    //filtra pela mesma quantidade de modelos
    brandSelected = listCars.filter(item => {
        return item.models === aux.models;
    });


    if (brandSelected.length > 1) {
        brandSelected = brandSelected.map((_, index) => {
            return brandSelected[index].brand;
        });
    } else {
        brandSelected[0] = brandSelected[0].brand;
    }

    return brandSelected;
};

//atividade 3
export const findBrandMoreModelsWithParams = async (amountMoreBrand) => {
    const listCars = JSON.parse(await readFile(global.fileName));

    let brandSelected = [];

    //popula o atributo models com a quantidade de modelos que a marca tem
    listCars.map((_, index) => {
        listCars[index].models = listCars[index].models.length;
    });

    //organiza de forma crescente as marcas pelo modelo
    listCars.sort((a, b) => {
        return a.models < b.models ? -1 : a.models > b.models ? 1 : 0;
    });


    brandSelected = listCars.slice((listCars.length - parseInt(amountMoreBrand)), listCars.length);


    brandSelected = brandSelected.sort((a, b) => {
        if (a.models === b.models) {
            if (a.brand > b.brand) {
                return -1;
            } else {
                return 1;

            }
        }
        return 0;
    });


    if (brandSelected.length > 1) {
        brandSelected = brandSelected.map((_, index) => {
            return `${brandSelected[index].brand} - ${brandSelected[index].models}`;
        });
    } else {
        brandSelected[0] = `${brandSelected[0].brand} - ${brandSelected[0].models}`;
    }

    return brandSelected.reverse();

}


//atividade 4
export const findBrandLessModelsWithParams = async (amountLessBrand) => {
    const listCars = JSON.parse(await readFile(global.fileName));

    let brandSelected = [];

    //popula o atributo models com a quantidade de modelos que a marca tem
    listCars.map((_, index) => {
        listCars[index].models = listCars[index].models.length;
    });

    //organiza de forma crescente as marcas pelo modelo
    listCars.sort((a, b) => {
        return a.models < b.models ? -1 : a.models > b.models ? 1 : 0;
    });


    brandSelected = listCars.slice(0, parseInt(amountLessBrand));


    brandSelected = brandSelected.sort((a, b) => {
        if (a.models === b.models) {
            if (a.brand < b.brand) {
                return -1;
            } else {
                return 1;

            }
        }
        return 0;
    });


    if (brandSelected.length > 1) {
        brandSelected = brandSelected.map((_, index) => {
            return `${brandSelected[index].brand} - ${brandSelected[index].models}`;
        });
    } else {
        brandSelected[0] =  `${brandSelected[0].brand} - ${brandSelected[0].models}`;
    }

    return brandSelected;
};

//atividade 5
export const findModels = async (brand) =>{
    const listCars = JSON.parse(await readFile(global.fileName));

    let modelsFound = [];
    let marca = brand;

    modelsFound = listCars.filter((item)=>{
        return (item.brand.toLowerCase()) === (marca.toLowerCase());
    });


    return modelsFound.length > 0 ? modelsFound[0].models : modelsFound;
}