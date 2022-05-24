import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import Spinner from '../components/Spinner'
import { UserType, RepositoryType } from '../types'

export default function ProfilePage() {
  const user = useParams(),
    [profile, setProfile] = useState<UserType>(),
    [repos, setRepos] = useState<RepositoryType[]>([]),
    [keyword, setKeyword] = useState<string>(''),
    [loading, setLoading] = useState<boolean>(false)

  const onSearchHandler = useMemo(() => (event: React.ChangeEvent<HTMLInputElement>) => setKeyword(event.target.value.toLowerCase()), [])
  const filterRepos: RepositoryType[] = useMemo(() => repos.filter((item: RepositoryType) => item.name.toLowerCase().includes(keyword)), [repos, keyword])

  useEffect(() => {
    const getRepos = async () => {
      setLoading(true)
      try {
        const profile = await axios.get(`https://api.github.com/users/${user.login}`)
        setProfile(profile.data)
        const repos = await axios.get(`https://api.github.com/users/${user.login}/repos`)
        setRepos(repos.data)
      } catch (error) {
        alert('Something went wrong')
      }
    }
    getRepos()
  }, [user])

  return (
    <>
      <Header />
      <div className='container profile'>
        {loading && profile ?
          <div className='profile__content content'>
            <div className='content__main main'>
              <img src={profile.avatar_url} alt='Avatar' />
              <div className='main__info info'>
                <h2 className='info__name'><strong>{profile.name ? profile.name : profile.login}</strong></h2>
                <ul className='info__list list'>
                  <li className='list__item'>Email: {profile.email}</li>
                  <li className='list__item'>Location: {profile.location}</li>
                  <li className='list__item'>Registration date: {new Date(profile.created_at).toLocaleDateString()}</li>
                  <li className='list__item'>Followers: {profile.followers}</li>
                  <li className='list__item'>Following: {profile.following}</li>
                </ul>
              </div>
            </div>
            {!!profile.bio &&
              <div className='content__biography'>
                <div>{profile.bio}</div>
              </div>
            }
            <div className='profile__repo repo'>
              <input className='input' onChange={onSearchHandler} type='text' placeholder="Search for User's Repositories" />
              <ul className='repo__list list'>
                {filterRepos?.map((repo: RepositoryType) =>
                  <li className='list__item item' key={repo.id}>
                    <a className='item__link' href={repo.html_url} target='_blank' rel='noreferrer'>
                      <h3 className='item__title'>{repo.name}</h3>
                      <div className='item__info'>
                        <h4>{repo.forks_count} Forks</h4>
                        <h4>{repo.stargazers_count} Stars</h4>
                      </div>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          : <Spinner />
        }
      </div>
    </>
  )
}