import { useState } from "react";

interface CheckoutFormProps {
  onEmailChange: (email: string) => void;
}

function CheckoutForm({ onEmailChange }: CheckoutFormProps) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    onEmailChange(newEmail);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg space-y-6">
      <div>
        <h2 className="text-lg font-semibold ">Tus datos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Email *
            </label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
