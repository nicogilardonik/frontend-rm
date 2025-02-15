import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4">
          ¡Oops! Página no encontrada.
        </p>
        <p className="mt-2 text-gray-600">
          Parece que la página que buscas no existe o ha sido movida.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
