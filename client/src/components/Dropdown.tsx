import React, { useEffect, useRef, useState } from 'react'

type Props = {
  buttonContent: JSX.Element
  buttonClassname?: string
  buttonTitle?: string
}

const Dropdown = (props: Props & React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Toggle dropdown open state
  const toggleDropdown = () => setIsOpen(!isOpen)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative flex flex-col justify-center" ref={dropdownRef}>
      <button
        className={props.buttonClassname}
        title={props.buttonTitle}
        onClick={toggleDropdown}
      >
        {props.buttonContent}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-10 origin-top-left bg-gray-700 z-10 rounded-md overflow-hidden">
          {props.children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
