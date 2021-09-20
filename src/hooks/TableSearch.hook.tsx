import { Button, Input, Space } from "antd"
import { FilterDropdownProps } from "antd/lib/table/interface"
import React, { useRef, useState } from "react"
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'

export function useTableSearchHook(key: string, placeholder?: string) {
  const [keyword, setKeyword] = useState('')
  const inputRef = useRef<Input>(null)

  const cloumnProps = {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={inputRef}
          placeholder={placeholder || `Search ${key}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => { confirm(); setKeyword(selectedKeys[0] as any) }}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => { confirm(); setKeyword(selectedKeys[0] as any) }}
            icon={<SearchOutlined />}
            style={{ width: 90 }}
          >
            查询
          </Button>
          <Button onClick={() => { clearFilters!(); setKeyword('') }} style={{ width: 90 }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#414564' : undefined, fontSize: '15px' }} />,
    onFilter: (value: any, record: any) =>
      record[key]
        ? record[key].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => inputRef.current?.select(), 100)
      }
    },
    render: (text: string) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[keyword]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    )
  }
  return cloumnProps
}