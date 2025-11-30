// hooks/useAgendamentos.ts
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Agendamento {
  id: string
  dataHora: Date
  status: string
  pet: {
    nome: string
    raca: string
  }
  servico: {
    nome: string
    preco: number
  }
  usuario: {
    nome: string
    telefone: string
  }
}

export function useAgendamentos(petshopId: string, dataInicio?: string, dataFim?: string) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        setLoading(true)
        const params = new URLSearchParams({
          petshop_id: petshopId,
          ...(dataInicio && { data_inicio: dataInicio }),
          ...(dataFim && { data_fim: dataFim })
        })

        const response = await axios.get(`/api/agendamentos?${params}`)
        setAgendamentos(response.data.agendamentos)
        setError(null)
      } catch (err) {
        setError('Erro ao carregar agendamentos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (petshopId) {
      fetchAgendamentos()
    }
  }, [petshopId, dataInicio, dataFim])

  const refetch = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        petshop_id: petshopId,
        ...(dataInicio && { data_inicio: dataInicio }),
        ...(dataFim && { data_fim: dataFim })
      })

      const response = await axios.get(`/api/agendamentos?${params}`)
      setAgendamentos(response.data.agendamentos)
      setError(null)
    } catch (err) {
      setError('Erro ao carregar agendamentos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { agendamentos, loading, error, refetch }
}

// hooks/useHorariosDisponiveis.ts
export function useHorariosDisponiveis(
  petshopId: string,
  data: string,
  servicoId: string
) {
  const [horarios, setHorarios] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHorarios() {
      if (!petshopId || !data || !servicoId) {
        setHorarios([])
        return
      }

      try {
        setLoading(true)
        const params = new URLSearchParams({
          petshop_id: petshopId,
          data,
          servico_id: servicoId
        })

        const response = await axios.get(
          `/api/agendamentos/horarios-disponiveis?${params}`
        )
        setHorarios(response.data.horarios)
        setError(null)
      } catch (err) {
        setError('Erro ao carregar horários')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHorarios()
  }, [petshopId, data, servicoId])

  return { horarios, loading, error }
}

// hooks/usePets.ts
interface Pet {
  id: string
  nome: string
  raca: string
  porte: string
  idade: number
  foto_url: string
}

export function usePets(usuarioId: string) {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPets() {
      try {
        setLoading(true)
        const response = await axios.get(`/api/usuarios/${usuarioId}/pets`)
        setPets(response.data.pets)
        setError(null)
      } catch (err) {
        setError('Erro ao carregar pets')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (usuarioId) {
      fetchPets()
    }
  }, [usuarioId])

  return { pets, loading, error }
}

// hooks/useToast.ts
import { useState, useCallback } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((
    message: string,
    type: Toast['type'] = 'info'
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, showToast, removeToast }
}

// hooks/useDebounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key])

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
