import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { saveValue } from "./storage";

export default function ChapterRead({ navigation, route }) {
  const data = route.params.data;
  console.log(data);
  const param = route.params.param;
  const height = Dimensions.get("window").height;
  const [dataUrl, setDataUrl] = useState("");
  const [paragraph, setParagraph] = useState(data.paragraphs);
  const removeLastEntry = () => {
    const newPara = [...paragraph];
    newPara.pop();
    setParagraph(newPara);
  };
  const scrollViewRef = useRef();
  const [chapterTitle, setChapterTitle] = useState(data.title);
  useEffect(() => {
    navigation.setParams({ chapterTitle });
    removeLastEntry();
  }, [chapterTitle, navigation]);
  if (dataUrl == "") {
    setDataUrl(route.params.url);
    const novelName = route.params.novelName;
    saveValue(`${novelName}lastReadChapter`, dataUrl);
  }

  const prevChapter = async () => {
    const url = dataUrl;
    console.log(url);
    console.log("Current Chapter", url);
    const match = url.match(/chapter-(\d+)/);
    const currentChNo = parseInt(match[1], 10);
    const prev = currentChNo - 1;
    const prevChUrl = url.replace(`chapter-${currentChNo}`, `chapter-${prev}`);
    const novelName = novelName;
    console.log("Previous Chapter", prevChUrl);
    const fetchUrl =
      "https://script.google.com/macros/s/AKfycbypxCe3GywZxf_hMiavVKmIiEIz-o4SmCyMSqTV36SMNkC3GFTQXBy_sWkfxALDV016/exec";
    await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charse=utf=8",
      },
      body: JSON.stringify({ url: prevChUrl }),
    })
      .then((response) => {
        return response.json();
      })
      .then((respons) => {
        setParagraph(respons.paragraphs);
        setChapterTitle(respons.title);
        setDataUrl(prevChUrl);
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
        saveValue(param, prevChUrl);
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const nextChapter = async () => {
    const url = dataUrl;
    const match = url.match(/chapter-(\d+)/);
    const currentChNo = parseInt(match[1], 10);
    const next = currentChNo + 1;
    const nextChUrl = url.replace(`chapter-${currentChNo}`, `chapter-${next}`);
    const novelName = novelName;
    console.log("Next Chapter", nextChUrl);
    const fetchUrl =
      "https://script.google.com/macros/s/AKfycbypxCe3GywZxf_hMiavVKmIiEIz-o4SmCyMSqTV36SMNkC3GFTQXBy_sWkfxALDV016/exec";
    await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charse=utf=8",
      },
      body: JSON.stringify({ url: nextChUrl }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("fetched succesfull");
        setParagraph(response.paragraphs);
        setChapterTitle(response.title);
        setDataUrl(nextChUrl);
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
        saveValue(param, nextChUrl);
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      {/* <View
        style={{
          height: 60,
          width: Dimensions.get('window').width,
          backgroundColor: '#000',
          position: 'absolute',
          top: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'row',
          paddingTop: 35,
        }}
        fix>
        <TouchableOpacity onPress={() => console.log('Back to Detail Page')}>
          <Image
            source={require('./Back_arrow.png')}
            style={{
              height: 20,
              width: 20,
              marginLeft: 5,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.chName}>{chapter.title}</Text>
      </View> */}
      <ScrollView ref={scrollViewRef}>
        <View
          style={{
            minHeight: 500,
            width: Dimensions.get("window").width,
            padding: 10,
            display: "flex",
            paddingBottom: 50,
            marginBottom: 60,
          }}
        >
          {paragraph.map((para, index) => (
            <Text style={styles.chPara} key={index}>
              {para}
            </Text>
          ))}
        </View>
        <View
          style={{
            minHeight: 100,
            width: Dimensions.get("window").width,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 100,
            flexDirection: "row",
            paddingBottom: 150,
          }}
        >
          <Button
            title=" < "
            style={{
              height: 60,
              width: 60,
            }}
            onPress={() => prevChapter()}
          />
          <Button
            title=" > "
            style={{
              height: 60,
              width: 60,
            }}
            onPress={() => nextChapter()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

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
  },

  chName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    // marginTop: 30,
    // textAlign: 'center',
    marginLeft: 30,
  },
  chPara: {
    fontSize: 15,
    color: "#fff",
    marginVertical: 5,
  },
});
