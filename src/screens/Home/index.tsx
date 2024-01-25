import React, { useState } from "react"
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"

import { Participant } from "../../components/Participants"

import { styles } from "./styles"


export  function Home() {
  const [participants, setParticipants] = useState<String[]>([])
  const [participantName, setParticipantName] = useState('')


    function handleParticipantAdd(){
        if(participants.includes(participantName)){
          return  Alert.alert("Participante Existente", "ja existe um participante na lista com esse nome")
        }

        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('')
    }

    function handleParticipantRemove(name: string){
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participants => participants !== name))
            },
            {
                text: 'Nao',
                style: 'cancel',
            }
        ] )
    }

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>
      <Text
      style={styles.eventDate}>
        quarta 24 de janeiro 2023
      </Text>

      <View style={styles.form}>
      <TextInput  
      style={styles.input}
      placeholder="Nome do participante"
      placeholderTextColor="#6b6b6b"
      onChangeText={setParticipantName}
      value={participantName}
      />

      <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
        <Text style={styles.buttonText}>
            +
        </Text>
      </TouchableOpacity>
      </View>

      <FlatList 
      data={participants}
      keyExtractor={item => item}
      renderItem={({ item }) => (
            <Participant
            key={item}
            name={item} 
            onRemove={() => handleParticipantRemove(item)} />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Text style={styles.ListEmptyText}>
            Ninguem chegou no evento ainda? adicione participantes a sua lista de presenca.
        </Text>
      )}
      />
    
      
    </View>
    
  )
}