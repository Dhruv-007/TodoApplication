import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  COLLECTION_ID,
  DATABASES_ID,
  account,
  databases,
} from './appwriteConfig';
import TodoForm from './TodoForm';
import Todos from './todo';

import {Query} from 'appwrite';
import InviteTeam from './InviteTeam';

const Profile = () => {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);
  const [userDetails, setuserDetails] = useState();
  const [showForm, setshowForm] = useState(false);

  const [activeClass, setactiveClass] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const toggleCompleted = todo => {
    const promise = databases.updateDocument(
      DATABASES_ID,
      COLLECTION_ID,
      todo.$id,
      {
        completed: !todo.completed,
      },
    );

    promise
      .then(response => {
        console.log(response); // Success
        fetchTodos();
      })
      .catch(error => {
        console.log(error); // Failure
      });
  };

  const deleteTodo = todo => {
    const promise = databases.deleteDocument(
      DATABASES_ID,
      COLLECTION_ID,
      todo.$id,
    );

    promise
      .then(response => {
        console.log(response); // Success
        fetchTodos();
      })
      .catch(error => {
        console.log(error); // Failure
      });
  };

  const changeActiveClass = type => {
    setactiveClass({
      all: false,
      active: false,
      completed: false,
      [type]: true,
    });
    fetchTodos(type);
  };

  const clearCompleted = () => {
    todos.filter(todo => todo.completed).map(todo => deleteTodo(todo));
  };

  useEffect(() => {
    const getData = account
      .get()
      .then(res => {
        console.log(res);
        setuserDetails(res);
      })
      .catch(error => {
        console.log(error);
        navigation.navigate('Login');
      });
  }, []);

  const handleLogout = () => {
    account
      .deleteSession('current')
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    navigation.navigate('Login');
  };

  const fetchTodos = async (type = 'all') => {
    let promise;
    if (type === 'all') {
      promise = databases.listDocuments(DATABASES_ID, COLLECTION_ID);
    } else if (type === 'active') {
      promise = databases.listDocuments(DATABASES_ID, COLLECTION_ID, [
        Query.equal('completed', false),
      ]);
    } else {
      promise = databases.listDocuments(DATABASES_ID, COLLECTION_ID, [
        Query.equal('completed', [true]),
      ]);
    }

    promise
      .then(response => {
        setTodos(response.documents);
        console.log(response); // Success
      })
      .catch(error => {
        console.log(error); // Failure
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  console.log(showForm, 'Dkikha set');
  return (
    <View style={styles.container}>
      {showForm && (
        <TodoForm fetchTodos={fetchTodos} setshowForm={setshowForm} />
      )}

      <View style={styles.topDiv}>
        <View style={styles.nav}>
          <Text style={styles.header}>T O D O</Text>
          <View style={styles.right}>
            <Button title="Logout" onPress={handleLogout} />
          </View>
          <View style={styles.right}>
            <View>
            <Button
              title="Invite Team"
              onPress={() => navigation.navigate('InviteTeam')}
            />
            </View>
          </View>
        </View>
      </View>
      {userDetails ? (
        <View style={styles.todoContainer}>
          <TouchableOpacity
            style={styles.newTodo}
            onPress={() => setshowForm(true)}>
            <View style={styles.leftListItem}>
              <View style={styles.circle}></View>
              <Text style={styles.startWriting}>Start writing...</Text>
            </View>
          </TouchableOpacity>
          <Todos fetchTodos={fetchTodos} todos={todos} />
          {todos.length > 0 && (
            <View style={styles.footer}>
              <Text style={styles.itemsLeft}>{todos.length} items left</Text>
              <View style={styles.filter}>
                <Text
                  style={[
                    styles.filterText,
                    activeClass.all && styles.activeFilter,
                  ]}
                  onPress={() => changeActiveClass('all')}>
                  All
                </Text>
                <Text
                  style={[
                    styles.filterText,
                    activeClass.active && styles.activeFilter,
                  ]}
                  onPress={() => changeActiveClass('active')}>
                  Active
                </Text>
                <Text
                  style={[
                    styles.filterText,
                    activeClass.completed && styles.activeFilter,
                  ]}
                  onPress={() => changeActiveClass('completed')}>
                  Completed
                </Text>
              </View>
              <Text style={styles.clearCompleted} onPress={clearCompleted}>
                Clear Completed
              </Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.loginPrompt}>
          Please Login To see Profile
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}>
            {' '}
            Login
          </Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  topDiv: {
    backgroundColor: '#333',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  header: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: -40,
  },
  newTodo: {
    width: '80%',
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#444',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftListItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#888',
    borderWidth: 2,
    marginRight: 10,
  },
  startWriting: {
    color: '#aaa',
    fontSize: 18,
  },
  footer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: 20,
  },
  itemsLeft: {
    color: '#888',
  },
  filter: {
    flexDirection: 'row',
    gap: 10,
  },
  filterText: {
    color: '#888',
  },
  activeFilter: {
    color: '#00f',
  },
  clearCompleted: {
    color: '#f00',
  },
  loginPrompt: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  loginLink: {
    color: '#00f',
    textDecorationLine: 'underline',
  },
});

export default Profile;
