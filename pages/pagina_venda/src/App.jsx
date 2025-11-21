import React, { useState, useEffect } from 'react'
import Home from './pages/Home'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('teal')

  const themes = [
    { name: 'teal', color: 'bg-teal-500', bg: 'bg-teal-50', darkBg: 'dark:bg-gray-900' },
    { name: 'blue', color: 'bg-blue-500', bg: 'bg-blue-50', darkBg: 'dark:bg-gray-900' },
    { name: 'purple', color: 'bg-purple-500', bg: 'bg-purple-50', darkBg: 'dark:bg-gray-900' },
    { name: 'rose', color: 'bg-rose-500', bg: 'bg-rose-50', darkBg: 'dark:bg-gray-900' },
    { name: 'amber', color: 'bg-amber-500', bg: 'bg-amber-50', darkBg: 'dark:bg-gray-900' },
  ]

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  const activeTheme = themes.find(t => t.name === currentTheme) || themes[0]

  return (
    <div className={`min-h-screen ${activeTheme.bg} ${activeTheme.darkBg} transition-colors duration-300`}>
      <Home 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        currentTheme={currentTheme} 
        setCurrentTheme={setCurrentTheme}
        themes={themes}
      />
    </div>
  )
}
