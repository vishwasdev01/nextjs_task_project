// src/components/Dashboard.tsx
'use client'

import {
  useDeleteUsers,
  useUserData,
  userCreateUser,
  useEditUser,
} from '@/Hooks/UserHooks'
import { useEffect, useState, useMemo } from 'react'

import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { USER } from '@/types'
import {
  faChevronLeft,
  faChevronRight,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import Toast from '@/components/Toast'

export default function Dashboard() {
  const { data } = useUserData()
  const userDeleteMutation = useDeleteUsers()
  const [userList, setUserList] = useState<USER[]>([])
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set())
  const [globalFilter, setGlobalFilter] = useState('')
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const userMutation = userCreateUser()
  const userEditMutation = useEditUser()
  const [newUser, setNewUser] = useState<USER>({
    first_name: '',
    last_name: '',
    email: '',
    alternate_email: '',
    password: '',
    age: '',
  })
  const [editingUserId, setEditingUserId] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser({ ...newUser, [name]: value })
  }

  const handleCreateOrEditUser = () => {
    if (Number(newUser.age) > 18) {
      if (editingUserId) {
        userEditMutation.mutate({ id: editingUserId, data: newUser })
        setEditingUserId(null)
      } else {
        userMutation.mutate(newUser)
      }
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        alternate_email: '',
        password: '',
        age: '',
      })
    } else {
      setToastMessage('Age must be 18 or older.')
    }
  }

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setUserList(data.data)
    }
  }, [data])

  const handleCheckboxChange = (rowId: string) => {
    setSelectedRowIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(rowId)) {
        newSet.delete(rowId)
      } else {
        newSet.add(rowId)
      }
      return newSet
    })
  }

  const handleDeleteSelectedUsers = () => {
    userDeleteMutation.mutate(Array.from(selectedRowIds))
    setSelectedRowIds(new Set())
  }

  const handleEditUser = (user: USER, userId: string) => {
    setNewUser({ ...user, password: '' })
    setEditingUserId(userId)
  }

  const columns = useMemo<ColumnDef<USER>[]>(
    () => [
      {
        id: 'select',
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="cursor-pointer w-5 h-5"
            checked={selectedRowIds.has(row.id)}
            onChange={() => handleCheckboxChange(row.id)}
          />
        ),
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'alternate_email',
        header: 'Alternate Email',
      },
      {
        accessorKey: 'age',
        header: 'Age',
        sortingFn: 'basic',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <button
            className="px-2 py-1 text-gray-500 hover:text-gray-700"
            onClick={() => handleEditUser(row.original, row.id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ),
      },
    ],
    [selectedRowIds],
  )

  const table = useReactTable({
    data: userList,
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getRowId: (row: USER) => row.uid || '',
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater
      setPageIndex(newState.pageIndex)
      setPageSize(newState.pageSize)
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: (rowSelection) => {
      setSelectedRowIds(new Set(Object.keys(rowSelection)))
    },
  })

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>
      <div className="flex justify-center   p-4">
        <div className="w-full max-w " style={{ maxWidth: '660px' }}>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {editingUserId ? 'Edit User' : 'Add New User'}
          </h2>
          <div className="space-y-4 mb-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={newUser.first_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={newUser.last_name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              name="alternate_email"
              placeholder="Alternate Email"
              value={newUser.alternate_email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newUser.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              onClick={handleCreateOrEditUser}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md text-center"
            >
              {editingUserId ? 'Edit User' : 'Add User'}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-md max-w-[300px]"
        />
        <button
          onClick={handleDeleteSelectedUsers}
          className="px-4 py-2  bg-red-500 text-white rounded-md text-center cursor-pointer"
          disabled={selectedRowIds.size < 0}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Selected Users
        </button>
      </div>
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Users List</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider bg-gray-200"
                    onClick={
                      header.column.id === 'age'
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.id === 'age' &&
                      (header.column.getIsSorted()
                        ? header.column.getIsSorted() === 'asc'
                          ? ' 🔼'
                          : ' 🔽'
                        : null)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="text-sm text-gray-700">
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
            <strong>{table.getPageCount()}</strong>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  )
}
