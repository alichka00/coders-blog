import { Table } from 'antd'

import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getColumns } from './data'

import { Loader } from 'components/Loader'
import { useGetArticlesQuery } from 'services/articles'
import { T_ArticleDataType } from 'services/articles/models/responses'

import type { InputRef } from 'antd'
import type { TablePaginationConfig } from 'antd/es/table'

export const ArticleTable = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isLoading } = useGetArticlesQuery({
    page: searchParams.get('page') || 1,
    limit: searchParams.get('limit') || 10,
    sort: searchParams.getAll('sort'),
    filter: searchParams.getAll('filter'),
  })
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef<InputRef>(null)

  const dataArticles: T_ArticleDataType[] = (data?.data || []).map((item) => ({
    ...item,
    key: item.id,
  }))

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = (clearFilters: () => void, confirm: (param?: FilterConfirmProps) => void) => {
    clearFilters()
    setSearchText('')
    confirm()
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T_ArticleDataType> | SorterResult<T_ArticleDataType>[],
  ) => {
    const params = new URLSearchParams()
    params.append('page', JSON.stringify(pagination.current))
    params.append('limit', JSON.stringify(pagination.pageSize))

    if (sorter) {
      const arraySorter = Array.isArray(sorter) ? sorter : [sorter]
      arraySorter.forEach((sort) => {
        if (sort.order) {
          const field = Array.isArray(sort.field) ? sort.field.join('.') : String(sort.field)
          const param = {
            field,
            order: sort.order === 'ascend' ? 'asc' : 'desc',
          }
          params.append('sort', JSON.stringify(param))
        }
      })
    }
    if (filters) {
      console.log(filters)
      Object.entries(filters).forEach(([field, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            const param = {
              field,
              value: item,
            }
            params.append('filter', JSON.stringify(param))
          })
        } else if (value) {
          const param = {
            field,
            value: value[0],
          }
          params.append('filter', JSON.stringify(param))
        }
      })
    }
    setSearchParams(params)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Table
      columns={getColumns({
        searchOptions: { searchInput, searchText, handleReset, handleSearch },
      })}
      dataSource={dataArticles}
      onChange={handleTableChange}
      pagination={{
        current: Number(searchParams.get('page')) || 1,
        pageSize: Number(searchParams.get('limit')) || 10,
        total: data?.info.total,
      }}
      scroll={{ x: 'max-content' }}
    />
  )
}
