import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('contacts.db');

const ViewContactScreen = ({ route, navigation }) => {
  const { contact } = route.params;

  const handleDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteContact(),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteContact = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM contacts WHERE id = ?',
        [contact.id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            alert('Contact deleted successfully');
            navigation.goBack();
          } else {
            alert('Failed to delete contact');
          }
        },
        (_, error) => {
          console.error('Error deleting contact:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: contact.image }} style={styles.profileImage} />
      </View>
      <Text style={styles.label}>Name: {contact.name}</Text>
      <Text style={styles.label}>Phone: {contact.phone}</Text>
      <Text style={styles.label}>Email: {contact.email}</Text>
      <View style={styles.socialMediaContainer}>
        <Ionicons name="logo-twitter" size={24} color="blue" />
        <Text style={styles.socialMediaText}>{contact.twitter}</Text>
      </View>
      <View style={styles.socialMediaContainer}>
        <Ionicons name="logo-facebook" size={24} color="blue" />
        <Text style={styles.socialMediaText}>{contact.facebook}</Text>
      </View>
      <View style={styles.socialMediaContainer}>
        <Ionicons name="logo-linkedin" size={24} color="blue" />
        <Text style={styles.socialMediaText}>{contact.linkedin}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Contact', { contact })}>
          <Ionicons name="pencil-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Ionicons name="trash-bin-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialMediaText: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
  },
});

export default ViewContactScreen;
