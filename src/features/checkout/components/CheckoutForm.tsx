import { useState } from "react";
import TextField from "@mui/material/TextField";

interface CheckoutFormProps {
  onEmailChange: (email: string) => void;
}

function CheckoutForm({ onEmailChange }: CheckoutFormProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false); // 📌 Estado para manejar error

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex básica para validar emails
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    onEmailChange(newEmail);

    setEmailError(!validateEmail(newEmail));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900">Tus datos</h2>

      <div className="mt-3">
        <TextField
          type="email"
          value={email}
          onChange={handleEmailChange}
          label="Email"
          variant="outlined"
          fullWidth
          error={emailError}
          helperText={emailError ? "Ingresa un email válido" : ""}
        />
      </div>
    </div>
  );
}

export default CheckoutForm;
