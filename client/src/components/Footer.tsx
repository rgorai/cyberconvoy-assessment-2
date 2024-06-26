import { Link } from 'react-router-dom'
import NewTabIcon from './icons/NewTabIcon'

const Footer = () => (
  <div className="flex flex-row justify-end fixed bottom-0 w-full px-[4vw] py-3 border-t border-gray-700 bg-gray-900">
    <div>
      Created by{' '}
      <Link
        className="font-semibold underline text-blue-400"
        to="https://rongorai.com"
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <span>Ron Gorai</span>
        <NewTabIcon className="inline mb-[0.2rem] ml-2 w-[0.75rem]" />
      </Link>
    </div>
  </div>
)

export default Footer
