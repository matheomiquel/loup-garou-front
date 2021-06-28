import React from 'react';
import { Image, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
const ENDPOINT = "http://localhost:3000/";
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

class Welcome extends React.Component<{ login: Function, socket: any }, { username: string, socket: any, id: string }>{
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      socket: this.props.socket,
      id: ""
    };
    this.onPress = this.onPress.bind(this)
    this.state.socket.on("connection", (idUser: string) => {
      console.log(this.state.id)
      if (!this.state.id)
        this.setState({ id: idUser })
    });
  }

  onPress = () => {
    this.props.login(this.state.username, this.state.id);
  };
  render() {
    return (
      <>
        <Text>Nom :</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
          placeholder="username"
        />
        <TouchableOpacity
          onPress={() => this.onPress()} >
          <Text>Valider</Text>
          <Image source={require('./card/loup.jpeg')} />
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
export default Welcome