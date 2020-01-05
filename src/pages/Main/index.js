import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon  from 'react-native-vector-icons/MaterialIcons'

import api from '../../services/api'
import { Container, Form, Input, SubmitButton, List,
User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles';

export default function Main(props) {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState('')
  const [loading, setLoading] = useState(false)

   useEffect (() => {
    async function addUser(){
      const colUsers = await AsyncStorage.getItem('users');

      if (colUsers){
        setUsers( JSON.parse(colUsers) );
      }
    }

    addUser();
  }, [])

  async function handleAddUser(){
    setLoading(true)
    const { data } = await api.get(`/users/${newUser}`)

    const user = {
      name: data.name,
      login: data.login,
      bio: data.bio,
      avatar: data.avatar_url,
    };

    setUsers([...users, user])
    await AsyncStorage.setItem('users', JSON.stringify(users))

    setLoading(false)
    setNewUser('')

    Keyboard.dismiss();
  }

  function handleNavigate(user){
    const { navigation } = props

    navigation.navigate('User', { user })
  }

  return (
    <Container>
      <Form>
        <Input autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={text => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton onPress={handleAddUser}>
          { loading ? <ActivityIndicator color="#fff" /> :
          <Icon name="add" size={20} color="#fff"/>}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton loading={loading} onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions= {
  title: 'Usuários'
}
