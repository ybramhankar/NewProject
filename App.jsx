import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Btn from './Components/Btn';
import {
  verticalScale,
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

const App = () => {
  const cardlist = [
    {id: 1, backGround: 'A'},
    {id: 2, backGround: 'A'},
    {id: 3, backGround: 'B'},
    {id: 4, backGround: 'B'},
    {id: 5, backGround: 'C'},
    {id: 6, backGround: 'C'},
    {id: 7, backGround: 'D'},
    {id: 8, backGround: 'D'},
    {id: 9, backGround: 'E'},
    {id: 10, backGround: 'E'},
    {id: 11, backGround: 'F'},
    {id: 12, backGround: 'F'},
    {id: 13, backGround: 'G'},
    {id: 14, backGround: 'G'},
    {id: 15, backGround: 'H'},
    {id: 16, backGround: 'H'},
  ];

  const [cardContent, setCardContent] = useState([]);
  const [reset, setReset] = useState(false);
  const [matches, setMatches] = useState(0);
  const [flips, setFlips] = useState(0);
  const [viewCard, setViewCard] = useState([]);
  const [disabledItem, setDisabledItem] = useState([]);

  const cardClick = item => {
    if (viewCard.length === 1 && !viewCard.includes(item)) {
      setViewCard([...viewCard, item]);
      setFlips(flips + 1);
    } else {
      if (!viewCard.includes(item)) {
        setViewCard([item]);
      }
    }
  };

  useEffect(() => {
    if (
      viewCard.length === 2 &&
      viewCard[0]?.backGround == viewCard[1]?.backGround &&
      viewCard[0]?.id != viewCard[1]?.id &&
      !disabledItem.includes(viewCard[0]) &&
      !disabledItem.includes(viewCard[1])
    ) {
      let arr = disabledItem;
      const [first, second] = viewCard;

      arr = [...arr, first];
      arr = [...arr, second];
      setDisabledItem(arr);
    }
  }, [viewCard]);

  const shuffle = arr => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const restart = () => {
    setFlips(0);
    setMatches(0);
    setReset(!reset);
    setDisabledItem([]);
    setViewCard([]);
  };

  useEffect(() => {
    setMatches(disabledItem.length > 1 ? disabledItem.length / 2 : 0);
  }, [disabledItem]);

  useEffect(() => {
    setCardContent(shuffle(cardlist));
  }, [reset]);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <SafeAreaView style={styles.mainContiner}>
        <View style={styles.countRow}>
          <View style={styles.counts}>
            <Text style={styles.countTxt}> Matches</Text>
            <Text style={styles.countTxt}> {matches}</Text>
          </View>
          <View style={styles.counts}>
            <Text style={styles.countTxt}> Flips</Text>
            <Text style={styles.countTxt}>{flips}</Text>
          </View>
        </View>
        {disabledItem.length != 16 ? (
          <FlatList
            data={cardContent}
            horizontal={false}
            numColumns={4}
            extraData={disabledItem}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  disabled={disabledItem.includes(item)}
                  style={[
                    styles.card,
                    {
                      opacity: disabledItem.includes(item) ? 0.5 : 1,
                    },
                  ]}
                  onPress={() => {
                    cardClick(item);
                  }}>
                  <Text style={{fontSize: 30, color: '#fff'}}>
                    {viewCard.includes(item) ? item.backGround : '?'}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Text
            style={{
              color: '#000',
              fontSize: 25,
              textAlign: 'center',
              margin: 10,
            }}>
            You did it in attempt {flips}
          </Text>
        )}
        <View style={{bottom: 0, marginTop: moderateVerticalScale(20)}}>
          <Btn
            name={'Restart'}
            onPress={() => {
              restart();
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContiner: {
    margin: 20,
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  card: {
    height: verticalScale(110),
    width: scale(70),
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8A2C8',
  },
  counts: {
    backgroundColor: '#6C3082',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: verticalScale(70),
    width: scale(120),
    padding: moderateScale(5),
    marginVertical: moderateVerticalScale(10),
  },
  countTxt: {textAlign: 'center', fontSize: 25, color: '#fff'},

  countRow: {flexDirection: 'row', justifyContent: 'space-between'},
});
