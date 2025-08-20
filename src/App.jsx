import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LegalAidApp() {
  const [tab, setTab] = useState("home");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", situation: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = `📌 Новая заявка на консультацию\n👤 Имя: ${formData.name}\n📞 Телефон: ${formData.phone}\n✉️ Email: ${formData.email}\n📝 Ситуация: ${formData.situation}`;

    try {
      await fetch(`/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus("Заявка отправлена!");
      setFormData({ name: "", phone: "", email: "", situation: "" });
    } catch (error) {
      setStatus("Ошибка при отправке, попробуйте ещё раз.");
    }
  };

  const renderContent = () => {
    switch (tab) {
      case "bankruptcy":
        return (
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-2">Виды банкротства</h2>
              <ul className="list-disc ml-5 space-y-2">
                <li>Банкротство физических лиц</li>
                <li>Банкротство индивидуальных предпринимателей</li>
                <li>Банкротство юридических лиц</li>
              </ul>
            </CardContent>
          </Card>
        );
      case "documents":
        return (
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-2">Необходимые документы</h2>
              <ul className="list-disc ml-5 space-y-2">
                <li>Паспорт</li>
                <li>ИНН и СНИЛС</li>
                <li>Справки о доходах</li>
                <li>Документы по кредитам и займам</li>
              </ul>
            </CardContent>
          </Card>
        );
      case "contacts":
        return (
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-2">Наши контакты</h2>
              <p className="mb-2">📍 Адрес: Москва, ул. Примерная, 10</p>
              <p className="mb-2">📞 Телефон: +7 (900) 123-45-67</p>
              <p>✉️ Email: info@bankrot-help.ru</p>
            </CardContent>
          </Card>
        );
      case "consultation":
        return (
          <Card className="p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Запись на консультацию</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="situation"
                  placeholder="Ваша ситуация..."
                  value={formData.situation}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                />
                <Button type="submit" className="w-full">Отправить заявку</Button>
              </form>
              {status && <p className="mt-2 text-center text-sm">{status}</p>}
            </CardContent>
          </Card>
        );
      default:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-10 relative"
          >
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            <div className="relative z-10 p-4">
              <h1 className="text-2xl font-bold mb-4">
                Центр юридической помощи по банкротству
              </h1>
              <p className="text-gray-700 mb-4">
                Мы помогаем физическим и юридическим лицам пройти процедуру
                банкротства законно и безопасно.
              </p>
              <p className="text-lg font-medium mb-3">
                Опишите вашу ситуацию и оставьте контакты для связи:
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  name="situation"
                  placeholder="Ваша ситуация..."
                  value={formData.situation}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <Button type="submit" className="w-full">Отправить заявку</Button>
              </form>
              {status && <p className="mt-2 text-center text-sm">{status}</p>}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div>{renderContent()}</div>
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur shadow-md flex justify-around p-2">
        <Button variant={tab === "home" ? "default" : "outline"} onClick={() => setTab("home")}>Главная</Button>
        <Button variant={tab === "bankruptcy" ? "default" : "outline"} onClick={() => setTab("bankruptcy")}>Виды банкротства</Button>
        <Button variant={tab === "documents" ? "default" : "outline"} onClick={() => setTab("documents")}>Документы</Button>
        <Button variant={tab === "contacts" ? "default" : "outline"} onClick={() => setTab("contacts")}>Контакты</Button>
        <Button variant={tab === "consultation" ? "default" : "outline"} onClick={() => setTab("consultation")}>Консультация</Button>
      </div>
    </div>
  );
}
