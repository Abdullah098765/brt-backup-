import React from 'react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="bg-blue-500 text-white rounded-lg p-4 cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold">{category}</h2>
    </motion.div>
  );
};

export default CategoryCard;