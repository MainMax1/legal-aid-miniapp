import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    situation: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-4">
          Центр юридической помощи
        </h1>
        <p className="text-center text-gray-700 mb-6">
          Мы помогаем физическим и юридическим лицам пройти процедуру
          банкротства законно и безопасно.
        </p>

        <p className="text-lg font-semibold mb-3">
          Опишите вашу ситуацию и оставьте контакты для связи:
        </p>

        {sent ? (
          <div className="p-4 bg-green-100 text-green-700 rounded-xl">
            ✅ Заявка отправлена! Мы свяжемся с вами.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              className="w-full p-3 rounded-xl border border-gray-300"
              rows={4}
              placeholder="Ваша ситуация..."
              value={formData.situation}
              onChange={(e) =>
                setFormData({ ...formData, situation: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full p-3 rounded-xl border border-gray-300"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full p-3 rounded-xl border border-gray-300"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl border border-gray-300"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-800"
            >
              Отправить заявку
            </button>
          </form>
        )}
      </div>
    </div>
  );
}