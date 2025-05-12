import { Spin } from 'antd'
import styles from './Spinner.module.css'
import type { SpinnerProps } from './SpinnerInterface'

const Spinner = ({ size }: SpinnerProps) => {
  return <Spin className={styles.spinner} size={size} />
}

export default Spinner
