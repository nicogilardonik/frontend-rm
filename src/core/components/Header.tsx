import { ICompany } from "../../features/product-list/interfaces/Company";

interface HeaderProps {
  company: ICompany;
}

function Header({ company }: HeaderProps) {
  return (
    <header className="bg-primary text-white p-2 shadow-md flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
          <img
            src={company.image || "/fallback-image.jpg"}
            alt={company.name}
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
        <div className="text-center">
          <h1 className="text-lg md:text-2xl font-semibold">{company.name}</h1>
          <p className="text-sm md:text-base opacity-80">
            Alquiler de Productos
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
