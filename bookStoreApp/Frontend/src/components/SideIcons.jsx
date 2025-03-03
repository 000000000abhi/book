import { Home, PlusCircle, User, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function SideIcons() {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6">
      <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors">
        <Home size={24} />
      </Link>
      <Link href="/create-blog" className="text-gray-600 hover:text-blue-500 transition-colors">
        <PlusCircle size={24} />
      </Link>
      <Link href="/my-blogs" className="text-gray-600 hover:text-blue-500 transition-colors">
        <BookOpen size={24} />
      </Link>
      <Link href="/User" className="text-gray-600 hover:text-blue-500 transition-colors">
        <User size={24} />
      </Link>
    </div>
  );
}

