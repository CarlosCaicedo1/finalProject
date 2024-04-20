import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { openDatabase } from 'expo-sqlite';
import { FileSystem } from 'expo';

const db = openDatabase('contacts.db');

const AddContactScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const saveContact = async () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please enter name and phone number');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO contacts (name, phone, email, twitter, facebook, linkedin, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, phone, email, twitter, facebook, linkedin, image],
        () => {
          alert('Contact saved successfully');
          navigation.goBack();
        },
        (_, error) => {
          console.error('Error saving contact:', error);
        }
      );
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={selectImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <Text style={styles.selectImageText}>Select Profile Picture</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Twitter:</Text>
          <TextInput
            style={styles.input}
            value={twitter}
            onChangeText={setTwitter}
          />
          <Text style={styles.label}>Facebook:</Text>
          <TextInput
            style={styles.input}
            value={facebook}
            onChangeText={setFacebook}
          />
          <Text style={styles.label}>LinkedIn:</Text>
          <TextInput
            style={styles.input}
            value={linkedin}
            onChangeText={setLinkedin}
          />
          <Button
            title="Save Contact"
            onPress={saveContact}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  selectImageText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default AddContactScreen;
