import React, { useState } from 'react'

const Note = ({ itm, setEditObj, getNotes }) => {
    const [newTitle, setNewTitle] = useState(itm?.title)
    const [newContent, setNewContent] = useState(itm?.content)

    let url = 'http://localhost:5000/notes'

    const editNote = async () => {


        try {
            await fetch(url + `/update/${itm.id}`, {

                method: 'PUT', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({ title: newTitle, content: newContent })
            })



        } catch (error) {
            console.log(error);
        }
        finally {
            setEditObj(null)
            getNotes()
        }
    }


    return (
        <div key={itm.id} className='p-3 flex flex-col justify-between h-auto w-fit bg-yellow-50 rounded-lg break-words'>


            <textarea value={newContent} onChange={e => {
                setNewContent(e.target.value)
                setNewTitle(
                    newContent.split(' ')[0]
                )
            }} type='text' placeholder='Take a note..' className=' h-12 px-4 p-2 w-96 max-w-xl font-bold border-transparent focus:border-transparent ' />
            <button onClick={() => editNote()} type='submit' className='my-3 w-auto p-1 rounded-xl bg-amber-300 ml-3'>
                Update
            </button>

             
            <div className='flex justify-between my-2'>
                <h3 className='text-gray-500'>{itm?.created_at}</h3>
            </div>
        </div>
    )
}

export default Note