import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;

  console.log(items);

  return (
    <ul className={classes.comments}>
      {items.map((item) => {
        return (
          <li key={item._id || item.newComment._id}>
            <p>{item.text || item.newComment.text}</p>
            <div>
              By <address>{item.name || item.newComment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
