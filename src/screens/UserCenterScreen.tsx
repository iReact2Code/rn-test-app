import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addAddress,
  removeAddress,
  updateProfile,
} from '../store/slices/userSlice';

export default function UserCenterScreen() {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((s) => s.user.addresses);
  const profile = useAppSelector((s) => s.user.profile);
  const [name, setName] = React.useState(profile?.name || '');
  const [email, setEmail] = React.useState(profile?.email || '');
  const [phone, setPhone] = React.useState(profile?.phone || '');
  const [editing, setEditing] = React.useState(false);
  const [line1, setLine1] = React.useState('');
  const [city, setCity] = React.useState('');
  const [country, setCountry] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Personal Info</Text>
      <View style={styles.profileBox}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          editable={editing}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          editable={editing}
          keyboardType="phone-pad"
        />
        {editing ? (
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => {
              dispatch(updateProfile({ name, phone }));
              setEditing(false);
            }}
          >
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.titleSection}>Addresses</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="Line 1"
          value={line1}
          onChangeText={setLine1}
          style={styles.input}
        />
        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        <TextInput
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            if (!line1 || !city || !country) {
              return;
            }
            dispatch(
              addAddress({
                id: `${Date.now()}`,
                line1,
                city,
                country,
              }),
            );
            setLine1('');
            setCity('');
            setCountry('');
          }}
        >
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No addresses yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.line1}, {item.city}, {item.country}
            </Text>
            <TouchableOpacity
              onPress={() => dispatch(removeAddress(item.id))}
              style={styles.removeBtn}
            >
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  titleSection: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 24,
  },
  row: { gap: 8 },
  profileBox: {
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    gap: 8,
  },
  editBtn: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 4,
  },
  editBtnText: { color: '#333', fontWeight: '700' },
  saveBtn: {
    backgroundColor: '#1f6feb',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 4,
  },
  saveBtnText: { color: '#fff', fontWeight: '700' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addBtn: {
    backgroundColor: '#1f6feb',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  addBtnText: { color: '#fff', fontWeight: '700' },
  list: { paddingVertical: 12, gap: 8 },
  item: {
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: { fontSize: 14 },
  removeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});
