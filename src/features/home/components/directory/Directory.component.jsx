import { CATEGORIES } from "@/data";
import DirectoryItem from "../directory-item/directory-item.component";
import classes from "./directory.module.css";

const Directory = () => {
  return (
    <div className={classes.directoryContainer}>
      {CATEGORIES.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
