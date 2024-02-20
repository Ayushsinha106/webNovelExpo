import React from "react";
import {
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  Button,
} from "react-native";

export default function SearchPage() {
  return (
    <ScrollView>
      <Modal
        visible={isModalVisible}
        style={styles.modalContainer}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={handleInputChange}
            value={inputValue}
            onSubmitEditing={() => handleSearchNovel}
          />
          <TouchableOpacity
            style={{
              height: 60,
              width: 30,
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onPress={() => handleSearchNovel()}
          >
            <Image
              source={{
                uri: "https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-find-icon-png-image_854997.jpg",
              }}
              style={{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}
