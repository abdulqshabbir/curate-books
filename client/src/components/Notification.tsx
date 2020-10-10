import React, { useEffect, useState } from "react";

export const Notification = ({ message }: IProps) => {
  const [showNotification, setShowNotification] = useState<boolean>(false)

  useEffect(() => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }, [])

  if (showNotification) {
    return (
      <div>
        <p style={{ color: "red" }}>{ message }</p>
      </div>
    );
  } else {
    return null
  }

};

interface IProps {
  message: string
}