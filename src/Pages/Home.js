import React, { useEffect, useState } from "react";

import deleteImg from "../assets/delete.png";
import addbtn from "../assets/addition.png";
import editbtn from "../assets/draw.png";
import Note from "../Components/Note";

let url = "http://localhost:5000/notes";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState(null);
  const [editObj, setEditObj] = useState(null);

  const getNotes = () => {
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results);
        setNotes(res.results);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getNotes();

    return () => {};
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      setContent("");
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNote = async (id) => {
    try {
      await fetch(url + `/delete/${id}`, {
        method: "DELETE",
      });
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {editObj ? (
        <div className="flex justify-center mt-8">
          {" "}
          <Note
            itm={editObj}
            getNotes={getNotes}
            setEditObj={setEditObj}
          />{" "}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="my-2 rounded-lg bg-white p-2">
            <form onSubmit={handleSubmit}>
              <textarea
              value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setTitle(content.split(" ")[0]);
                  
                }}
                type="text"
                placeholder="Take a note.."
                className="w-72 h-12 px-4 p-2 max-w-xl font-bold border-transparent focus:border-transparent"
              />
              <button type="submit" className="w-9 ml-3">
                <img src={addbtn} />
              </button>
            </form>
          </div>

          <div className="flex my-3 gap-6 flex-wrap justify-center mt-10">
            {notes?.map((itm) => {
              return (
                <div
                  key={itm.id}
                  className="p-3 flex flex-col justify-between h-auto w-64 bg-yellow-50 rounded-lg break-words  "
                >
                  <div>
                    <div className="flex justify-between">
                      <h1 className="font-semibold text-2xl">
                        {itm.content?.split(" ")[0]}
                      </h1>
                      <img
                        onClick={() => {
                          setEditObj(itm);
                        }}
                        src={editbtn}
                        className="cursor-pointer w-6 h-6"
                      />
                    </div>

                    <p className="my-5">{itm.content}</p>
                  </div>
                  <div className="flex justify-between my-2">
                    <h3 className="text-gray-500">{itm.created_at}</h3>
                    <img
                      onClick={() => deleteNote(itm.id)}
                      src={deleteImg}
                      className="cursor-pointer w-7 h-7"
                    />
                  </div>
                </div>
              );
            })}
            {notes ?.length === 0  && (
              <h1 className="animate-bounce text-center text-2xl">
               Empty
              </h1>
            )}
            {!notes && (
              <h1 className="animate-bounce text-center text-2xl">
                Loading ..
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
