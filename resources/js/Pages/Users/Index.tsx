import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Column } from 'react-table';
import DataTable from '@/Components/DataTable';

interface Props extends PageProps {
  flash: {
    success?: string;
    error?: string;
  };
}

export default function UsersIndex({ auth, users, flash }: Props) {
  const { delete: deleteRoute } = useForm();
  const [message, setMessage] = useState<string | null>(null);

  const columns: Column<User>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Created At',
        accessor: (row) => new Date(row.created_at).toLocaleDateString(),
      },
      {
        Header: 'Updated At',
        accessor: (row) => new Date(row.created_at).toLocaleDateString(),
      },
      {
        Header: 'Actions',
        accessor: 'id',
        disableSortBy: true,
        Cell: ({ value }: { value: number }) => (
          <>
            <Link href={route('users.edit', value)} className="text-blue-500 hover:underline">
              Edit
            </Link>
            <button
              className="ml-2 text-red-500 hover:underline"
              onClick={() => confirm('Are you sure?') && deleteRoute(route('users.destroy', value), { onSuccess: () => null, preserveScroll: true })}
            >
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );

  // Function to display message
  const showMessage = () => {
    if (flash && flash.success) { // Check if flash and flash.success are defined
      setMessage(flash.success);
      setTimeout(() => {
        setMessage(null);
      }, 3000); // Remove message after 3 seconds
    }
  };

  useEffect(() => {
    showMessage();
  }, [flash]); // Call showMessage when flash changes

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
    >
      <Head title="Users" />

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        {/* Display message if any */}
        {message && (
          <div className="text-center text-green-500 mb-4">
            {message}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <Link
            href={route('users.create')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </Link>
        </div>

        {/* DataTable */}
        <div className="overflow-x-auto">
          {/* Ensure users is correctly typed as User[] */}
          <DataTable columns={columns} data={users as User[]} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
