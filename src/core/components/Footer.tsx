function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-6">
      &copy; {new Date().getFullYear()} {import.meta.env.VITE_COMPANY_NAME}.
      Todos los derechos reservados.
    </footer>
  );
}

export default Footer;
