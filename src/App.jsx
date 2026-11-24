
import './App.css'
import AddMenu from './components/AddMenu'
import Header from './components/Header'
import MenuCard from './components/MenuCard'
import { exercises } from './data'
import { useState, useEffect } from 'react'

function loadExercises () {
  const saved = localStorage.getItem('exercise')
  return saved? JSON.parse(saved):exercises
}

function App() {

  const [menus, setMenus] = useState(loadExercises)

  const total = menus.reduce((sum, m) => sum + m.votes, 0);
  const topVotes = Math.max(...menus.map((m) => m.votes));

  useEffect(() => {
    document.title = `${total}표 투표중`
  }, [total])

  useEffect(() => {
    localStorage.setItem('exercise', JSON.stringify(menus))
  }, [menus])

  const vote = (id) => {
    setMenus(menus.map((m) => (m.id === id ?{...m, votes:m.votes+1} : m )))
  }

  const addMenu =(name)=>{
    setMenus([...menus,{
      id:Date.now(),
      emoji:'🛼',
      name:name,
      votes:0
    }])
  }

  const reset = () => setMenus(menus.map((m) => ({...m, votes: 0})))

  return (
    <div className='app'>
      <Header title={'🤔 이번 주말에 운동 뭐 하지?'} total={total} />
      <AddMenu onAdd={addMenu}/>
      <ul className="menus">
        {menus.map((m) => (
          <MenuCard 
          key={m.id} 
          {...m} 
          isTop = {topVotes > 0 && m.votes == topVotes}
          onVote = {() => vote(m.id)}
        />
        ))}
      </ul>
      <footer className='footer'>
        <button type='button' className='reset' onClick={reset}>투표 초기화</button>
      </footer>
    </div>
  )

}

export default App
