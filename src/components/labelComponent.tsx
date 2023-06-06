type ILabel = {
  htmlFor: string;
  labelText: string;
  styles: string;
}

export const InputLabel = ({ htmlFor, labelText, styles }: ILabel) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={styles}
    >
      {labelText}
    </label>
  )
}

export default InputLabel;