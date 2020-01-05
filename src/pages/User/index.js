import React, { useEffect, useState } from 'react';
import api from '../../services/api'

import { Container, Header, Avatar, Name, Bio,
  Stars, Starred, OwnerAvatar, Info, Title, Author
} from './styles';

export default function User( { navigation } ) {

  const [user, setUser] = useState('')
  const [stars, setStars] = useState('')

  useEffect(() => {
    async function load(){
      setUser(navigation.getParam('user'))

      const response = await api.get(`/users/${user.login}/starred`)
      setStars(response.data)
    }

    load();
  })

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      <Stars
        data={stars}
        keyStractor={star => String(star.id)}
        renderItem={ ({item}) => (
          <Starred>
            <OwnerAvatar  source={{uri: item.owner.avatar_url}} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>

          </Starred>
        )}
      />
    </Container>
  );
}

User.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("user").name,
});
