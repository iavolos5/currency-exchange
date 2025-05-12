import { useEffect, useState } from 'react'
import {
  DEFAULT_BASE_CODE,
  DEFAULT_BASE_VALUE,
  DEFAULT_TARGET_CODE,
  DEFAULT_TARGET_VALUE,
  DEFAULT_TO_FIXED
} from './constants'
import { useConversionRate } from './hooks/useConversionRate'
import Spinner from './components/UI/spinner/Spinner'
import Error from './components/UI/error/Error'
import Currency from './components/currency/CurrencyRow'

type CodeType = string
type ValueType = number | null

const spinnerSize: 'small' | 'default' | 'large' = 'large'

function App() {
  const [baseCode, setBaseCode] = useState<CodeType>(DEFAULT_BASE_CODE)
  const [targetCode, setTargetCode] = useState<CodeType>(DEFAULT_TARGET_CODE)
  const [baseValue, setBaseValue] = useState<ValueType>(DEFAULT_BASE_VALUE)
  const [targetValue, setTargetValue] =
    useState<ValueType>(DEFAULT_TARGET_VALUE)
  const { conversionRate, isLoading, isError, clearError, error } =
    useConversionRate({
      baseCode,
      targetCode
    })

  const onBaseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setBaseValue(value)
    const targetValue =
      value && conversionRate
        ? +(value * conversionRate).toFixed(DEFAULT_TO_FIXED)
        : null
    setTargetValue(targetValue)
  }

  const onTargetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setTargetValue(value)
    const baseValue =
      value && conversionRate
        ? +(value / conversionRate).toFixed(DEFAULT_TO_FIXED)
        : null
    setBaseValue(baseValue)
  }

  const setDefaultValues = () => {
    setBaseValue(DEFAULT_BASE_VALUE)
    setTargetValue(DEFAULT_TARGET_VALUE)
  }

  const onBaseCodeChange = (value: CodeType) => {
    setDefaultValues()
    setBaseCode(value)
  }

  const onTargetCodeChange = (value: CodeType) => {
    setDefaultValues()
    setTargetCode(value)
  }

  useEffect(() => {
    if (conversionRate && baseValue) {
      setTargetValue(+(baseValue * conversionRate).toFixed(DEFAULT_TO_FIXED))
    }
  }, [conversionRate, baseValue])

  return (
    <>
      {isLoading && <Spinner size={spinnerSize} />}
      {isError && <Error description={error} onClose={clearError} />}
      <div className='container'>
        <h1>Конвертер валют</h1>
        <Currency
          hasMargin
          inputValue={baseValue}
          inputDisabled={isLoading}
          selectValue={baseCode}
          onInputChange={onBaseValueChange}
          onSelectChange={onBaseCodeChange}
        />
        <Currency
          hasMargin
          inputValue={targetValue}
          inputDisabled={isLoading}
          selectValue={targetCode}
          onInputChange={onTargetValueChange}
          onSelectChange={onTargetCodeChange}
        />
      </div>
    </>
  )
}

export default App
