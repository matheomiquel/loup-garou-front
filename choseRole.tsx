import React, { useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import axios from "axios"
import { Cupid, Peasant, Role, User, Warewolf, Witch } from './model';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000/room/";
const ENDPOINT_GAME = "http://localhost:3000/game/";
export default function ChoseRole({ witch, warewolf, peasant, cupid, role, allRoles, setWitch, setWarewolf, setPeasant, setCupid, setRole, setAllRoles }:
  { witch: number, warewolf: number, peasant: number, cupid: number, role: Object, allRoles: Object, setWitch: Function, setWarewolf: Function, setPeasant: Function, setCupid: Function, setRole: Function, setAllRoles: Function }) {
  useEffect(() => {
    (async () => {
      const role = await axios.get(`${ENDPOINT}role`)
      setAllRoles(role.data)
      console.log(allRoles)
    })
  }, []);
  const getNumberRoleAxios = async () => {
    const roles = await axios.get(ENDPOINT)

    setWitch(getNumberRole(roles.data, Witch.roleId))
    setPeasant(getNumberRole(roles.data, Peasant.roleId))
    setWarewolf(getNumberRole(roles.data, Warewolf.roleId))
    setCupid(getNumberRole(roles.data, Cupid.roleId))
  }

  getNumberRoleAxios()
  const getNumberRole = (roles: Array<Role>, roleid: number) => {
    let accumulateur = 0
    for (let i = 0; i < roles.length; i++)
      if (roles[i].roleId === roleid)
        accumulateur++;
    return accumulateur
  }
  /*const getNumberRole = (roles: Array<Role>, roleid: number) => {
    let accumulateur = 0
    for (let i = 0; i < roles.length; i++)
      if (roles[i].roleId === roleid)
        accumulateur++;
    return accumulateur
  }*/

  //////////////////////////WITCH///////////////////////////

  const getNumberWitch = (roles: Array<Role>): void => {
    setWitch(getNumberWitchReturn(roles))
  }

  const getNumberWitchReturn = (roles: Array<Role>): number => {
    return getNumberRole(roles, Witch.roleId)
  }


  //////////////////////////PEASANT///////////////////////////

  const getNumberPeasant = (roles: Array<Role>): void => {
    setPeasant(getNumberPeasantReturn(roles))
  }

  const getNumberPeasantReturn = (roles: Array<Role>): number => {
    return getNumberRole(roles, Peasant.roleId)
  }

  //////////////////////////WAREWOLF///////////////////////////

  const getNumberWarewolf = (roles: Array<Role>): void => {
    setWarewolf(getNumberWarewolfReturn(roles))
  }

  const getNumberWarewolfReturn = (roles: Array<Role>): number => {
    return getNumberRole(roles, Warewolf.roleId)
  }

  //////////////////////////CUPID///////////////////////////
  const getNumberCupid = (roles: Array<Role>): void => {
    setCupid(getNumberCupidReturn(roles))
  }

  const getNumberCupidReturn = (roles: Array<Role>): number => {
    return getNumberRole(roles, Cupid.roleId)
  }

  useEffect(() => {
    const socket = socketIOClient("http://localhost:3000/");
    socket.on("refresh_role", role => {
      console.log(role)
      getNumberWitch(role)
      getNumberPeasant(role)
      getNumberWarewolf(role)
      getNumberCupid(role)
    });
    socket.on("get_character", character => {
      console.log(character)
    });
  }, []);

  const addWitch = async function () {
    axios.post(`${ENDPOINT}witch`)
  }

  const addWarewolf = async function () {
    axios.post(`${ENDPOINT}warewolf`)
  }
  const addPeasant = async function () {
    axios.post(`${ENDPOINT}peasant`)
  }
  const addCupid = async function () {
    axios.post(`${ENDPOINT}cupid`)
  }
  const removeRole = async function (roleId: number) {
    axios.post(`${ENDPOINT}remove`, { roleId: roleId })
  }

  const startGames = async function () {
    axios.post(`${ENDPOINT_GAME}`)
      .then()
      .catch(e => {
        console.log(e.response);
        alert(e.response.data)
      })
  }

  const witchButton = `Sorcière : ${witch}`
  const peasantButton = `Villageois : ${peasant}`
  const warewolfButton = `Loup garou : ${warewolf}`
  const cupidButton = `Cupidon : ${cupid}`
  const styles = StyleSheet.create({
    border: {
      flex: 1.3,
      backgroundColor: "beige",
      borderColor: "black",
      borderWidth: 5,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 2,
    },
    beatifulSeparator: {
      marginVertical: 5,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
  const Separator = () => (
    <View style={styles.separator} />
  );
  const BeautifulSeparator = () => (
    <View style={styles.beatifulSeparator} />
  );
  //TODO do html below automaticly 
  return (
    <SafeAreaView>
      <View>
        <Button
          onPress={() => { }}
          title={witchButton}
          accessibilityLabel="idk"
        />
        <Separator />
        <Button
          onPress={addWitch}
          title="+"
          color="#841584"
          accessibilityLabel="add witch"
        />
        <Separator />
        <Button
          onPress={() => removeRole(Witch.roleId)}
          title="-"
          color="#841584"
          accessibilityLabel="add witch"
        />
      </View>
      <BeautifulSeparator />
      <View>
        <Button
          onPress={() => { }}
          title={warewolfButton}
          accessibilityLabel="idk"
        />
        <Separator />
        <Button
          onPress={addWarewolf}
          title="+"
          color="#841584"
          accessibilityLabel="add warewolf"
        />
        <Separator />
        <Button
          onPress={() => removeRole(Warewolf.roleId)}
          title="-"
          color="#841584"
          accessibilityLabel="add warewolf"
        />
      </View>
      <BeautifulSeparator />
      <View>
        <Button
          onPress={() => { }}
          title={cupidButton}
          accessibilityLabel="idk"
        />
        <Separator />
        <Button
          onPress={addCupid}
          title="+"
          color="#841584"
          accessibilityLabel="add cupid"
        />
        <Separator />
        <Button
          onPress={() => removeRole(Cupid.roleId)}
          title="-"
          color="#841584"
          accessibilityLabel="add cupid"
        />
      </View>
      <BeautifulSeparator />
      <View>
        <Button
          onPress={() => { }}
          title={peasantButton}
          accessibilityLabel="idk"
        />
        <Separator />
        <Button
          onPress={addPeasant}
          title="+"
          color="#841584"
          accessibilityLabel="add peasant"
        />
        <Separator />
        <Button
          onPress={() => removeRole(Peasant.roleId)}
          title="-"
          color="#841584"
          accessibilityLabel="add peasant"
        />
      </View>
      <BeautifulSeparator />
      <Button
        onPress={() => startGames()}
        title="Lancer la partie"
        color="black"
        accessibilityLabel="add peasant"
      />
    </SafeAreaView>
  );
}