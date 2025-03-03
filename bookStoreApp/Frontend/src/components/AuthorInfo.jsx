import React from 'react';
import { User } from 'lucide-react';

const AuthorInfo = ({ author, date }) => (
  <div className="flex items-center space-x-4 text-gray-600">
    <div className="bg-indigo-100 rounded-full p-2">
      <User size={24} className="text-indigo-600" />
    </div>
    <div>
      <p className="font-semibold">{author}</p>
      <p className="text-sm">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
  </div>
);

export default AuthorInfo;

