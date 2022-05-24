import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

import Header from '../components/Header'
import Spinner from '../components/Spinner'
import { UserType } from "../types"


export default function UserSearch() {
  const [text, setText] = useState<string>(''),
    [users, setUsers] = useState<UserType[] | undefined>(undefined),
    [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (text) {
      setLoading(true)
      const delayFetching = setTimeout(() => {
        getUsers(text)
      }, 3000)
      return () => clearTimeout(delayFetching)
    }
  }, [text])

  const getUsers = async (text: string) => {
    try {
      const { data: { items } } = await axios.get(`https://api.github.com/search/users?q=${text}`)
      await axios.all(items.map(async (item: UserType) => {
        return axios.get(`https://api.github.com/users/${item.login}`)
          .then(res => item.public_repos = res.data.public_repos)
      }))
      setUsers(items)
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setLoading(false)
      setText('')
    }
  }

  return (
    <>
      <Header />
      <div className='container users'>
        <input className='input' type='text' placeholder='Search for Users' value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
        {loading ? (
          <Spinner />
        ) : (
          <ul className='users__list list'>
            {users?.length && users.map((user: UserType) => (
              <li className='list__item item' key={user.id}>
                <Link to={`/user/${user.login}`} className='item__link'>
                  <img src={user.avatar_url} alt='Avatar' />
                  <div className='item__info'>
                    <h2 className='item__title'>{user.login}</h2>
                    <h3 className='item__repos'>Repo: {user.public_repos}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
