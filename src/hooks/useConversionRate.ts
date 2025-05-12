import { useCallback, useEffect, useState } from 'react'

interface UseConversionRate {
  baseCode: null | string | number
  targetCode: null | string | number
}

export function useConversionRate({ baseCode, targetCode }: UseConversionRate) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)
  const [conversionRate, setConversionRate] = useState<number | null>(null)

  const getConversionRate = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch(
        `${import.meta.env.VITE_EXCHANGE_RATE_API_URL}/${
          import.meta.env.VITE_EXCHANGE_RATE_API_KEY
        }/pair/${baseCode}/${targetCode}`
      )
      const data = await res.json()
      setConversionRate(data.conversion_rate)
    } catch (e) {
      setIsError(true)
      if (e instanceof Error) {
        console.log(e.message)
        setError(e.message)
      } else {
        console.log(`чёт не так: ${e}`)
      }
    } finally {
      setIsLoading(false)
    }
  }, [baseCode, targetCode, setError, setIsLoading])

  const clearError = () => setIsError(false)

  useEffect(() => {
    getConversionRate()
  }, [getConversionRate])

  return { conversionRate, isLoading, isError, clearError, error }
}
