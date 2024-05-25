import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import {COLLECTION_ID, DATABASES_ID, databases} from '../src/appwriteConfig';
import {ID, Permission, Role} from 'appwrite';

const TodoForm = ({fetchTodos, setshowForm}) => {
  // console.log(setShowForm,"setShow Form")
  console.log(setshowForm, 'showwwForm');
  const [todo, setTodo] = useState({
    title: '',
    description: '', // Make sure the field name matches your schema
    // isComplete: false,
  });

  const handleSubmit = e => {
    e.preventDefault();
    const promise = databases.createDocument(
      DATABASES_ID,
      COLLECTION_ID,
      ID.unique(),
      todo,
    );

    promise.then(
      function (response) {
        setTodo({
          title: '',
          description: '',
        });
        setshowForm(false);
        fetchTodos();
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      },
    );
  };

  return (
    <Modal visible={true} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setshowForm(false)}
            style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          <View style={styles.formInputDiv}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="What to do?"
              value={todo.title}
              onChangeText={text =>
                setTodo({
                  ...todo,
                  title: text,
                })
              }
            />
          </View>
          <View style={styles.formInputDiv}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={todo.description}
              onChangeText={text =>
                setTodo({
                  ...todo,
                  description: text,
                })
              }
              multiline={true}
              numberOfLines={5}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
  },
  formInputDiv: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TodoForm;
