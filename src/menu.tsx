/*
    type:
    goToMenu -> va à un menu
    action -> exécute une action
    objetAction -> exécute une action en fonction de l'objet sélectionné dans le tableau stocké dans le local storage data${TRUC}
*/

export const menuPrincipal = [
    { name: "hygiène", id: 1, type: "goToMenu"},
    { name: "nourriture", id: 2, type: "goToMenu"},
    { name: "plaisir", id: 3, type: "goToMenu"},
    { name: "social", id: 14, type: "goToMenu"},
    { name: "équipements", id: 15, type: "goToMenu"}
]

export const menuHygiène = [
    { name: "douche", id: 4, type: "action"},
    { name: "médicament", id: 5, type: "action"},
    { name: "dodo", id: 6, type: "action"},
    { name: "nettoyer la chambre", id: 7, type: "action"}
]

export const menuNourriture = [
    { name: "frigo", id: 8, type: "goToMenu"},
    { name: "acheter nourriture", id: 9, type: "goToMenu"},
]

export const menuFrigo = [
    { name: "jeter nourriture", id: 10, type: "objetAction", data: "dataFrigo"},
    { name: "donner nourriture", id: 11, type: "objetAction", data: "dataFrigo"},
]

export const menuSocial = [
    { name: "parler à un ami", id: 22, type: "objetAction", data: "dataAmis"},
    { name: "aller à une fête", id: 23, type: "action"},
    { name: "faire du sex", id: 24, type: "objetAction", data: "dataAmis"}
]

export const menuÉquipements = [
    { name: "acheter des vêtements", id: 25, type: "action"},
    { name: "acheter des meubles", id: 26, type: "action"},
    { name: "équiper des vêtements", id: 25, type: "objetAction", data: "vêtements"},
    { name: "posser des meubles", id: 26, type: "objetAction", data: "meubles"},
]
