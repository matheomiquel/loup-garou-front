import React, { useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import axios from "axios"
import { Cupid, Peasant, Role, User, Warewolf, Witch } from './model';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000/room/";
const ENDPOINT_GAME = "http://localhost:3000/game/";
export default function Profile({ name, description, characterId }:
  { name: string, description: string, characterId: string }) {
    
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
  const back = {
    characterId: -1,
    uri: require('./card/back.jpeg')
  }
  const image = [{
    card: {
      characterId: 0,
      uri: require('./card/villageois.jpeg')
    }
  }]
  // TODO impelment image for all support and do dynamic front
  let imageSource = {}
  for (let i = 0; i < image.length; i++) {
    if (image[i].card.characterId === Number(characterId)) {
      imageSource = image[i].card;
      break;
    }
  }
  if (imageSource === {})
    imageSource = back
  const test = ["villageois",
    "cupidon",
    "sorciere",
    "loup",
    "chasseur",
    "ancient",
    "voyante",
    "enfant_sauvage"]
  const card = {
    0: "villageois",
    1: "cupidon",
    2: "sorciere",
    3: "loup",
    4: "chasseur",
    5: "ancient",
    6: "voyante",
    7: "enfant_sauvage"
  }
  return (
    <SafeAreaView>
      <Text>{name}</Text>
      <Text>{characterId}</Text>
      <Image source={imageSource} />
      <Text>{description}</Text>
    </SafeAreaView>
  );
}