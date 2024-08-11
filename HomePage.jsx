import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Dimensions,
  StatusBar,
  ScrollView,
  Modal,
} from "react-native";

const HomePage = ({ navigation, route }) => {
  const [result, setResult] = useState([]);
  const [oddScroll, setOddScroll] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [secModalVisible, setSecModalVisible] = useState(false);
  const [searchPageData, setSearchPageData] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [isSearch, setIsSearch] = useState(0);

  const handleInputChange = (text) => {
    // Update the state with the current input value
    setInputValue(text);
  };

  const TopNovels = [
    {
      name: "Gifted Academy: The Perfect student",
      img: "https://allnovelbook.com/server-1/gifted-academy-the-perfect-student.jpg",
      url: "https://novelfire.noveljk.org/book/gifted-academy-the-perfect-student",
    },
    {
      name: "Lord of The Mysteries",
      img: "https://novelfire.noveljk.org/server-1/lord-of-the-mysteries.jpg",
      url: "https://novelfire.noveljk.org/book/lord-of-the-mysteries",
    },
    {
      name: "My Vampire System",
      img: "https://novelfire.noveljk.org/server-1/my-vampire-system.jpg",
      url: "https://novelfire.noveljk.org/book/my-vampire-system",
    },
    {
      name: "Shadow Slave",
      img: "https://novelfire.noveljk.org/server-1/shadow-slave.jpg",
      url: "https://novelfire.noveljk.org/book/shadow-slave",
    },
    {
      name: "Nine Star Hegemon Body Arts",
      img: "https://novelfire.noveljk.org/server-1/nine-star-hegemon-body-arts.jpg",
      url: "https://novelfire.noveljk.org/book/nine-star-hegemon-body-arts",
    },
    {
      name: "Reincarnation Of The Strongest Sword God",
      img: "https://novelfire.noveljk.org/server-1/reincarnation-of-the-strongest-sword-god.jpg",
      url: "https://novelfire.noveljk.org/book/reincarnation-of-the-strongest-sword-god",
    },
    {
      name: "Supreme Magus",
      img: "https://novelfire.noveljk.org/server-1/supreme-magus.jpg",
      url: "https://novelfire.noveljk.org/book/supreme-magus",
    },
    {
      name: "Invincible Divine Dragon's Cultivation System",
      img: "https://novelfire.noveljk.org/server-1/invincible-divine-dragons-cultivation-system.jpg",
      url: "https://novelfire.noveljk.org/book/invincible-divine-dragons-cultivation-system",
    },
    {
      name: "Infinite Mana In The Apocalypse",
      img: "https://novelfire.noveljk.org/server-1/infinite-mana-in-the-apocalypse.jpg",
      url: "https://novelfire.noveljk.org/book/infinite-mana-in-the-apocalypse",
    },
    {
      name: "Global Lord: 100% Drop Rate",
      img: "https://novelfire.noveljk.org/server-1/global-lord-100-drop-rate.jpg",
      url: "https://novelfire.noveljk.org/book/global-lord-100-drop-rate",
    },
    {
      name: "Alchemy Emperor of the Divine Dao",
      img: "https://novelfire.noveljk.org/server-1/alchemy-emperor-of-the-divine-dao.jpg",
      url: "https://novelfire.noveljk.org/book/alchemy-emperor-of-the-divine-dao",
    },
    {
      name: "The Mech Touch",
      img: "https://novelfire.noveljk.org/server-1/the-mech-touch.jpg",
      url: "https://novelfire.noveljk.org/book/the-mech-touch",
    },
    {
      name: "Genius Club",
      img: "https://novelfire.noveljk.org/server-1/genius-club.jpg",
      url: "https://novelfire.noveljk.org/book/genius-club",
    },
    {
      name: "Overpowered Wizard",
      img: "https://novelfire.noveljk.org/server-1/overpowered-wizard.jpg",
      url: "https://novelfire.noveljk.org/book/overpowered-wizard",
    },
    {
      name: "Dungeon Life",
      img: "https://novelfire.noveljk.org/server-1/dungeon-life.jpg",
      url: "https://novelfire.noveljk.org/book/dungeon-life",
    },
    {
      name: "Game of Thrones: I Am The Heir For A Day",
      img: "https://novelfire.noveljk.org/server-1/game-of-thrones-i-am-the-heir-for-a-day.jpg",
      url: "https://novelfire.noveljk.org/book/game-of-thrones-i-am-the-heir-for-a-day",
    },

    {
      name: "Supreme Harem God System",
      img: "https://novelfire.noveljk.org/server-1/supreme-harem-god-system.jpg",
      url: "https://novelfire.noveljk.org/book/supreme-harem-god-system",
    },
    {
      name: "Reincarnated with the Mind Control Powers in Another World.",
      img: "https://novelfire.noveljk.org/server-1/reincarnated-with-the-mind-control-powers-in-another-world.jpg",
      url: "https://novelfire.noveljk.org/book/reincarnated-with-the-mind-control-powers-in-another-world",
    },
    {
      name: "My Three Wives Are Beautiful Vampires",
      img: "https://novelfire.noveljk.org/server-1/my-three-wives-are-beautiful-vampires.jpg",
      url: "https://novelfire.noveljk.org/book/my-three-wives-are-beautiful-vampires",
    },
    {
      name: "Reincarnation Of The Strongest Sword God",
      img: "https://novelfire.noveljk.org/server-1/reincarnation-of-the-strongest-sword-god.jpg",
      url: "https://novelfire.noveljk.org/book/reincarnation-of-the-strongest-sword-god",
    },
    {
      name: "My Vampire System",
      img: "https://novelfire.noveljk.org/server-1/my-vampire-system.jpg",
      url: "https://novelfire.noveljk.org/book/my-vampire-system",
    },
    {
      name: "Village Head's Debauchery",
      img: "https://novelfire.noveljk.org/server-1/village-heads-debauchery.jpg",
      url: "https://novelfire.noveljk.org/book/village-heads-debauchery",
    },
    {
      name: "The Mech Touch",
      img: "https://novelfire.noveljk.org/server-1/the-mech-touch.jpg",
      url: "https://novelfire.noveljk.org/book/the-mech-touch",
    },
    {
      name: "Global Killing: Awakening SSS-level Talent at the Beginning",
      img: "https://novelfire.noveljk.org/server-1/global-killing-awakening-sss-level-talent-at-the-beginning.jpg",
      url: "https://novelfire.noveljk.org/book/global-killing-awakening-sss-level-talent-at-the-beginning",
    },
  ];
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setSearchPageData(false);
      setSecModalVisible(false);
      setModalVisible(false);
      console.log("imple");
      if (isSearch == 1) {
        console.log("now");
      } else {
        console.log("not now");
      }
    });

    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation, route.params]);

  const handleNovelPress = async (novel) => {
    console.log(novel);
    const fetchUrl =
      "https://script.google.com/macros/s/AKfycbzQCdoNFF-W3QXf7DzH2hVPQ3EgOd5_Y3AMwLtW8-qiB1EOetLl6XBM9obaNHcn_QAL/exec";
    await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charse=utf=8",
      },
      body: JSON.stringify({ url: novel }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        navigation.navigate("Detail", { data: response, url: novel });
        console.log("fetched succesfull");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = () => {
    console.log("search");
    setModalVisible(true);
  };
  const handleSearchNovel = async () => {
    console.log("search Novel");
    const fetchUrl =
      "https://script.google.com/macros/s/AKfycbzn_FY-UAFkxITCGYmIGH7x5QVIAKAjTorx6qPv7Wqohg-gF8S3soEu-1ugqPnjniwQ/exec";

    await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charse=utf=8",
      },
      body: JSON.stringify({ url: inputValue }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setResult(response.result);
        console.log(response);
        console.log("fetched succesfull");
        setSecModalVisible(true);
        setIsSearch(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={"#000"}
        // barStyle={"dark-content"}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.novelDetailDiv}>
          <Text style={styles.appHeading}>Home</Text>
          <TouchableOpacity
            style={styles.search}
            onPress={() => handleSearch()}
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
        <View style={styles.novelMain}>
          <Text style={styles.novelSort}>Top Novels</Text>
          <ScrollView
            horizontal
            style={styles.scrollHorizontal}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.horizontalCon}>
              {TopNovels.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleNovelPress(item.url)}
                >
                  <View style={styles.novelCard} touch>
                    <Image source={{ uri: item.img }} style={styles.novelPic} />
                    <Text
                      style={styles.novelTitle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
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
        </View>
        <Modal
          visible={secModalVisible}
          onRequestClose={() => {
            setSecModalVisible(false);
            setIsSearch(0);
          }}
          animationType="fade"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "#000",
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
            }}
          >
            <Text style={styles.DetailHeading}>
              Related Novels {"(" + result.length + ")"}
            </Text>
            <ScrollView
              style={{
                minHeight: Dimensions.get("window").height,
                width: Dimensions.get("window").width,
                backgroundColor: "#000",
                // flex: 1,
                display: "flex",
              }}
            >
              <View
                style={{
                  height:
                    height > (210 * result.length) / 3
                      ? height
                      : (210 * result.length) / 3,
                  width: Dimensions.get("window").width,
                  backgroundColor: "#000",
                  display: "flex",
                  paddingBottom: 50,
                  marginBottom: 100,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 50,
                }}
              >
                {result.length != 1 ? (
                  result.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleNovelPress(item.url)}
                      style={{}}
                    >
                      <View style={styles.novelCard2}>
                        <Image
                          source={{ uri: item.img }}
                          style={styles.novelPic2}
                        />
                        <Text
                          style={styles.novelTitle2}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.appHeading}>No Item Found</Text>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
        <Modal
          visible={searchPageData}
          onRequestClose={() => {
            setSearchPageData(false);
            setIsSearch(0);
          }}
          animationType="fade"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            backgroundColor: "#000",
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
            }}
          >
            <Text style={styles.DetailHeading}>Related Novels</Text>
            <ScrollView
              style={{
                minHeight: Dimensions.get("window").height,
                width: Dimensions.get("window").width,
                backgroundColor: "#000",
                // flex: 1,
                display: "flex",
              }}
            >
              <View
                style={{
                  height:
                    height > (210 * result.length) / 3
                      ? height
                      : (210 * result.length) / 3,
                  width: Dimensions.get("window").width,
                  backgroundColor: "#000",
                  display: "flex",
                  paddingBottom: 50,
                  marginBottom: 100,
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 50,
                }}
              >
                {result.length != 1 ? (
                  result.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleNovelPress(item.url)}
                      style={{}}
                    >
                      <View style={styles.novelCard2}>
                        <Image
                          source={{ uri: item.img }}
                          style={styles.novelPic2}
                        />
                        <Text
                          style={styles.novelTitle2}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.appHeading}>No Item Found</Text>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + 100,
    top: 0, // cause of this I can show content on StatusBar
    zIndex: 11,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#000",
    display: "flex",
    flexWrap: "wrap",
    width: Dimensions.get("window").width,
    zIndex: 10,
  },
  scrollHorizontal: {
    Height: 100,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    zIndex: 1,
    flexGrow: 0,
  },
  horizontalCon: {
    height: 500,
    display: "flex",
    flexWrap: "wrap",
    zIndex: 0,
  },
  novelDetailDiv: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  appHeading: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "900",
    margin: 20,
    textAlign: "center",
  },
  search: {
    height: 30,
    width: 30,
    position: "absolute",
    right: 0,
    marginTop: 26,
    marginRight: 30,
  },
  searchInput: {
    height: 40,
    width: 320,
    borderColor: "#fff",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 30,
    padding: 10,
    color: "#fff",
  },
  novelMain: {
    backgroundColor: "#111",
    Height: 140,
    width: Dimensions.get("window").width,
    borderRadius: 40,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 0,
    // marginBottom: 50,
    paddingHorizontal: 5,
  },
  novelCard: {
    overflow: "hidden",
    // backgroundColor: '#444',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    Height: 100,
    width: 120,
    display: "flex",
    margin: 10,
    zIndex: 5,
  },
  novelPic: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  novelTitle: {
    color: "#61dafb",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginBottom: 10,
    textTransform: "capitalize",
    overflow: "hidden",
  },
  colBar: {
    height: 80,
    width: "100%",
    backgroundColor: "#222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
    // borderWidth: 1,
    // borderColor: '#aaa',
    // borderStyle: 'solid',
  },
  col: {
    height: "100%",
    width: "30%",
    // margin: 5,
    borderStyle: "solid",
    borderColor: "#ddd",
    // borderWidth: 1,
  },
  cat: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 9,
  },
  catHeading: {
    fontSize: 14,
    color: "#aff",
    fontWeight: "700",
    fontFamily: "serif",
    textAlign: "center",
  },
  DetailHeading: {
    color: "#61dafb",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    textTransform: "capitalize",
    overflow: "hidden",
    textAlign: "center",
  },
  author: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    overflow: "hidden",
  },
  novelSort: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
    textTransform: "capitalize",
    width: "100%",
    textAlign: "center",
  },
  chapters: {
    backgroundColor: "black",
    color: "white",
    minHeight: "80vh",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  novelSynopsis: {
    color: "#fff",
  },
  novelChapters: {
    marginTop: 20,
  },
  chapterHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  chapterSelection: {
    flexDirection: "column",
  },
  label: {
    color: "#fff",
    marginBottom: 5,
  },
  chpNo: {
    width: 100,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#111",
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#61dafb",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#000",
    color: "#fff",
    marginBottom: 30,
    position: "absolute",
  },
  modalContent: {
    flex: 1,
    minHeight: Dimensions.get("window").height,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 100,
    width: Dimensions.get("window").width,
    backgroundColor: "#000",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#fff",
    flexDirection: "row",
  },
  p: {
    margin: 10,
    position: "relative",
    top: 10,
    color: "white",
  },
  modalContainer2: {
    flex: 1,
    minHeight: Dimensions.get("window").height,
    paddingTop: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width,
    backgroundColor: "#000",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    color: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  scrollViewContainer2: {
    // minHeight: 500,
    flex: 1,
    width: Dimensions.get("window").width,
    display: "flex",
    flexWrap: "wrap",
  },
  novelSort2: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#000",
  },
  novelCard2: {
    margin: 10,
    alignItems: "center",
    flexGrow: 0,
    display: "flex",
  },
  novelPic2: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  novelTitle2: {
    color: "#fff",
    textAlign: "center",
    width: 100,
  },
  appHeading2: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomePage;
