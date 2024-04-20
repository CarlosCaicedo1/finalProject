import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import { openDatabase } from 'expo-sqlite';

const db = openDatabase('contacts.db');

const HomeScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    createTable();
    loadContacts();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT, email TEXT, twitter TEXT, facebook TEXT, linkedin TEXT, image TEXT)',
        [],
        () => console.log('Table created successfully'),
        (_, error) => console.error('Error creating table:', error)
      );
    });
  };

  const loadContacts = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM contacts',
        [],
        (_, { rows }) => {
          console.log('Contacts retrieved:', rows._array); // Log retrieved contacts
          const contactsArray = rows._array || []; // Handle null value by providing an empty array as default
          setContacts(contactsArray);
        },
        (_, error) => {
          console.error('Error loading contacts:', error);
        }
      );
    });
  };

  const addContact = () => {
    navigation.navigate('Add Contact');
  };

  const refreshContacts = () => {
    loadContacts(); // Call the loadContacts function to fetch the latest contacts
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('View Contact', { contact: item })}
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.contactImage} />
      ) : (
        <View style={styles.emptyImageContainer}>
          <Text style={styles.emptyImageText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
      )}
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContactItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No contacts found. Add a contact to get started.</Text>}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Contact"
          onPress={addContact}
        />
        <Button
          title="Refresh"
          onPress={refreshContacts}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  emptyImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  emptyImageText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
