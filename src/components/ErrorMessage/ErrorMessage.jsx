import style from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return <div className={style.errorMessage}>{message}</div>;
}
