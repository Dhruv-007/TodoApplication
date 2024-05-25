import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, Button, View, Alert} from 'react-native';
import {teams, Role} from '../src/appwriteConfig';
import {ID} from 'appwrite';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InviteTeam = () => {
  const [email, setEmail] = useState('');
  const route = useRoute();

  const [sessionToken, setSessionToken] = useState('');
  console.log(sessionToken, 'sessionToken');

  useEffect(() => {
    const getSessionToken = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('sessionToken');
        const tokenObject = JSON.parse(tokenString);
        if (tokenObject && tokenObject.userId) {
          setSessionToken(tokenObject.userId);
        } else {
          console.error('Invalid session token:', tokenObject);
        }
      } catch (error) {
        console.error('Error retrieving session token:', error);
      }
    };
    getSessionToken();
  }, []);

  const inviteMember = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email address');
      }

      let team;
      try {
        team = await teams.get('teachers');
      } catch (error) {
        team = await teams.create('teachers', 'Teachers', [
          'maths',
          'sciences',
          'arts',
          'literature',
        ]);
      }

      const userId = generateUserId();

      const inviteResponse = await teams.createMembership(
        team.$id,
        ['maths'],
        email,
        '66524f72003cabd1b2e8',
        '+919319787763',
        'https://cloud.appwrite.io/console/project-6649c3aa002b63f45d70/overview/platforms',
        'Dhruv',
      );

      await Role.team(team.$id).grant(['teams.write']);

      Alert.alert('Success', 'Invitation sent successfully');
    } catch (error) {
      console.error('Error inviting member or granting permissions:', error);
      const errorMessage =
        error.message || 'Failed to invite member or grant permissions';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Invite Team</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button title="Invite" onPress={inviteMember} />
      </View>
    </View>
  );
};

export default InviteTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333333',
  },
});
