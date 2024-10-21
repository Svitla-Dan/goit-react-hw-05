import { TailSpin } from "react-loader-spinner";
import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={style.loader}>
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
