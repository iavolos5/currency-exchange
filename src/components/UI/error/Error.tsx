import { Alert } from 'antd'
import styles from './Error.module.css'
import type { ErrorProps } from './ErrorInterface'

const Error = ({ description, onClose }: ErrorProps) => {
  return (
    <Alert
      className={styles.Error}
      message={`Error`}
      type={`error`}
      closable
      onClick={onClose}
      description={description}
    ></Alert>
  )
}

export default Error
