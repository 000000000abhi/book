import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function FancyCard({ title, date, amount, status }) {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-lg shadow-md ${
        theme === 'light'
          ? 'bg-gradient-to-r from-blue-50 to-purple-50'
          : 'bg-gradient-to-r from-gray-800 to-blue-900'
      }`}
    >
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-lg mb-1">Date: {date}</p>
      <p className="text-lg mb-1">Amount: ${amount}</p>
      <p className={`text-lg font-semibold ${
        status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
      }`}>
        Status: {status}
      </p>
    </motion.div>
  );
}

