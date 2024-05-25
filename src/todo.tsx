import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {COLLECTION_ID, DATABASES_ID, databases} from '../src/appwriteConfig';

import {Query} from 'appwrite';

const Todos = ({fetchTodos, todos}) => {
  const [activeClass, setActiveClass] = useState({
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

    promise.then(
      function (response) {
        console.log(response); // Success
        fetchTodos();
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };

  const deleteTodo = todo => {
    const promise = databases.deleteDocument(
      DATABASES_ID,
      COLLECTION_ID,
      todo.$id,
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        fetchTodos();
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };

  const changeActiveClass = type => {
    setActiveClass({
      all: false,
      active: false,
      completed: false,
      [type]: true,
    });
  };

  const clearCompleted = () => {
    todos.filter(todo => todo.completed).map(todo => deleteTodo(todo));
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={item => item.$id}
      renderItem={({item}) => (
        <View style={styles.listItem}>
          <View style={styles.leftListItem}>
            <TouchableOpacity
              style={[styles.checkCircle, item.completed && styles.completed]}
              onPress={() => toggleCompleted(item)}>
              {item.completed ? (
                <Text style={styles.checkIcon}>✓</Text>
              ) : (
                <Text style={styles.checkIcon}>○</Text>
              )}
            </TouchableOpacity>
            <Text
              style={[styles.todoText, item.completed && styles.completedText]}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => deleteTodo(item)}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    maxHeight: '45vh',
    backgroundColor: '#333',
  },
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#444',
  },
  leftListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkCircle: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    minHeight: 30,
  },
  completed: {
    backgroundColor: '#55ddff',
  },
  checkIcon: {
    fontSize: 20,
    color: '#fff',
  },
  todoText: {
    fontSize: 18,
    color: '#fff',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  closeIcon: {
    color: '#888',
    fontSize: 24,
  },
});

export default Todos;
