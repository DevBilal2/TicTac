export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-gradient-to-r from-green-400 to-red-600  font-bold py-4 px-10 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
    >
      {children}
    </button>
  );
}
