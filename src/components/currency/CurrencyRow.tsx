import styles from './CurrencyRow.module.css'
import { Col, Row, Select } from 'antd'
import { CURRENCY_EXCHANGE_CODES } from '../../constants'

interface CurrencyProps {
  inputValue: number | string | null
  inputDisabled: boolean
  selectValue: string | null
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSelectChange: (value: string) => void
  hasMargin?: boolean
}

const Currency = ({
  inputValue,
  inputDisabled,
  selectValue,
  onInputChange,
  onSelectChange,
  hasMargin = false
}: CurrencyProps) => {
  return (
    <Row gutter={15} className={hasMargin ? styles.rowWithMargin : ''}>
      <Col span={12}>
        <input
          type='number'
          placeholder='Введи значение плз'
          size='large'
          value={inputValue}
          onChange={onInputChange}
          disabled={inputDisabled}
        />
      </Col>
      <Col span={12}>
        <Select
          showSearch
          optionFilterProp='label'
          size='large'
          placeholder={`выбери валюту`}
          value={selectValue}
          options={CURRENCY_EXCHANGE_CODES}
          onChange={onSelectChange}
        ></Select>
      </Col>
    </Row>
  )
}

export default Currency
