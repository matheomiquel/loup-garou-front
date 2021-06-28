import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import axios from "axios"
import socketIOClient from "socket.io-client";
import { User, Room, CharacterInterface } from "./model"
import Welcome from "./welcome"
import ChoseRole from "./choseRole"
import Profile from './Profile';
const ENDPOINT = "http://localhost:3000/";

export default function App() {
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [view, setView] = useState("welcome")
  const [witch, setWitch] = useState(0)
  const [warewolf, setWarewolf] = useState(0)
  const [peasant, setPeasant] = useState(0)
  const [cupid, setCupid] = useState(0)
  const [role, setRole] = useState({})
  const [allRoles, setAllRoles] = useState({})
  const [characterName, setCharacterName] = useState("")
  const [characterDescription, setCharacterDescription] = useState("")
  const [characterId, setCharacterId] = useState("")
  const socket = socketIOClient(ENDPOINT);
  const login = async function (username: string, id: string): Promise<any> {
    if (username) {
      setView("choseRole")
      setUsername(username)
      const user: User = {
        username: username,
        id: id
      }
      axios.post(`${ENDPOINT}user`, user).then((result) => {
        setId(result.data.id)
        setView("choseRole")
      })
      return user;
    }
    else {
      alert("faut mettre un nom CONNARD !!!")
    }
  }

  useEffect(() => {
    socket.on("get_character", data => {
      setCharacterName(data.character.name);
      setCharacterDescription(data.character.description);
      setCharacterId(data.character.roleId);
      console.log(data.character)
      setView("profile")
    });
  }, []);
  const welcome = < View style={styles.container} >
    < Welcome login={login} socket={socket} />
  </View >

  const choseRole = < View style={styles.container} >
    <ChoseRole
      witch={witch} setWitch={setWitch}
      warewolf={warewolf} setWarewolf={setWarewolf}
      peasant={peasant} setPeasant={setPeasant}
      cupid={cupid} setCupid={setCupid}
      role={role} setRole={setRole}
      allRoles={allRoles} setAllRoles={setAllRoles}
    />
  </View >
  const profile = < View style={styles.container} >
    <Profile
      name={characterName}
      description={characterDescription}
      characterId={characterId}
    />
  </View >
  if (view === "welcome")
    return (welcome);
  else if (view == "choseRole") {
    return (choseRole)
  }
  else if (view == "profile") {
    return (profile)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
