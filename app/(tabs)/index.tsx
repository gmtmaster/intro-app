import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Note = {
    text: string;
    createdAt: string;
};

export default function HomeScreen() {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);

    //betöltés inditáskor
    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const store = await AsyncStorage.getItem('notes');
            if (stored) setNotes(JSON.parse(stored));
        } catch (e) {
            console.log("hiba a betöltésnél: e");
        }
    };

    const saveNotes = async (newNotes: string[]) => {
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        } catch (e) {
            console.log("Hiba a mentésnél: e");
        }
    };

    const addNote = () => {
        if (note.trim() === "") return;
        const newNote: Note = {
            text: note,
            createdAt: new Date().toLocaleString(), // dátum + idő
        };
        const newNotes = [newNote, ...notes]; // új jegyzet előre
        setNotes(newNotes);
        saveNotes(newNotes);
        setNote("");
    };

    const deleteNote = (index: number) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
        saveNotes(newNotes);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>📝 Jegyzeteim</Text>

            {/* Új jegyzet bevitel */}
            <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Írj egy jegyzetet..."
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 10,
                }}
            />
            <Button title="Hozzáadás" onPress={addNote} />

            {/* Jegyzetek listája */}
            <FlatList
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#eee",
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }}>{item.text}</Text>
                        <Text style={{ fontSize: 12, color: "gray" }}>{item.createdAt}</Text>

                        <TouchableOpacity onPress={() => deleteNote(index)}>
                            <Text style={{ color: "red" }}>Törlés</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}