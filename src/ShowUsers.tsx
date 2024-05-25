import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Button, View, Alert, FlatList} from 'react-native';
import {account} from '../src/appwriteConfig';

const ListUsers = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await account.get(); // Fetch list of users from Account API
      setUserList(response.users); // Update state with user list
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch users');
    }
  };

  const renderUserItem = ({item}) => (
    <View style={styles.userItem}>
      <Text>{`Name: ${item.name}`}</Text>
      <Text>{`Email: ${item.email}`}</Text>
      {/* You can display other user information here */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>User List</Text>
      <FlatList
        data={userList}
        renderItem={renderUserItem}
        keyExtractor={item => item.$id}
        style={styles.list}
      />
    </View>
  );
};

export default ListUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  list: {
    width: '100%',
  },
  userItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
});
