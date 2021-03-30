import styles from "./input.module.scss";

function Input({ type, value, placeholder, name, onChange }) {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
