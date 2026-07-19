// components/Button.jsx
function Button({ text, onClick }) {
  return (
    <button className="stamp-btn" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;