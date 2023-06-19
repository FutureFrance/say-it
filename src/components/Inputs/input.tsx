import { Dispatch, SetStateAction } from "react";

type Input<T> = {
  id: string;
  type: string;
  placeholder: T;
  setPlaceholder: Dispatch<SetStateAction<T>>;
  styles?: string;
}

const Input = ({ id, type, placeholder, setPlaceholder, styles }: Input<any>) => {
  return (
    <input 
      id={id} 
      type={type} 
      value={placeholder} 
      onChange={e => setPlaceholder(e.target.value)}
      className={styles}
    >
    </input>
  )
}

export default Input;