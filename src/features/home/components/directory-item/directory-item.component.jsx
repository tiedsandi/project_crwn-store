import classes from "./directory-item.module.css";
import { useNavigate } from "react-router";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate("shop/" + title.toLowerCase());

  return (
    <div className={classes.directoryItemContainer} onClick={onNavigateHandler}>
      <div
        className={classes.backgroundImage}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={classes.body}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
