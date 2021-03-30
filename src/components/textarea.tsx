import styles from "./textarea.module.scss";

function Textarea({ value, placeholder, name, onChange }) {
  return (
    <textarea
      className={styles.input}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Textarea;
