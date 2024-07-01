import { useState, useEffect } from 'react'
import {
    Switch,
  } from '@headlessui/react'

function DarkModeSwitch() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [enabled])

  return (
    <div className="flex items-center justify-center h-screen">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-zinc-700' : 'bg-zinc-700'}
          relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable dark mode</span>
        <span
          className={`${enabled ? 'translate-x-6' : 'translate-x-1'}
            inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
    </div>
  )
}

export default DarkModeSwitch

