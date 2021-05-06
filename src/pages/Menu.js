import React from "react";
import { useFoods } from "../api";

const Menu = () => {
  const { loading, foods, error } = useFoods();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <section id="foodList">
      <h1>Food List</h1>
      <ul>
        {foods.map((food) => (
          <Food key={food._id} {...food} />
        ))}
      </ul>
    </section>
  );
};

function Food(food) {
  const { _id, name } = food;

  return (
    <table>
      <tr>
        <td>
          <a href={"/foods/" + _id}>{name}</a>
        </td>
      </tr>
    </table>
  );
}

export default Menu;
