"use client"
import React, { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"

// Define the Request interface
interface Request {
  requestId: string
  senderName: string
  ekycStatus: 'Pending' | 'Completed' | 'Failed'
  requestDate: string
  location: string
}

// Define the sorting key type
type SortKey = keyof Pick<Request, 'requestDate' | 'senderName'>

export default function RequestList() {
  // State for sorting
  const [sortKey, setSortKey] = useState<SortKey>('requestDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Dummy data with explicit type
  const dummyData: Request[] = [
    {
      requestId: 'REQ-2356',
      senderName: 'John Smith',
      ekycStatus: 'Pending',
      requestDate: '2024-03-15',
      location: 'New York, USA'
    },
    {
      requestId: 'REQ-1894',
      senderName: 'Alice Johnson',
      ekycStatus: 'Completed',
      requestDate: '2024-03-14',
      location: 'London, UK'
    },
    {
      requestId: 'REQ-3421',
      senderName: 'Bob Wilson',
      ekycStatus: 'Failed',
      requestDate: '2024-03-16',
      location: 'Sydney, Australia'
    },
  ]

  // Memoized sorted data to improve performance
  const sortedData = useMemo(() => {
    return [...dummyData].sort((a, b) => {
      const valueA = a[sortKey]
      const valueB = b[sortKey]

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [sortKey, sortOrder])

  // Handle sorting with improved type safety
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  // Render status badge with type-safe className
  const renderStatusBadge = (status: Request['ekycStatus']) => {
    const statusClasses = {
      'Completed': 'bg-green-200 dark:bg-green-800/30 text-green-800 dark:text-green-200',
      'Pending': 'bg-yellow-200 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-200',
      'Failed': 'bg-red-200 dark:bg-red-800/30 text-red-800 dark:text-red-200'
    }

    return (
      <span className={`px-2 py-1 rounded-full text-sm ${statusClasses[status]}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="p-6 bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              Sort by <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-neutral-900 dark:border-neutral-800">
            <DropdownMenuItem 
              onClick={() => handleSort('senderName')}
              className="dark:hover:bg-neutral-800"
            >
              Name {sortKey === 'senderName' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleSort('requestDate')}
              className="dark:hover:bg-neutral-800"
            >
              Date {sortKey === 'requestDate' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader className="dark:border-neutral-800">
          <TableRow className="hover:bg-transparent dark:hover:bg-neutral-900/50">
            <TableHead className="dark:text-neutral-300">Request ID</TableHead>
            <TableHead className="dark:text-neutral-300">Sender Name</TableHead>
            <TableHead className="dark:text-neutral-300">eKYC Status</TableHead>
            <TableHead className="dark:text-neutral-300">Request Date</TableHead>
            <TableHead className="dark:text-neutral-300">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((request) => (
            <TableRow 
              key={request.requestId}
              className="dark:border-neutral-800 dark:hover:bg-neutral-900/50"
            >
              <TableCell className="dark:text-neutral-200">{request.requestId}</TableCell>
              <TableCell className="dark:text-neutral-200">{request.senderName}</TableCell>
              <TableCell>{renderStatusBadge(request.ekycStatus)}</TableCell>
              <TableCell className="dark:text-neutral-200">
                {new Date(request.requestDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="dark:text-neutral-200">{request.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}