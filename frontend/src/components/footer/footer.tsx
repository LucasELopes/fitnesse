import { LuInstagram } from "react-icons/lu";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gray-900 text-gray-200 py-10 px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        <div>
          <h3 className="text-lg font-semibold text-orange-500 mb-3">
            Onde estamos
          </h3>
          <p>Av. Energia Máxima, nº 500</p>
          <p>Bairro Performance</p>
          <p>São Mateus - ES</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <p className="font-medium">
            © 2025 MyGym
          </p>
          <p className="text-gray-400">
            Treine forte. Evolua sempre.
          </p>
        </div>

        <div className="text-right">
          <h3 className="text-lg font-semibold text-orange-500 mb-3">
            Contato
          </h3>
          
          <div className="flex items-center justify-end gap-2 mb-2">
            <LuInstagram className="text-orange-500 text-xl" />
            <p>@mygym.app</p>
          </div>
          
          <p>Suporte: (27) 99999-9999</p>
        </div>


      </div>
    </footer>
  );
}
