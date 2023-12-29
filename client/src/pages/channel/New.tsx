import React, { FormEvent, useRef } from 'react'
import { FullScreenCard } from '../../components/FullScreenCard'
import { Link } from '../../components/Link'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import Select, { SelectInstance } from 'react-select'
import { useLoggedInAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'



const New = () => {
    const navigate = useNavigate()
    const createChannel = useMutation({
        mutationFn: (
        {name, memberIds, imageURL}: {name: string, memberIds: string[], imageURL?: string}
    ) => {
        if(streamChat == null) throw new Error('Stream Chat not initialized')
        return streamChat.channel('messaging', crypto.randomUUID(), {name, image: imageURL, 
    members: [user!.id, ...memberIds]})
    .create()
    },
    onSuccess(){
        navigate('/')
    }
        })
    const {streamChat, user} = useLoggedInAuth()
    const nameRef = useRef<HTMLInputElement>(null)
    const imageRef = useRef<HTMLInputElement>(null)
    const memberIdsRef = useRef<SelectInstance<{label: string, value: string}>>(null)
    const users = useQuery({
        queryKey: ['stream', 'users'],
        queryFn: () => streamChat!.queryUsers({id: {$ne: user!.id}}, {name: 1}),
        enabled: streamChat != null
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const name = nameRef.current!.value
        const imageURL = imageRef.current!.value
        const selectOptions = memberIdsRef.current?.getValue()
        if(name == null || name === ''|| selectOptions == null || selectOptions.length === 0 ) return

        createChannel.mutate({name, imageURL, memberIds: selectOptions.map(option => option.value)})
    }
  return (
    <FullScreenCard>
        <FullScreenCard.Body>
        <h1 className="text-3xl font-bold mb-8 text-center">New Conversation</h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end'>
        <label htmlFor="name">Name</label>
        <Input id='name' required ref={nameRef} />

        <label htmlFor="imageURL">Image URL</label>
        <Input id='imageURL'  ref={imageRef} />

        <label htmlFor="members">Members</label>
        <Select
        ref={memberIdsRef} id='members' required  isMulti classNames={{container: () => 'w-full'}} isLoading={users.isLoading} options={users.data?.users.map(user => {return {value: user.id, label: user.name || user.id}})}>

        </Select>
    

        <Button disabled={createChannel.isPending} className='col-span-full' type='submit'>{createChannel.isPending ? `Loading...`:`Create Chat`}</Button>
      </form>
        </FullScreenCard.Body>
        <FullScreenCard.BelowCard>
            <Link to='/'>Back</Link>
        </FullScreenCard.BelowCard>
    </FullScreenCard>
  )
}

export default New