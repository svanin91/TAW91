import React from "react";
import { Link } from "react-router-dom";

interface UserCardProps {
  to: string;
  icon: React.ComponentType<{
    size: number;
    color: string;
    className?: string;
  }>;
  title: string;
  description: string;
}

const UserCard: React.FC<UserCardProps> = ({
  to,
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="w-80 h-80 bg-yellow-400 border border-yellow-500 rounded-lg shadow-xl hover:bg-yellow-500 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <Link to={to} className="block h-full">
        <div className="flex justify-center">
          <Icon size={70} color="white" className="m-5" />
        </div>
        <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-semibold text-gray-700 bg-white rounded-xl shadow-md p-5 m-5 h-32 flex items-center">
          {description}
        </p>
      </Link>
    </div>
  );
};

export default UserCard;
