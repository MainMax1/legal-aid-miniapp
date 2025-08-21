// Простой универсальный Button без зависимостей shadcn
export function Button({ variant = 'default', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-800',
    outline:
      'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:ring-gray-300',
    ghost: 'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-200',
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${className}`}
      {...props}
    />
  );
}
