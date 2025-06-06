import DirectoryItem from "../directory-item/directory-item.component";
import classes from "./directory.module.css";

const categories = [
  {
    id: 1,
    title: "hats",
    imageUrl:
      "https://images.unsplash.com/photo-1714950736077-58fc93cb8b6d?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    route: "shop/hats",
  },
  {
    id: 2,
    title: "jackets",
    imageUrl:
      "https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    route: "shop/jackets",
  },
  {
    id: 3,
    title: "sneakers",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1658527158664-560225dc9aa8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    route: "shop/sneakers",
  },
  {
    id: 4,
    title: "womens",
    imageUrl:
      "https://images.unsplash.com/photo-1615332859295-aa9dc9f01fbc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    route: "shop/womens",
  },
  {
    id: 5,
    title: "mens",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1687294575742-27c7f9fd6935?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    route: "shop/mens",
  },
];

const Directory = () => {
  return (
    <div className={classes.directoryContainer}>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
