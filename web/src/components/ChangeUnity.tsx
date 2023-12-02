import { ArrowsLeftRight, X } from "phosphor-react";
import { useState } from "react";
import { swr } from "../utils/swr";
import { Input } from "./Input";
import { UnityInterface, UserInterface } from "../interfaces";
import { storageLogged } from "../utils/storage-logged";
import { api } from "../utils/axios";

export function ChangeUnity() {

  const logged = storageLogged()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(logged as UserInterface)
  const { data: unities, error }: { data: UnityInterface[], error: any } = swr('unities')
  // const { data: me, error: errorMe}:{data:UserInterface, error:any} = swr('me')

  if(logged?.profile !== 'admin') return <></>

  return (
    

    <div>
      {open &&
        <div className="flex flex-col items-center justify-around rounded-lg bg-white w-40 fixed bottom-1 right-2 h-12 transition-all p-1">
   
          <div className="w-36">
            <Input
              name="unityIdLogged"
              label="Unidade"
              className="w-12"
              value={user.unity_id}
              onChange={async (event) => {
                const unity_id = event.target.value
                const userUpdate = {...user, unity_id}

                console.log({userUpdate})

                setUser(userUpdate)

                const { data } = await api.patch('auth/me', userUpdate)
                localStorage.setItem('accessToken', data.accessToken)
                location.reload()
              }}

              options={unities.map(unity => {
                return {
                  id: unity.id,
                  name: unity.name
                }
              })}
            />
          </div>
        </div>
      }
      {open ||
        <button
          className="cursor-pointer fixed py-2 px-2 bottom-2 flex justify-center 
      right-4 hover:bg-blue-300 transition-all rounded-full bg-blue-200"
          title="Trocar de unidade"
          onClick={() => setOpen(true)}
        >
          <ArrowsLeftRight size={30} />
        </button>
      }

    </div>
  )

}