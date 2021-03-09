const setNewObj = (LSKey, obj) => {
  localStorage.setItem(LSKey, JSON.stringify(obj));
};

const getObj = (localStorageKey) => JSON.parse(localStorage.getItem(localStorageKey));

const getSpecificObjValue = (localStorageKey, itemToGet, specificKey) => {
  const searchedObj = getObj(localStorageKey);
  return searchedObj[itemToGet][specificKey];
};

const updateLocalStorage = (localStorageKey, itemToUpdate, valueToSave) => {
  const verifyObj = localStorage.getItem(localStorageKey);
  console.log(verifyObj);
  if (verifyObj) {
    const objToUpdate = getObj(localStorageKey);
    objToUpdate[itemToUpdate] = valueToSave;
    setNewObj(localStorageKey, objToUpdate);
  } else {
    setNewObj(localStorageKey, itemToUpdate);
    updateLocalStorage(localStorageKey, itemToUpdate, valueToSave);
  }
};

const updateSpecific = (localStorageKey, itemToUpdate, specificKey, valueToSave) => {
  const objToUpdate = getObj(localStorageKey);
  objToUpdate[itemToUpdate][specificKey] = valueToSave;
  setNewObj(localStorageKey, objToUpdate);
};

export { setNewObj, getObj, updateLocalStorage, updateSpecific, getSpecificObjValue };

// testing:

// const obj = { funcoesFunfar: 'precisamSerObjeto' };
// const player = {};

// const NUMBER_SIX = 6;
// const mockPlayerInfo = {
//   name: 'zé-lelé',
//   gravatarEmail: 'zelele@gmail.com',
//   assertions: (Math.random() * NUMBER_SIX).toFixed(2),
//   score: (Math.random() * NUMBER_SIX).toFixed(2),
// };

// setNewObj('testState', obj); // setou a key do localStorage, já com o objeto;
// setNewObj('testState', player); // substituiu o conteúdo dentro da key do localStorage pelo objeto vazio 'player';

// updateLocalStorage('testState', 'player', { mockPlayerInfo });
// // dentro do objeto vazio 'player', agora tem uma chave com o nome mockPlayerInfo, com as informações do mockPlayerInfo dentro dela;

// updateLocalStorage('testState', 'player', mockPlayerInfo); // jogou a informação para dentro do objeto vazio 'player', sem ser outro objeto;

// updateLocalStorage('testState', 'HellDux', { naBaseDoOdio: false }); // é possível colocar novas chaves, com o respectivo objeto ;

// updateSpecific('testState', 'HellDux', 'naBaseDoOdio', true); // esta função altera o campo específico;

// updateSpecific('testState', 'HellDux', 'naBaseDoOdio', { comCerteza: true }); // e com desconstructor facilita na hora de modificar
