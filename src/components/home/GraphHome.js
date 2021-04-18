import React, { useEffect, useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'

import Card from '../card/Card'

export default function GraphHome() {
  const [chars, setChars] = useState([])

  const query = gql`
    {
      characters {
        results {
          name
          image
        }
      }
    }
  `

  const { data, loading, error } = useQuery(query)

  useEffect(() => {

    if (data && !loading && !error) {
      setChars([...data.characters.results])
    }

  }, [data])

  if (loading) return <h2>Cargando...</h2>

  function nextCharacter() {
    chars.shift()
    setChars([...chars])
  }

  return (
    <Card
      leftClick={nextCharacter}
      {...chars[0]}
    />
  )
}