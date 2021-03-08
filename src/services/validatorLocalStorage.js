export default function validatorLocalStorage(key, data) {
  return new Promise((response) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, data);
      return response({
        message: `Key ${key} salvo Successfully!`,
        [key]: data,
      });
    }
    const result = localStorage.getItem(key);
    return response({
      message: `The data has already been created with the key ${key}`,
      [key]: result,
    });
  });
}

export function deleteTheKeyLocalStorage(key) {
  localStorage.removeItem(key);
}
