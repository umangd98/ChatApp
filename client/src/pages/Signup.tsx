import React, { FormEvent } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const { signup } = useAuth()
  const usernameRef = React.useRef<HTMLInputElement>(null)
  const nameRef = React.useRef<HTMLInputElement>(null)
  const imageURLRef = React.useRef<HTMLInputElement>(null)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if(signup.isPending) return
    const username = usernameRef.current!.value
    const name = nameRef.current!.value
    const imageURL = imageURLRef.current!.value
    if(username === '' || name === '' || username == null || name == null) return
    signup.mutate({id: username, name, image: imageURL})
  }
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end'>
        <label htmlFor="username">Username</label>
        <Input id='username' pattern='\S*' required ref={usernameRef} />

        <label htmlFor="name">Name</label>
        <Input id='name'  required ref={nameRef} />

        <label htmlFor="imageURL">ImageURL</label>
        <Input id='imageURL' type='url' ref={imageURLRef} />
        <Button disabled={signup.isPending} className='col-span-full' type='submit'>{signup.isPending ? `Loading...`:`Sign Up`}</Button>
      </form>
    </> 
  )
}

export default Signup