import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { retrieveValue, saveValue } from "./storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Foreground({ navigation, route, NovelDetail }) {
  const details = route.params.data;
  const urlPage = route.params.url || ""; // Use a default string if url is null/undefined
  const title = details.Details.title || ""; // Use a default string if url is null/undefined
  const Genres = details.Details?.Genres || []; // Use a default empty array
  const summary = details.Details?.summary || "";
  const author = details.Details?.author || "";
  const chapters = details.chapters?.chap || [];
  const pagination = details.chapters?.pagination || 0;
  const height = Dimensions.get("window").height;
  const [modalShow, setModalShow] = useState(false);
  const [searchPageData, setSearchPageData] = useState(false);
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [chapterName, setChapterName] = useState(details.chapters.chap);
  console.log("urlPage");
  const name = title;
  console.log("fine");
  const novelName = name
    .replace(/[^\w\s]/gi, "")
    .split(" ")
    .join("");
  console.log("novelName", novelName);
  const param = `${novelName}lastReadChapter`;
  const param2 = `${novelName}currentPage`;
  let savedCurrentPage = "";
  const currPage = async () => {
    const cc = await AsyncStorage.getItem(param2);
    if (!cc) {
      savedCurrentPage = "";
    } else {
      savedCurrentPage = cc;
      console.log("done, currpage", savedCurrentPage);
    }
  };
  useEffect(() => {
    currPage();
  }, [currentPage]);

  const handleReadChapter = async () => {
    StatusBar.setBackgroundColor("#000");
    const cal = await AsyncStorage.getItem(param);
    let val;
    if (!cal) {
      val = urlPage + "/chapter-1";
    } else {
      val = cal;
    }
    const fetchUrl =
      "https://script.google.com/macros/s/AKfycbypxCe3GywZxf_hMiavVKmIiEIz-o4SmCyMSqTV36SMNkC3GFTQXBy_sWkfxALDV016/exec";
    await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charse=utf=8",
      },
      body: JSON.stringify({ url: val }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("fetched succesfull");
        saveValue(param, val);
        navigation.navigate("chapter", {
          data: response,
          url: val,
          param: param,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (savedCurrentPage != "") {
    setCurrentPage(parseInt(savedCurrentPage));
    console.log("done, currentPage");
  }

  const handleChapterPress = async (ch, chNo) => {
    console.log("clicked chapter no.", ch);
    const fetchUrl =
      "https://script.google.com/macros/s/AKfycbypxCe3GywZxf_hMiavVKmIiEIz-o4SmCyMSqTV36SMNkC3GFTQXBy_sWkfxALDV016/exec"; //papa
    await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charse=utf=8",
      },
      body: JSON.stringify({ url: ch }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        saveValue(param, ch);
        console.log(param);
        navigation.navigate("chapter", {
          data: response,
          url: ch,
          param: param,
          novelName: novelName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  const data = Array.from(
    { length: parseInt(pagination) },
    (_, index) => index + 1
  );
  const onPageChange = async (item) => {
    newPage = urlPage + `/chapters?page=${item}`;
    console.log(urlPage);
    console.log(item, newPage);
    const fetchUrl =
      "https://script.google.com/macros/s/AKfycbzfIpWi5l7kfxX2lAS2oe-_aCpIRor7_8aGuvgoZLj3xUeyTmOJptIbmCCOoDBWiSXD/exec";
    await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charse=utf=8",
      },
      body: JSON.stringify({ url: newPage }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setChapterName(response.chap);
        setCurrentPage(item);
      })
      .catch((err) => {
        console.log(err);
      });
    const pgNo = item.toString();
    await AsyncStorage.setItem(param2, pgNo);
    console.log("item settedd");
  };

  const handleGenreSearch = async (item) => {
    console.log("search Novel");
    const fetchUrl = "http://192.168.162.117:5000/genreSearch";
    // const fetchUrl = "http://192.168.107.117:5000/search";
    await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charse=utf=8",
      },
      body: JSON.stringify({ key1: item }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setResult(response.result);
        console.log("fetched succesfull", response.result);
        setSearchPageData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.pageItem, item === currentPage && styles.activePage]}
      onPress={() => onPageChange(item)}
    >
      <Text style={styles.pageLink}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        minHeight: Dimensions.get("window").height + 100,
        width: Dimensions.get("window").width,
        backgroundColor: "#000",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        marginTop: 250,
        display: "flex",
        alignItems: "center",
      }}
    >
      <FlatList
        data={Genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{
          flexGrow: 0,
          marginBottom: 20,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={(e) => {
              handleGenreSearch(item);
            }}
            style={{
              height: 40,
            }}
          >
            <View style={styles.GenresContainer}>
              <Text style={styles.genres}>{"#" + item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          minHeight: 350,
          width: "100%",
          marginBottom: 50,
          paddingBottom: 50,
        }}
      >
        <Text style={styles.summary}> summary </Text>
        <Text style={styles.para}>{summary}</Text>
        <Text style={styles.chapter}>chapters</Text>
        <Button title="Read Now" onPress={() => handleReadChapter()} />
        <View style={styles.paginationContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* <TouchableOpacity
          onPress={() => handleChapterPress(chapters[0].url, 1)}>
          <Text style={styles.chName}>{chapters[0].chapter}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChapterPress(chapters[1].url)}>
          <Text style={styles.chName}>{chapters[1].chapter}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChapterPress(chapters[2].url)}>
          <Text style={styles.chName}>{chapters[2].chapter}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChapterPress(chapters[3].url)}>
          <Text style={styles.chName}>{chapters[3].chapter}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChapterPress(chapters[4].url)}>
          <Text style={styles.chName}>{chapters[4].chapter}</Text>
        </TouchableOpacity> */}
        {chapterName.map((item, index) => (
          <TouchableOpacity
            onPress={(e) => {
              handleChapterPress(item.url, parseInt(index) + 1);
            }}
            key={index}
          >
            <Text style={styles.chName}>{item.chapter}</Text>
          </TouchableOpacity>
        ))}
        {/* <Button title="Read" onPress={() => handleReadChapter()} /> */}
      </View>

      <Modal
        visible={modalShow}
        animationType="slide"
        onRequestClose={toggleModal}
        style={{
          width: Dimensions.get("window").width,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 50,
            width: Dimensions.get("window").width,
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScrollView style={styles.scrollContainer}>
            <View
              style={{
                height: 50,
                width: Dimensions.get("window").width,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 20,
                  width: 30,
                  margin: 15,
                  position: "absolute",
                  left: 0,
                }}
                onPress={() => setModalShow(false)}
              >
                <Image
                  source={require("./Back_arrow.png")}
                  style={{
                    height: 20,
                    width: 30,
                    // margin: 15,
                    position: "absolute",
                    left: 0,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  margin: 10,
                }}
              >
                chapters
              </Text>
            </View>
            {chapters.map((item, index) => (
              <TouchableOpacity
                onPress={(e) => {
                  handleChapterPress(item.url, parseInt(index) + 1);
                }}
                key={index}
              >
                <Text style={styles.chName}>{item.chapter}</Text>
              </TouchableOpacity>
            ))}
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
    </View>
  );
}

const styles = StyleSheet.create({
  GenresContainer: {
    height: 40,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  genres: {
    fontSize: 17,
    margin: 5,
    fontWeight: "500",
    color: "#fff",
  },
  summary: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "capitalize",
    overflow: "hidden",
    margin: 10,
  },
  chapter: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    overflow: "hidden",
    margin: 20,
  },
  chName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "capitalize",
    overflow: "hidden",
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "#fff",
    paddingVertical: 5,
  },
  para: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "400",
    textTransform: "capitalize",
    overflow: "hidden",
  },
  paginationContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  pageItem: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  activePage: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
  },
  pageLink: {
    color: "#fff",
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
  DetailHeading: {
    color: "#61dafb",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    textTransform: "capitalize",
    overflow: "hidden",
    textAlign: "center",
  },
});
