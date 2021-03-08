export default async function categoriesAPI() {
  const categoriesOBJ = await fetch('https://opentdb.com/api_category.php');
  return categoriesOBJ.json();
}
