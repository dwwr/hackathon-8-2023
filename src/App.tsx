import 'aframe'
import 'aframe-particle-system-component'
import { Entity, Scene } from 'aframe-react'
import React from 'react'
import 'aframe-geothree-component'

const defaultInitalPosition = {
  longitude: -122.6784,
  latitude: 45.5152,
}

const App: React.FC = () => {
  const [response, setResponse] = React.useState(null)

  const fetchIt = async () => {
    const res = await fetch(
      `https://explorer.dv.carbontitle.com/registry-api/entities-by-range?latitude=${
        defaultInitalPosition.latitude
      }&longitude=${defaultInitalPosition.longitude}&offset=${600}`
    )
    setResponse(await res.json())
  }
  React.useEffect(() => {
    fetchIt()
  }, [])

  return (
    <Scene>
      {response &&
        response.rows.map(row => {
          console.log(row)
          const x = row.ln / 100 + Math.random() * 10 - 5
          const y = row.lt / 100 + Math.random() * 10 - 5
          return (
            <>
              <Entity
                geometry={{ primitive: 'sphere' }}
                material={{ color: 'red' }}
                yarn
                scale={{ x: 0.1, y: 0.1, z: 0.1 }}
                position={{
                  x,
                  y,
                  z: -5,
                }}
              />
              <Entity
                text={{
                  value: row.a1,
                  align: 'center',
                  color: 'black',
                  width: 2,
                }}
                position={{
                  x,
                  y: y - 0.5,
                  z: -5,
                }}
              />
            </>
          )
        })}
    </Scene>
  )
}
export default App
