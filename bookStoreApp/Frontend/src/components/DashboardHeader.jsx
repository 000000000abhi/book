import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function DashboardHeader({ name }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center py-8 ${
        theme === 'light' ? 'text-gray-800' : 'text-white'
      }`}
    >
      <h1 className="text-5xl font-bold mb-4">Welcome, {name}!</h1>
      <p className="text-xl">Manage your account, orders, and blog posts all in one place.</p>
    </motion.div>
  );
}

