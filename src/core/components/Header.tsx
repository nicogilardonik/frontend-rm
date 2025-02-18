function Header() {
  return (
    <header className="bg-primary text-white p-4 text-center text-lg font-semibold shadow-md">
      {import.meta.env.VITE_COMPANY_NAME} - Alquiler de Productos
    </header>
  );
}

export default Header;
