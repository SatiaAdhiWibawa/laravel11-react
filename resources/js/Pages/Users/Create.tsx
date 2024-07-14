import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import ErrorBoundary from '@/Components/ErrorBoundary'; // Adjust the import path as necessary

export default function CreateUser({ auth }: PageProps) {
  console.log(auth);
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <ErrorBoundary>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create User</h2>}
      >
        <Head title="Create User" />

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
          {/* <form onSubmit={handleSubmit}> */}
          <form >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && <div className="text-red-500 text-sm mt-2">{errors.name}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && <div className="text-red-500 text-sm mt-2">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.password && <div className="text-red-500 text-sm mt-2">{errors.password}</div>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
              <Link
                href={route('users.index')}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </AuthenticatedLayout>
    </ErrorBoundary>
  );
}
